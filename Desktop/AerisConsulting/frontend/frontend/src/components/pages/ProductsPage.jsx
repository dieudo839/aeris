import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Pagination from '../ui/Pagination';
import SearchBar from '../ui/SearchBar';
import ProductRow from '../ui/ProductRow';
import Select from "react-select";

const ProductsPage = ({ products, categories, searchTerm, onSearchChange, selectedCategory, onCategoryChange, onAddProduct, onEditProduct, onDeleteProduct }) => {
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Réinitialiser à la page 1 quand la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Calculs pour la pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

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

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }))

  return (
    <div className="page">
      {/* En-tête avec sélecteur d'éléments par page */}
      <div className="page-header">
        <h2>Gestion des Produits</h2>
        <p>{products.length} produit(s) au total</p>
        <div className="page-actions">
          <SearchBar value={searchTerm} onChange={onSearchChange} />
          
          <Select
            options={[
              {value: "all", label: "Toutes les catégories"},
              ...categoryOptions
            ]}
            value={categoryOptions.find(c => c.value === parseInt(selectedCategory))|| 
              { value: "all", label: "Toutes les catégories" }}
            onChange={(selected) => onCategoryChange({ target: {value: selected.value } })}
            placeholder="Sélectionner une catégorie..."
            isSearchable={true}
            classNamePrefix="rs"
    styles={{
        control: (base) => ({
            ...base,
            minHeight: "40px",
            height: "40px",
            borderRadius: "6px",
            border: "1px solid #bfc2c8",
            boxShadow: "none",
            "&:hover": { borderColor: "#6c63ff" } // couleur lors du hover
        }),
        valueContainer: (base) => ({
            ...base,
            height: "40px",
            padding: "0 8px"
        }),
        input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
        }),
        indicatorsContainer: (base) => ({
            ...base,
            height: "40px"
        }),
        dropdownIndicator: (base) => ({
            ...base,
            padding: "4px"
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "6px",
        })
    }}
          />

          <select 
            value={itemsPerPage} 
            onChange={(e) => handleItemsPerPageChange(e.target.value)}
            className="items-per-page-select"
          >
            <option value={5}>5 par page</option>
            <option value={10}>10 par page</option>
            <option value={25}>25 par page</option>
            <option value={50}>50 par page</option>
            <option value={75}>75 par page</option>
            <option value={100}>100 par page</option>
          </select>

          <button className="btn" onClick={onAddProduct}>
            <Plus /> Nouveau Produit
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Liste des Produits</h3>
        </div>

        {products.length === 0 ? (
          <div className="empty">
            <div style={{ fontSize: '3rem', marginBottom: '12px', opacity: 0.3 }}>📦</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Aucun produit trouvé
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              Commencez par ajouter votre premier produit à l'inventaire
            </p>
          </div>
        ) : (
          <div className="table">
            <div className="table-head">
              <div>Produit</div>
              <div>Catégorie</div>
              <div>Prix Unitaire</div>
              <div>Stock</div>
              <div>Valeur</div>
              <div>Actions</div>
            </div>
            {/* Utiliser currentProducts au lieu de products */}
            <div className="table-body">
              {currentProducts.map(product => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  onEdit={onEditProduct}
                  onDelete={onDeleteProduct}/>
              ))}
            </div>
          </div>
        )}

        {/* Composant Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
        />
      </div>
    </div>
  );
};

export default ProductsPage;