from products.models.product import Product

class ProductRepository:
    @staticmethod
    def get_all_products():
        return Product.objects.filter(statut=True)
    
    @staticmethod
    def get_product_by_id(product_id):
        return Product.objects.filter(id=product_id, statut=True).first()
    
    @staticmethod
    def create_product(**kwargs):
        return Product.objects.create(**kwargs)
    
    @staticmethod
    def update_product(product, **kwargs):
        for key, value in kwargs.items():
            setattr(product, key, value)
        product.save()
        return product
    
    @staticmethod
    def delete_product(product):
        product.statut = False
        product.save()