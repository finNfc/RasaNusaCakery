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
        <h1 class="logo">RasaNusa <span>Cakery</span></h1>
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
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <h3 class="footer-logo">RasaNusa <span>Cakery</span></h3>
          <p>Kue artisan premium dibuat dengan cinta & bahan pilihan terbaik. Fresh from the oven every morning.</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Menu</h4>
            <ul>
              <li><a href="#katalog">Katalog Kue</a></li>
              <li><a href="#unggulan">Produk Unggulan</a></li>
              <li><a href="#custom">Custom Cake</a></li>
              <li><a href="#minuman">Minuman</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Layanan</h4>
            <ul>
              <li><a href="#pesan">Pesan via WhatsApp</a></li>
              <li><a href="#antrian">Cek Antrian</a></li>
              <li><a href="#kirim">Pengiriman</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Kontak</h4>
            <ul>
              <li>📍 Jl. Rasa Nusantara No. 88</li>
              <li>📞 +62 812-3456-7890</li>
              <li>✉️ hello@rasanusacakery.com</li>
              <li>🕐 Sen-Ming: 08:00 - 21:00</li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Ikuti Kami</h4>
            <div class="social-links">
              <a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" aria-label="TikTok"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.5 3a5.5 5.5 0 0 1 0 11H6.5a5.5 5.5 0 0 1 0-11h10z"/><path d="M12 6.5v7"/><path d="M10 10.5h4"/></svg></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 RasaNusa Cakery. Dibuat dengan ❤️ untuk pecinta kue Indonesia.</p>
      </div>
    </footer>
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