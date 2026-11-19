# Cakery (RasaNusa Cakery)

Aplikasi web toko kue artisan berbasis **Vite + Vanilla JS**. Menyediakan katalog kue premium, pencarian, filter kategori, pemesanan langsung via WhatsApp, serta **Admin Dashboard** untuk manajemen data produk secara lokal.

---

## 🎯 Tujuan
Menyediakan antarmuka toko kue online yang elegan, responsif, dan mudah digunakan (tanpa kompleksitas backend yang berat), cocok untuk UMKM kuliner skala kecil hingga menengah.

---

## ✨ Fitur Utama
1. **Katalog & Filter Interaktif**:
   - Pencarian produk secara real-time berdasarkan nama.
   - Filter kategori (Kue & Roti, Minuman).
   - Pengurutan berdasarkan harga (rendah ke tinggi, tinggi ke rendah) dan stok.
2. **Pemesanan via WhatsApp**:
   - Setiap kartu produk memiliki tombol pemesanan yang otomatis mengarahkan ke WhatsApp dengan format pesan siap kirim.
3. **Admin Dashboard (Client-Side Management)**:
   - Tambah, edit, dan hapus produk.
   - Ekspor data produk ke file JSON (`rasanusa-products.json`).
   - Impor data produk dari file JSON dengan validasi skema ketat.
   - Tombol reset demo untuk mengembalikan data ke kondisi awal.
4. **Keamanan**:
   - Sanitasi string / `escapeHtml` untuk mencegah XSS pada data dinamis.
5. **Responsif**:
   - Desain tata letak yang dioptimalkan untuk perangkat mobile dan desktop.

---

## 🛠️ Stack Teknologi
- **Build Tool**: Vite (v5)
- **Bahasa**: Vanilla JavaScript (ES Modules), HTML5, CSS3 (Custom Properties, Google Fonts: *Playfair Display* & *DM Sans*)
- **Testing**: Vitest + JSDOM (v1.6)
- **Deployment**: Vercel

---

## ⚙️ Cara Instal
Pastikan Node.js sudah terinstal di komputer Anda, lalu jalankan perintah berikut di terminal:

```bash
# Kloning repository
git clone https://github.com/finNfc/RasaNusaCakery.git

# Masuk ke direktori proyek
cd RasaNusaCakery

# Instal dependensi
npm install
```

---

## 🧪 Cara Test
Proyek ini dilengkapi dengan unit test untuk logika penyimpanan dan validasi data (`store.js`).

```bash
npm test
```

---

## 📦 Cara Build (Production)
Untuk menghasilkan berkas statis siap produksi di folder `dist/`:

```bash
npm run build
```

Untuk melihat hasil build secara lokal:
```bash
npm run preview
```

---

## 🚀 Deployment ke Vercel
Proyek ini dikonfigurasi untuk terintegrasi dengan Vercel:
1. Hubungkan repository GitHub Anda ke Vercel.
2. Vercel secara otomatis mendeteksi framework **Vite** dengan pengaturan:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Setiap *push* ke branch `main` akan memicu *deployment* otomatis.

---

## ⚠️ Keterbatasan Sistem (`localStorage` & Arsitektur)
- **Penyimpanan Lokal Saja (`localStorage`)**: 
  - Data produk disimpan pada key `rasanusa:products:v1` di browser pengguna.
  - Perubahan data di satu perangkat/browser tidak tersinkronisasi ke perangkat lain.
- **Tidak Ada Autentikasi Backend**:
  - Halaman Admin Dashboard bersifat terbuka secara klien tanpa proteksi password/token backend. 
  - Tidak cocok untuk sistem multi-user dengan manajemen hak akses (RBAC).
- **Kapasitas Penyimpanan**:
  - `localStorage` dibatasi sekitar 5–10 MB, tidak disarankan untuk menyimpan gambar biner berukuran besar (gunakan URL eksternal untuk gambar).
