from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from products.services.category_service import CategoryService
from products.serializers.serializers import CategorySerializer, CategoryDetailsSerializer

category_service = CategoryService()


class CategoryListCreateAPIView(APIView):
    """Lister toutes les catégories ou en créer une nouvelle"""
    
    def get(self, request):
        categories = category_service.list_categories()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            category = category_service.create_category(**serializer.validated_data)
            return Response(CategorySerializer(category).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryRetrieveUpdateDeleteAPIView(APIView):
    """Récupérer, mettre à jour ou supprimer une catégorie"""
    
    def get_object(self, pk):
        return category_service.get_category(pk)
    
    def get(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategoryDetailsSerializer(category)
        return Response(serializer.data)
    
    def put(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            category = category_service.update_category(category, **serializer.validated_data)
            return Response(CategorySerializer(category).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        category = self.get_object(pk)
        if not category:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        category_service.delete_category(category)
        return Response(status=status.HTTP_204_NO_CONTENT)
