import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ show, type, editingItem, formData, categories, onChange, onSubmit, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3>{editingItem ? 'Modifier' : 'Ajouter'} {type === 'product' ? 'un Produit' : 'une Catégorie'}</h3>
          <button type="button" className="btn-icon" onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="modal-form"
        >
          <label>
            Nom
            <input 
              name="name" 
              type="text"
              value={formData.name} 
              onChange={onChange} 
              required 
              autoFocus
            />
          </label>

          {type === 'product' && (
            <>
              <label>
                Prix (FCFA)
                <input 
                  name="price" 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={formData.price} 
                  onChange={onChange} 
                  required 
                />
              </label>

              <label>
                Quantité
                <input 
                  name="quantity" 
                  type="number" 
                  min="0"
                  value={formData.quantity} 
                  onChange={onChange} 
                  required 
                />
              </label>

              <label>
                Catégorie
                <select 
                  name="category" 
                  value={formData.category || ''} 
                  onChange={onChange} 
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </label>
            </>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {editingItem ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;