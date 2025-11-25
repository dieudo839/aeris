from django.urls import path

from products.views.product_controller import ProductListCreateAPIView, ProductRetrieveUpdateDeleteAPIView
from products.views.category_controller import CategoryListCreateAPIView, CategoryRetrieveUpdateDeleteAPIView

urlpatterns = [
    path("products/", ProductListCreateAPIView.as_view(), name="product-list-create"),
    path("products/<int:pk>/", ProductRetrieveUpdateDeleteAPIView.as_view(), name="product-detail"),
    path("categories/", CategoryListCreateAPIView.as_view(), name="category-list-create"),
    path("categories/<int:pk>/", CategoryRetrieveUpdateDeleteAPIView.as_view(), name="category-detail"),
]
