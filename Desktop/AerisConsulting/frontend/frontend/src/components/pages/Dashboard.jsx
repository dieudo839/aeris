import React from 'react';
import { Package, Layers, BarChart3 } from 'lucide-react';
import StatCard from '../ui/StatCard';

const Dashboard = ({ products, stats, onNavigate }) => {
  return (
    <div className="page">
      <div className="page-header">
        <h2>Tableau de Bord</h2>
        <p>Vue d'ensemble de votre inventaire</p>
      </div>

      <div className="stats-row">
        <StatCard label="Produits" value={stats.totalProducts} icon={Package} variant="primary"/>
        <StatCard label="Catégories" value={stats.totalCategories} icon={Layers} variant="info" />
        <StatCard label="Valeur totale (FCFA)" value={stats.totalValue.toLocaleString()} icon={BarChart3} variant="success" />
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Produits Récents</h3>
          <button onClick={() => onNavigate('products')} className="btn-text">Voir tout →</button>
        </div>

        {products.length === 0 ? (
          <div className="empty">Aucun produit enregistré pour le moment.</div>
        ) : (
          <div className="table">
            <div className="table-head">
              <div>Produit</div>
              <div>Catégorie</div>
              <div>Prix Unitaire</div>
              <div>Quantité</div>
              <div>Valeur</div>
            </div>

            <div className="table-body">
              {products.slice(0, 5).map(product => (
                <div className="table-row" key={product.id}>
                  <div className="product-name">
                    <div className="avatar">{product.name ? product.name.charAt(0).toUpperCase() : '?'}</div>
                    <span>{product.name}</span>
                  </div>
                  <div>{product.category_name || 'Sans catégorie'}</div>
                  <div style={{ fontWeight: 600, color: 'var(--primary-green-dark)' }}>
                    {parseFloat(product.price).toLocaleString('fr-FR')} FCFA
                  </div>
                  <div>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      background: product.quantity > 10 ? '#d1fae5' : product.quantity > 0 ? '#fef3c7' : '#fee2e2',
                      color: product.quantity > 10 ? 'var(--primary-green-dark)' : product.quantity > 0 ? '#92400e' : 'var(--danger)'
                    }}>
                      {product.quantity}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--primary-green-dark)' }}>
                    {parseFloat(product.price * product.quantity).toLocaleString('fr-FR')} FCFA
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
