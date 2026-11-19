import { ownerNumber } from './products.js';

export const buildWhatsAppUrl = (nomor, produk) => {
  const cleanNumber = nomor.replace(/\D/g, '');
  const finalNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.slice(1) : cleanNumber;
  const message = `Halo, saya mau pesan ${produk.nama} (ID: ${produk.id})`;
  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`;
};

export const renderProducts = (products) => {
  const container = document.getElementById('content-area');
  if (!container) return;

  container.innerHTML = `
    <div class="product-grid">
      ${products.map(p => `
        <div class="product-card ${p.stok === 0 ? 'out-of-stock' : ''}">
          <img src="${p.imageUrl}" alt="${p.nama}">
          <h3>${p.nama} ${p.unggulan ? '⭐' : ''}</h3>
          <p class="category">${p.kategori}</p>
          <p class="price">Rp ${p.harga.toLocaleString('id-ID')}</p>
          <p class="stock">Stok: ${p.stok}</p>
          <button 
            onclick="window.open('${buildWhatsAppUrl(ownerNumber, p)}', '_blank')"
            ${p.stok === 0 ? 'disabled' : ''}
          >
            ${p.stok === 0 ? 'Stok Habis' : 'Pesan via WhatsApp'}
          </button>
        </div>
      `).join('')}
    </div>
  `;
};

export const renderDashboard = (products) => {
  const container = document.getElementById('content-area');
  if (!container) return;

  const totalStock = products.reduce((acc, p) => acc + Number(p.stok), 0);

  container.innerHTML = `
    <div class="dashboard">
      <div class="stats">
        <div class="stat-card">Total Produk: <strong>${products.length}</strong></div>
        <div class="stat-card">Total Stok: <strong>${totalStock}</strong></div>
      </div>

      <div class="crud-form">
        <h3 id="form-title">Tambah Produk</h3>
        <form id="product-form">
          <input type="hidden" id="prod-id">
          <input type="text" id="prod-nama" placeholder="Nama Produk" required>
          <select id="prod-kategori" required>
            <option value="">Pilih Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
          <input type="number" id="prod-harga" placeholder="Harga" min="0" required>
          <input type="number" id="prod-stok" placeholder="Stok" min="0" required>
          <input type="text" id="prod-image" placeholder="Image URL (Placeholder OK)" value="https://via.placeholder.com/150">
          <label><input type="checkbox" id="prod-unggulan"> Unggulan</label>
          <div class="form-btns">
            <button type="submit" class="btn-primary">Simpan</button>
            <button type="reset" id="btn-cancel" class="btn-secondary">Batal</button>
          </div>
        </form>
      </div>

      <table class="product-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kat</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td>${p.nama} ${p.unggulan ? '⭐' : ''}</td>
              <td>${p.kategori}</td>
              <td>${p.harga}</td>
              <td>${p.stok}</td>
              <td>
                <button class="btn-edit" data-id="${p.id}">Edit</button>
                <button class="btn-delete" data-id="${p.id}">Hapus</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};