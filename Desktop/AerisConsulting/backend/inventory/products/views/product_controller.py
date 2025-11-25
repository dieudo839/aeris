from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from products.services.product_service import ProductService
from products.services.category_service import CategoryService
from products.serializers.serializers import ProductSerializer, ProductDetailsSerializer

product_service = ProductService()
category_service = CategoryService()


class ProductListCreateAPIView(APIView):
    """Lister tous les produits ou en créer un nouveau"""
    
    def get(self, request):
        products = product_service.list_products()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = product_service.create_product(**serializer.validated_data)
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductRetrieveUpdateDeleteAPIView(APIView):
    """Récupérer, mettre à jour ou supprimer un produit"""
    
    def get_object(self, pk):
        return product_service.get_product(pk)
    
    def get(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductDetailsSerializer(product)
        return Response(serializer.data)
    
    def put(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            product = product_service.update_product(product, **serializer.validated_data)
            return Response(ProductSerializer(product).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        product = self.get_object(pk)
        if not product:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        product_service.delete_product(product)
        return Response(status=status.HTTP_204_NO_CONTENT)
