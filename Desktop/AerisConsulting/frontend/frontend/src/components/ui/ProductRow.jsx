import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const ProductRow = ({ product, onEdit, onDelete }) => {
  const stockValue = parseFloat(product.price) * product.quantity;
  const stockStatus = product.quantity > 10 ? 'good' : product.quantity > 0 ? 'low' : 'out';
  
  return (
    <div className="table-row">
      <div className="product-name">
        <div className="avatar">{product.name ? product.name.charAt(0).toUpperCase() : '?'}</div>
        <span style={{ fontWeight: 500 }}>{product.name}</span>
      </div>

      <div style={{ color: 'var(--text-secondary)' }}>
        {product.category_name || 'Sans catégorie'}
      </div>
      
      <div style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
        {parseFloat(product.price).toLocaleString('fr-FR')} FCFA
      </div>
      
      <div>
        <span style={{ 
          padding: '4px 12px', 
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: 500,
          background: stockStatus === 'good' ? '#d1fae5' : stockStatus === 'low' ? '#fef3c7' : '#fee2e2',
          color: stockStatus === 'good' ? 'var(--primary-green-dark)' : stockStatus === 'low' ? '#92400e' : 'var(--danger)'
        }}>
          {product.quantity} {stockStatus === 'out' && '⚠️'}
        </span>
      </div>

      <div style={{ fontWeight: 600, color: 'var(--primary-green-dark)' }}>
        {stockValue.toLocaleString('fr-FR')} FCFA
      </div>

      <div className="actions">
        <button onClick={() => onEdit(product)} className="btn-icon" title="Modifier">
          <Edit2 size={18} />
        </button>
        <button onClick={() => onDelete(product.id)} className="btn-icon btn-delete" title="Supprimer">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductRow;