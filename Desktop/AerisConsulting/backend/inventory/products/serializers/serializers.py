from rest_framework import serializers
from products.models.product import Product
from products.models.category import Category

class CategorySerializer(serializers.ModelSerializer):
    """Serializer pour le modèle Category"""
    products_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'statut', 'created_at', 'products_count']
        read_only_fields = ['id', 'created_at']
        
    def get_products_count(self, obj):
        return obj.products.filter(statut=True).count()
    
    def validate_name(self, value):
        """Valider que le nom de catégorie est unique"""
        if not value or not value.strip():
            raise serializers.ValidationError("Le nom ne peut pas âtre vide")
        
        # Vérifier l'unicité lors de la création
        if not self.instance:
            if Category.objects.filter(name__iexact=value.strip()).exists():
                raise serializers.ValidationError("Cette catégorie existe déjà")
            
        # Vérifier l'unicité lors de la mise à jour
        else:
            if Category.objects.filter(name__iexact=value.strip()).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("Cett catégorie existe déjà")
            
        return value.strip()
    
class CategoryDetailsSerializer(CategorySerializer):
    """Serializer détaillé pour Catégory avec la liste des produits"""
    products = serializers.SerializerMethodField()
    
    class Meta:
        fields = CategorySerializer.Meta.fields + ['products']
        
    def get_products(self, obj):
        products = obj.products.filter(statut=True)
        return ProductListSerializer(products, many=True).data
    
    
class ProductListSerializer(serializers.ModelSerializer):
    """Serializer pour la liste des produits (données minimales)"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model: Product
        fields = ['id', 'name', 'price', 'quantity', 'category_name', 'created_at']
        read_only = ['id', 'created_at']
        
class ProductSerializer(serializers.ModelSerializer):
    """Serializer complet pour le modèle Product"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.filter(statut=True),
        source='category',
        write_only=True
    )
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'quantity', 
            'category', 'category_id', 'category_name',
            'statut', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'category']
        extra_kwargs = {
            'category': {'read_only': True}
        }
        
    def validate_price(self, value):
        """Valider que le prix est positif"""
        if value <= 0:
            raise serializers.ValidationError("Le prix doit être supérieur à 0")
        return value
    
    def validate_quantity(self, value):
        """Valider que la quantité est positive"""
        if value <= 0:
            raise serializers.ValidationError("La quantité ne peut pas être négative")
        return value
    
    def validate_name(self, value):
        """Valider le nom du produit"""
        if not value or not value.strip():
            raise serializers.ValidationError("Le nom ne peut pas être vide")
        return value.strip()
    
class ProductDetailsSerializer(ProductSerializer):
    """Serialize détaillé pour Product avec toutes les informations de la catégorie"""
    category_detail = CategorySerializer(source='category', read_only=True)
    
    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['category_detail']