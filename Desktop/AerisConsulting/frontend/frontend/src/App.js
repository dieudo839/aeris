import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/pages/Dashboard';
import ProductsPage from './components/pages/ProductsPage';
import CategoriesPage from './components/pages/CategoriesPage';
import Modal from './components/ui/Modal';
import { productsAPI, categoriesAPI } from './services/api';
import './App.css';
import ConfirmDialog from './components/ui/ConfirmDialog';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    itemName: '',
    onConfirm: null
  });

  // Fonction pour ouvrir le dialogue de confirmation
  const openConfirmDialog = (title, message, itemName, onConfirm) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      itemName,
      onConfirm
    });
  };

  // Fonction pour fermer le dialogue
  const closeConfirmDialog = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    statut: true,
  });

  const fetchProducts = async () => {
    try {
      const res = await productsAPI.getAll();
      setProducts(res.data);
    } catch (err) {
      console.error('Erreur chargement produits:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoriesAPI.getAll();
      setCategories(res.data);
    } catch (err) {
      console.error('Erreur chargement catégories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const stats = {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalValue: products.reduce((sum, p) => sum + (parseFloat(p.price || 0) * (p.quantity || 0)), 0),
    activeProducts: products.filter(p => p.statut).length,
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || (p.category === parseInt(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const filteredCategories = categories.filter(c =>
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      if (type === 'product') {
        setFormData({
          name: item.name || '',
          price: item.price || '',
          quantity: item.quantity || '',
          category: item.category || item.category_id || '',
          statut: item.statut ?? true,
        });
      } else {
        // Pour les catégories, on ne remplit que les champs nécessaires
        setFormData({
          name: item.name || '',
          price: '',
          quantity: '',
          category: '',
          statut: item.statut ?? true,
        });
      }
    } else {
      setFormData({ name: '', price: '', quantity: '', category: '', statut: true });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', price: '', quantity: '', category: '', statut: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalType === "product") {
        // Préparer les données pour un produit
        const productData = {
          name: formData.name.trim(),
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity, 10),
          category_id: parseInt(formData.category, 10),  // ← Changé de "category" à "category_id"
          statut: formData.statut,
        };

        if (editingItem) {
          await productsAPI.update(editingItem.id, productData);
        } else {
          await productsAPI.create(productData);
        }
        await fetchProducts();
        closeModal();
      } else if (modalType === "category") {
        // Préparer les données pour une catégorie (uniquement name et statut)
        const categoryData = {
          name: formData.name.trim(),
          statut: formData.statut,
        };

        if (editingItem) {
          await categoriesAPI.update(editingItem.id, categoryData);
        } else {
          await categoriesAPI.create(categoryData);
        }
        await fetchCategories();
        closeModal();
      }
    } catch (err) {
      console.error("Erreur API : ", err);
      console.error("Détails:", err.response?.data);
      
      // Afficher un message d'erreur plus détaillé
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || JSON.stringify(err.response?.data)
        || 'Une erreur est survenue';
      
      alert(`Erreur: ${errorMessage}`);
    }
  };

   // Fonction de suppression de produit
  const handleDeleteProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    
    openConfirmDialog(
      'Supprimer le produit',
      'Êtes-vous sûr de vouloir supprimer ce produit ?',
      product?.name,
      async () => {
        // Logique de suppression ici
        await productsAPI.delete(productId);
        await fetchProducts();
      }
    );
  };

  // Fonction de suppression de catégorie
  const handleDeleteCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    
    openConfirmDialog(
      'Supprimer la catégorie',
      'Êtes-vous sûr de vouloir supprimer cette catégorie ? Tous les produits associés seront également affectés.',
      category?.name,
      async () => {
        // Logique de suppression ici
        await categoriesAPI.delete(categoryId);
        await fetchCategories();
      }
    );
  }

  const handleViewChange = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="app">
      <Navbar
        currentView={currentView}
        onViewChange={handleViewChange}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <main className="main-content">
        {currentView === 'dashboard' && (
          <Dashboard products={products} stats={stats} onNavigate={handleViewChange} />
        )}

        {currentView === 'products' && (
          <ProductsPage
            products={filteredProducts}
            categories={categories}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            selectedCategory={selectedCategory}
            onCategoryChange={(e) => setSelectedCategory(e.target.value)}
            onAddProduct={() => openModal('product')}
            onEditProduct={(product) => openModal('product', product)}
            onDeleteProduct={(id) => handleDeleteProduct(id)}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesPage
            categories={filteredCategories}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onAddCategory={() => openModal('category')}
            onEditCategory={(category) => openModal('category', category)}
            onDeleteCategory={(id) => handleDeleteCategory(id)}
          />
        )}
      </main>

      <Modal
        show={showModal}
        type={modalType}
        editingItem={editingItem}
        formData={formData}
        categories={categories}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
      {/* Dialogue de confirmation */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        itemName={confirmDialog.itemName}
      />
    </div>
  );
};

export default App;