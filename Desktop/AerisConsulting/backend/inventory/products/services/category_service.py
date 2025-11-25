from products.repository.category_repository import CategoryRepository

class CategoryService:
    def __init__(self):
        self.repository = CategoryRepository()
        
    def list_categories(self):
        return self.repository.get_all_categories()
    
    def get_category(self, category_id):
        return self.repository.get_category_by_id(category_id)
    
    def create_category(self, **kwargs):
        return self.repository.create_category(**kwargs)
    
    def update_category(self, category, **kwargs):
        return self.repository.update_category(category, **kwargs)
    
    def delete_category(self, category):
        self.repository.delete_category(category)