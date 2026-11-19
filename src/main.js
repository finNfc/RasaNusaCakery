import './style.css';
import { initialProducts } from './products.js';
import { store } from './store.js';
import { renderProducts, renderDashboard } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  let products = store.load();
  if (!products || products.length === 0) {
    products = initialProducts;
    store.save(products);
  }

  // Set up layout
  const app = document.getElementById('app');
  app.innerHTML = `
    <header>
      <h1>RasaNusa</h1>
      <nav>
        <a href="#" id="nav-catalog">Katalog</a>
        <a href="#" id="nav-admin">Dashboard Admin</a>
      </nav>
    </header>
    <div class="filter-bar" id="filter-container">
      <input type="text" id="search-input" placeholder="Cari produk...">
      <select id="category-select">
        <option value="">Semua Kategori</option>
        <option value="Makanan">Makanan</option>
        <option value="Minuman">Minuman</option>
      </select>
      <select id="sort-select">
        <option value="">Urutkan</option>
        <option value="harga">Harga Termurah</option>
        <option value="stok">Stok Terkecil</option>
      </select>
    </div>
    <main id="content-area"></main>
  `;

  let currentView = 'catalog';

  const switchView = (view) => {
    currentView = view;
    const filterContainer = document.getElementById('filter-container');
    if (view === 'catalog') {
      filterContainer.style.display = 'flex';
      renderProducts(products);
    } else {
      filterContainer.style.display = 'none';
      renderDashboard(products);
      setupDashboardEvents();
    }
  };

  document.getElementById('nav-catalog').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('catalog');
  });

  document.getElementById('nav-admin').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('admin');
  });

  // Search & Filter listeners
  document.getElementById('search-input').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.nama.toLowerCase().includes(val));
    renderProducts(filtered);
  });

  document.getElementById('category-select').addEventListener('change', (e) => {
    const val = e.target.value;
    const filtered = val ? products.filter(p => p.kategori === val) : products;
    renderProducts(filtered);
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    const val = e.target.value;
    let sorted = [...products];
    if (val === 'harga') sorted.sort((a, b) => a.harga - b.harga);
    if (val === 'stok') sorted.sort((a, b) => a.stok - b.stok);
    renderProducts(sorted);
  });

  // Initial render
  renderProducts(products);

  function setupDashboardEvents() {
    const form = document.getElementById('product-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('prod-id').value;
      const nama = document.getElementById('prod-nama').value.trim();
      const kategori = document.getElementById('prod-kategori').value;
      const harga = Number(document.getElementById('prod-harga').value);
      const stok = parseInt(document.getElementById('prod-stok').value);
      const imageUrl = document.getElementById('prod-image').value || 'https://via.placeholder.com/150';
      const unggulan = document.getElementById('prod-unggulan').checked;

      if (!nama || !kategori || isNaN(harga) || harga < 0 || isNaN(stok) || stok < 0) {
        alert('Mohon isi data dengan valid!');
        return;
      }

      if (id) {
        // Edit
        products = products.map(p => p.id == id ? { ...p, nama, kategori, harga, stok, imageUrl, unggulan } : p);
      } else {
        // Add
        const newProduct = {
          id: Date.now(),
          nama,
          kategori,
          harga,
          stok,
          imageUrl,
          unggulan
        };
        products.push(newProduct);
      }

      store.save(products);
      renderDashboard(products);
      setupDashboardEvents();
    });

    // Edit buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const p = products.find(item => item.id == id);
        if (p) {
          document.getElementById('prod-id').value = p.id;
          document.getElementById('prod-nama').value = p.nama;
          document.getElementById('prod-kategori').value = p.kategori;
          document.getElementById('prod-harga').value = p.harga;
          document.getElementById('prod-stok').value = p.stok;
          document.getElementById('prod-image').value = p.imageUrl;
          document.getElementById('prod-unggulan').checked = p.unggulan;
          document.getElementById('form-title').innerText = 'Edit Produk';
        }
      });
    });

    // Delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Yakin ingin menghapus produk ini?')) {
          products = products.filter(item => item.id != id);
          store.save(products);
          renderDashboard(products);
          setupDashboardEvents();
        }
      });
    });
  }
});