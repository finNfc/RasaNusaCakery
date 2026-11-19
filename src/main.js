import './style.css';
import { initialProducts, ownerNumber } from './products.js';
import { store } from './store.js';
import { renderProducts, renderDashboard, buildWhatsAppUrl } from './ui.js';

const initApp = () => {
  let products = store.load();
  if (!products || products.length === 0) {
    products = initialProducts;
    store.save(products);
  }

  // Set up layout
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <header class="app-header">
      <div class="header-content">
        <h1 class="logo">Cakery</h1>
        <nav class="main-nav">
          <button id="nav-catalog" class="nav-btn active">Katalog</button>
          <button id="nav-admin" class="nav-btn">Admin Dashboard</button>
        </nav>
      </div>
    </header>
    <div class="toolbar" id="filter-container">
      <div class="search-box">
        <input type="text" id="search-input" placeholder="Cari kue lezat...">
      </div>
      <div class="filters">
        <select id="category-select" class="custom-select">
          <option value="">Semua Kategori</option>
          <option value="Makanan">Kue & Roti</option>
          <option value="Minuman">Minuman</option>
        </select>
        <select id="sort-select" class="custom-select">
          <option value="">Urutkan</option>
          <option value="harga_low">Harga: Murah ke Mahal</option>
          <option value="harga_high">Harga: Mahal ke Murah</option>
          <option value="stok">Stok Terkecil</option>
        </select>
      </div>
    </div>
    <main id="content-area"></main>
  `;

  const contentArea = document.getElementById('content-area');
  let currentProducts = [...products];

  const updateView = () => {
    const navCatalog = document.getElementById('nav-catalog');
    const navAdmin = document.getElementById('nav-admin');
    const filterContainer = document.getElementById('filter-container');

    if (navCatalog.classList.contains('active')) {
      filterContainer.style.display = 'flex';
      renderProducts(currentProducts, (p) => {
        window.open(buildWhatsAppUrl(ownerNumber, p), '_blank');
      });
    } else {
      filterContainer.style.display = 'none';
      renderDashboard(products, {
        onSave: (p) => {
          if (p.id) {
            products = products.map(item => item.id === p.id ? { ...p } : item);
          } else {
            products.push({ ...p, id: Date.now() });
          }
          store.save(products);
          currentProducts = [...products];
          updateView();
        },
        onEdit: (p) => {
          document.getElementById('prod-id').value = p.id;
          document.getElementById('prod-nama').value = p.nama;
          document.getElementById('prod-kategori').value = p.kategori;
          document.getElementById('prod-harga').value = p.harga;
          document.getElementById('prod-stok').value = p.stok;
          document.getElementById('prod-image').value = p.imageUrl;
          document.getElementById('prod-unggulan').checked = p.unggulan;
          document.getElementById('form-title').innerText = 'Edit Produk';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onDelete: (id) => {
          products = products.filter(p => p.id !== id);
          store.save(products);
          currentProducts = [...products];
          updateView();
        },
        onCancel: () => {
          document.getElementById('product-form').reset();
          document.getElementById('prod-id').value = '';
          document.getElementById('form-title').innerText = 'Tambah Produk';
        },
        onExport: () => store.exportJSON(),
        onImport: async (file) => {
          try {
            products = await store.importJSON(file);
            currentProducts = [...products];
            updateView();
          } catch (e) { alert(e.message); }
        },
        onReset: () => {
          localStorage.removeItem(store.KEY);
          products = [...initialProducts];
          currentProducts = [...products];
          updateView();
        }
      });
    }
  };

  document.getElementById('nav-catalog').addEventListener('click', () => {
    document.getElementById('nav-catalog').classList.add('active');
    document.getElementById('nav-admin').classList.remove('active');
    updateView();
  });

  document.getElementById('nav-admin').addEventListener('click', () => {
    document.getElementById('nav-admin').classList.add('active');
    document.getElementById('nav-catalog').classList.remove('active');
    updateView();
  });

  // Search & Filter listeners
  const applyFilters = () => {
    const searchVal = document.getElementById('search-input').value.toLowerCase();
    const catVal = document.getElementById('category-select').value;
    const sortVal = document.getElementById('sort-select').value;

    let filtered = products.filter(p =>
      p.nama.toLowerCase().includes(searchVal) &&
      (!catVal || p.kategori === catVal)
    );

    if (sortVal === 'harga_low') filtered.sort((a, b) => a.harga - b.harga);
    if (sortVal === 'harga_high') filtered.sort((a, b) => b.harga - a.harga);
    if (sortVal === 'stok') filtered.sort((a, b) => a.stok - b.stok);

    currentProducts = filtered;
    renderProducts(currentProducts, (p) => {
      window.open(buildWhatsAppUrl(ownerNumber, p), '_blank');
    });
  };

  document.getElementById('search-input').addEventListener('input', applyFilters);
  document.getElementById('category-select').addEventListener('change', applyFilters);
  document.getElementById('sort-select').addEventListener('change', applyFilters);

  updateView();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}