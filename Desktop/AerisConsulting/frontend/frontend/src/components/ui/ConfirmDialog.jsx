import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, itemName, confirmText = "Supprimer", cancelText = "Annuler" }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--danger)'
            }}>
              <AlertTriangle size={22} />
            </div>
            <h3 style={{ margin: 0 }}>{title}</h3>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ marginLeft: 'auto' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '20px 0' }}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: 0 
          }}>
            {message}
          </p>
          
          {itemName && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'var(--bg)',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--text-muted)',
                marginBottom: '4px',
                fontWeight: 500
              }}>
                Élément à supprimer :
              </p>
              <p style={{ 
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0
              }}>
                {itemName}
              </p>
            </div>
          )}

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start'
          }}>
            <AlertTriangle size={18} style={{ color: '#92400e', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ 
              fontSize: '0.875rem',
              color: '#92400e',
              margin: 0,
              lineHeight: '1.5'
            }}>
              <strong>Attention :</strong> Cette action est irréversible. Les données supprimées ne pourront pas être récupérées.
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-secondary">
            {cancelText}
          </button>
          <button 
            onClick={handleConfirm} 
            className="btn"
            style={{
              background: 'var(--danger)',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--danger)';
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;