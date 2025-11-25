from products.models.category import Category

class CategoryRepository:
    @staticmethod
    def get_all_categories():
        return Category.objects.filter(statut=True)
    
    @staticmethod
    def get_category_by_id(category_id):
        return Category.objects.filter(id=category_id, statut=True).first()
    
    @staticmethod
    def create_category(**kwargs):
        return Category.objects.create(**kwargs)
    
    @staticmethod
    def update_category(category, **kwargs):
        for key, value in kwargs.items():
            setattr(category, key, value)
        category.save()
        return category
    
    @staticmethod
    def delete_category(category):
        category.delete();
