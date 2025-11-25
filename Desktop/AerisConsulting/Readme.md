# Application de Gestion de Produits (Inventaire)

## Description
Application fullstack pour gérer un inventaire de produits avec une interface web moderne et une API REST performante.

- **Backend** : Django + Django REST Framework  
- **Frontend** : React.js  
- **Base de données** : SQLite  

Fonctionnalités : ajout, modification, suppression, recherche et filtrage de produits.

## Fonctionnalités

- Ajouter, modifier et supprimer un produit
- Champs : nom, prix, quantité, catégorie, date d’ajout
- Liste des produits avec recherche par nom et filtre par catégorie
- API REST complète pour CRUD
- Interface responsive pour desktop et mobile

## Technologies utilisées

- **Backend** : Django, Django REST Framework, SQLite  
- **Frontend** : React.js, Axios, Bootstrap / Tailwind CSS  
- **Outils** : Git, Postman, VS Code

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/dieudo839/aeris.git
cd AerisConsulting

2. Backend Django
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


API disponible sur : http://localhost:8000/api/

3. Frontend React
cd frontend
npm install
npm start


Frontend disponible sur : http://localhost:3000
