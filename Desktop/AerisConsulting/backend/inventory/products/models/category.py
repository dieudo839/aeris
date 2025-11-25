from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    statut = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def delete(self, using=None, keep_parents=False):
        # Suppression logique de la catégorie
        self.statut = False
        self.save()

        # Cascade logique : désactiver tous les produits associés
        self.products.update(statut=False)
        
    def __str__(self):
        return self.name

