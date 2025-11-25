from products.repository.product_repository import ProductRepository

class ProductService:
    def __init__(self):
        self.repository = ProductRepository()
        
    def list_products(self):
        return self.repository.get_all_products()
    
    def get_product(self, product_id):
        return self.repository.get_product_by_id(product_id)
    
    def create_product(self, **kwargs):
        return self.repository.create_product(**kwargs)
    
    def update_product(self, product, **kwargs):
        return self.repository.update_product(product, **kwargs)
    
    def delete_product(self, product):
        self.repository.delete_product(product)
        
