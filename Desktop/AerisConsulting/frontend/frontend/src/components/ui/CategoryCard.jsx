import React from 'react';
import { Layers, Edit2, Trash2 } from 'lucide-react';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="category-card">
      <div className="category-card-top">
        <div className="category-icon"><Layers /></div>
        <div className="category-actions">
          <button onClick={() => onEdit(category)} className="btn-icon" title="Modifier"><Edit2 /></button>
          <button onClick={() => onDelete(category.id)} className="btn-icon btn-delete" title="Supprimer"><Trash2 /></button>
        </div>
      </div>

      <div className="category-body">
        <h4>{category.name}</h4>
        <p>{category.products_count ?? 0} produit(s)</p>
        <p className="status">{category.statut ? 'Actif' : 'Inactif'}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
