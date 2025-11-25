import React from 'react';
import { BarChart3, Package, Layers, Menu, X } from 'lucide-react';

const Navbar = ({ currentView, onViewChange, mobileMenuOpen, onToggleMenu }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="brand" onClick={() => onViewChange('dashboard')}>
          <Package size={20} />
          <span className="brand-text">Inventaire</span>
        </div>
      </div>

      <div className={`navbar-center ${mobileMenuOpen ? 'open' : ''}`}>
        <button
          onClick={() => onViewChange('dashboard')}
          className={`nav-button ${currentView === 'dashboard' ? 'nav-button-active' : ''}`}
        >
          <BarChart3 size={16} /> Tableau de bord
        </button>

        <button
          onClick={() => onViewChange('products')}
          className={`nav-button ${currentView === 'products' ? 'nav-button-active' : ''}`}
        >
          <Package size={16} /> Produits
        </button>

        <button
          onClick={() => onViewChange('categories')}
          className={`nav-button ${currentView === 'categories' ? 'nav-button-active' : ''}`}
        >
          <Layers size={16} /> Catégories
        </button>
      </div>

      <div className="navbar-right">
        <button className="hamburger" onClick={onToggleMenu} aria-label="menu">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
