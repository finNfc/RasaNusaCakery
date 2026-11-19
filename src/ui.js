import { ownerNumber } from './products.js';

export const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

export const buildWhatsAppUrl = (nomor, produk) => {
  const cleanNumber = nomor.replace(/\D/g, '');
  const finalNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.slice(1) : cleanNumber;
  const message = `Halo, saya mau pesan ${produk.nama} (ID: ${produk.id})`;
  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`;
};

export const renderProducts = (products, onWhatsAppClick) => {
  const container = document.getElementById('content-area');
  if (!container) return;

  container.innerHTML = `
    <div class="product-grid">
      ${products.map(p => `
        <article class="product-card ${p.stok === 0 ? 'out-of-stock' : ''}" data-id="${p.id}">
          <div class="product-image">
            <img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.nama)}" loading="lazy">
            ${p.unggulan ? '<span class="badge-featured">⭐ Unggulan</span>' : ''}
            ${p.stok === 0 ? '<span class="badge-out">Stok Habis</span>' : ''}
          </div>
          <div class="product-info">
            <h3 class="product-name">${escapeHtml(p.nama)}</h3>
            <p class="product-category">${escapeHtml(p.kategori)}</p>
            <p class="product-description">${escapeHtml(p.deskripsi)}</p>
            <div class="product-meta">
              <span class="product-price">Rp ${p.harga.toLocaleString('id-ID')}</span>
              <span class="product-stock">Stok: ${p.stok}</span>
            </div>
          </div>
          <button class="btn-whatsapp" data-id="${p.id}" ${p.stok === 0 ? 'disabled' : ''}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.67m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.46-3.637c0-.42.077-.835.231-1.23.16-.406.449-.81.97-1.22.502-.398 1.29-1.02 1.584-1.275a4.8 4.8 0 00.603-.602c.286-.27.602-.7.805-.91.406-.416.51-1.083.51-1.747 0-.55-.089-1.164-.313-1.584-.224-.42-.63-.63-1.045-.826-.415-.196-1.152-.298-1.64-.225-.49.073-.798.15-1.112.337-.312.186-.71.435-1.106.686-.396.25-.71.41-1.06.603-.35.19-.826.4-.826.827 0 .42.36.827 1.113 1.027a8.4 8.4 0 001.22.91c.24.23.547.435.792.788.246.35.173 1.027-.047 1.44-.22.413-.52.93-1.01 1.35-.33.28-.64.48-1.06.57-.41.09-.9.133-1.378.11-.257-.01-.747-.09-1.145-.312-.398-.22-.88-.398-1.4-.64-.52-.243-1.07-.67-1.47-1.02-.13-.11-.3-.29-.585-.725a8.9 8.9 0 01-.048-.802c0-.482.372-.91.89-1.32.476-.384 1.065-.67 1.747-.885.68-.213 1.71-.29 2.413-.223.704.066 1.532.26 2.12.66.588.4.92 1.05.92 1.816 0 .675-.22 1.6-.59 2.34-.41.83-.93 1.995-1.7 3.26-.65 1.1-.947 2.27-1.16 3.28-.14.7-.14 1.8-.05 2.25.09.47.42.93.86 1.17.436.24 1.04.24 1.53-.07.53-.346 1.1-.86 1.47-1.378.297-.42.51-1.17.584-1.53.073-.36.077-.63-.016-.82z"/></svg>
            <span>${p.stok === 0 ? 'Stok Habis' : 'Pesan via WhatsApp'}</span>
          </button>
        </article>
      `).join('')}
    </div>
  `;

  if (onWhatsAppClick) {
    container.querySelectorAll('.btn-whatsapp').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        const product = products.find(p => p.id === id);
        if (product && product.stok > 0) {
          onWhatsAppClick(product);
        }
      });
    });
  }
};

export const renderDashboard = (products, callbacks) => {
  const container = document.getElementById('content-area');
  if (!container) return;

  const totalStock = products.reduce((acc, p) => acc + Number(p.stok), 0);

  container.innerHTML = `
    <div class="dashboard">
      <div class="stats">
        <div class="stat-card">
          <span class="stat-value">${products.length}</span>
          <span class="stat-label">Total Produk</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${totalStock}</span>
          <span class="stat-label">Total Stok</span>
        </div>
      </div>

      <div class="crud-form">
        <h3 id="form-title">Tambah Produk</h3>
        <form id="product-form">
          <input type="hidden" id="prod-id">
          <div class="form-group">
            <label for="prod-nama">Nama Produk</label>
            <input type="text" id="prod-nama" placeholder="Nama kue..." required>
          </div>
          <div class="form-group">
            <label for="prod-kategori">Kategori</label>
            <select id="prod-kategori" required>
              <option value="">Pilih Kategori</option>
              <option value="Makanan">Makanan (Kue)</option>
              <option value="Minuman">Minuman</option>
            </select>
          </div>
          <div class="form-group">
            <label for="prod-harga">Harga (Rp)</label>
            <input type="number" id="prod-harga" placeholder="Harga" min="0" required>
          </div>
          <div class="form-group">
            <label for="prod-stok">Stok</label>
            <input type="number" id="prod-stok" placeholder="Stok" min="0" required>
          </div>
          <div class="form-group">
            <label for="prod-image">URL Gambar</label>
            <input type="text" id="prod-image" placeholder="https://..." value="https://via.placeholder.com/150">
          </div>
          <div class="form-group checkbox-group">
            <label><input type="checkbox" id="prod-unggulan"> Unggulan (Tampilkan di atas)</label>
          </div>
          <div class="form-btns">
            <button type="submit" class="btn-primary">Simpan</button>
            <button type="button" id="btn-cancel" class="btn-secondary">Batal</button>
          </div>
        </form>
      </div>

      <div class="table-container">
        <table class="product-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Unggulan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>${escapeHtml(p.nama)} ${p.unggulan ? '⭐' : ''}</td>
                <td>${escapeHtml(p.kategori)}</td>
                <td>Rp ${p.harga.toLocaleString('id-ID')}</td>
                <td>${p.stok}</td>
                <td>${p.unggulan ? '✓' : ''}</td>
                <td>
                  <button class="btn-edit" data-id="${p.id}" aria-label="Edit ${escapeHtml(p.nama)}">Edit</button>
                  <button class="btn-delete" data-id="${p.id}" aria-label="Hapus ${escapeHtml(p.nama)}">Hapus</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="dashboard-actions">
        <button id="btn-export" class="btn-secondary">Export JSON</button>
        <button id="btn-import-trigger" class="btn-secondary">Import JSON</button>
        <input type="file" id="file-import" accept=".json" style="display:none">
        <button id="btn-reset" class="btn-danger">Reset Data</button>
      </div>
    </div>
  `;

  // Form submit
  const form = document.getElementById('product-form');
  if (form && callbacks?.onSave) {
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

      callbacks.onSave({ id: id ? Number(id) : null, nama, kategori, harga, stok, imageUrl, unggulan });
    });
  }

  // Cancel button
  const cancelBtn = document.getElementById('btn-cancel');
  if (cancelBtn && callbacks?.onCancel) {
    cancelBtn.addEventListener('click', () => {
      callbacks.onCancel();
    });
  }

  // Edit buttons
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const p = products.find(item => item.id == id);
      if (p && callbacks?.onEdit) {
        callbacks.onEdit(p);
      }
    });
  });

  // Delete buttons
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Yakin ingin menghapus produk ini?') && callbacks?.onDelete) {
        callbacks.onDelete(Number(id));
      }
    });
  });

  // Export
  const exportBtn = document.getElementById('btn-export');
  if (exportBtn && callbacks?.onExport) {
    exportBtn.addEventListener('click', callbacks.onExport);
  }

  // Import
  const importTrigger = document.getElementById('btn-import-trigger');
  const fileInput = document.getElementById('file-import');
  if (importTrigger && fileInput && callbacks?.onImport) {
    importTrigger.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) callbacks.onImport(e.target.files[0]);
      e.target.value = '';
    });
  }

  // Reset
  const resetBtn = document.getElementById('btn-reset');
  if (resetBtn && callbacks?.onReset) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Yakin ingin reset data? Semua perubahan akan hilang.')) {
        callbacks.onReset();
      }
    });
  }
};