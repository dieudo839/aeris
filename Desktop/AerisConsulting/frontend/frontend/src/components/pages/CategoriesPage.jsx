import React, {useEffect, useState} from 'react';
import { Plus } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import CategoryCard from '../ui/CategoryCard';
import Pagination from '../ui/Pagination'; 

const CategoriesPage = ({ categories, searchTerm, onSearchChange, onAddCategory, onEditCategory, onDeleteCategory }) => {
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Réinitialiser à la page 1 quand la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculs pour la pagination
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  // Gestionnaire de changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gestionnaire de changement d'éléments par page
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Gestion des Catégories</h2>
        <p>{categories.length} catégorie(s) au total</p>
        <div className="page-actions">
          <SearchBar 
            value={searchTerm} 
            onChange={onSearchChange} 
            placeholder="Rechercher une catégorie..." 
          />
          
          <select 
            value={itemsPerPage} 
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="items-per-page-select"
          >
            <option value={8}>8 par page</option>
            <option value={16}>16 par page</option>
            <option value={24}>24 par page</option>
            <option value={42}>42 par page</option>
            <option value={60}>60 par page</option>
            <option value={100}>100 par page</option>
          </select>

          <button className="btn" onClick={onAddCategory}>
            <Plus size={20} /> Nouvelle Catégorie
          </button>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="panel">
          <div className="empty">
            <div style={{ fontSize: '3rem', marginBottom: '12px', opacity: 0.3 }}>📁</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Aucune catégorie trouvée
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              Commencez par créer votre première catégorie de produits
            </p>
          </div>
        </div>
      ) : (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            padding: '0 4px'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              color: 'var(--text-primary)',
              margin: 0 
            }}>
              Toutes les catégories
            </h3>
            <span style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.9rem', 
              fontWeight: 500 
            }}>
              Page {currentPage} sur {totalPages}
            </span>
          </div>

          <div className="cards-grid">
            {currentCategories.map(cat => (
              <CategoryCard 
                key={cat.id} 
                category={cat} 
                onEdit={onEditCategory} 
                onDelete={onDeleteCategory} 
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="panel" style={{ marginTop: '24px', padding: 0 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={categories.length}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
