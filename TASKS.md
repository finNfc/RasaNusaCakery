# TASKS.md: RasaNusa Implementation

## Milestone 1: Scaffold (Infrastruktur)
- [ ] Init Vite vanilla JS.
- [ ] Buat struktur folder: `src/main.js`, `src/products.js`, `src/store.js`, `src/ui.js`, `src/style.css`.
- [ ] Konfigurasi `.gitignore`.
- **Acceptance**: File tersedia dan Vite dev server jalan.
- **Files**: `package.json`, `index.html`, `src/*`.

## Milestone 2: Katalog (Tampilan Utama)
- [ ] Buat data awal 8 produk di `src/products.js`.
- [ ] Implementasi render kartu produk di `src/ui.js`.
- [ ] Styling Grid (Mobile-first) di `src/style.css`.
- **Acceptance**: 8 produk muncul di halaman utama dengan layout rapi.
- **Files**: `src/products.js`, `src/ui.js`, `src/style.css`.

## Milestone 3: Interaksi (Pencarian & Filter)
- [ ] Event listener untuk input pencarian.
- [ ] Filter berdasarkan kategori (Makanan/Minuman).
- [ ] Sorting berdasarkan harga/stok.
- **Acceptance**: Hasil pencarian dan filter sesuai input user secara real-time.
- **Files**: `src/main.js`, `src/ui.js`.

## Milestone 4: WhatsApp (Pemesanan)
- [ ] Helper function untuk generate URL wa.me dengan template pesan.
- [ ] Bind event klik tombol pesan di setiap kartu.
- **Acceptance**: Klik tombol pesan buka WhatsApp dengan teks "Halo, saya mau pesan [Nama]".
- **Files**: `src/ui.js`.

## Milestone 5: Dashboard CRUD (Manajemen)
- [ ] Layout dashboard admin.
- [ ] Form tambah/edit produk.
- [ ] Fungsi hapus produk.
- **Acceptance**: Bisa tambah, edit, dan hapus produk dari dashboard.
- **Files**: `src/ui.js`, `src/main.js`.

## Milestone 6: localStorage (Persistensi)
- [ ] Logika simpan/ambil data dari `localStorage` di `src/store.js`.
- [ ] Sinkronisasi data awal dengan storage.
- **Acceptance**: Data tetap ada setelah halaman direfresh.
- **Files**: `src/store.js`.

## Milestone 7: Testing & Security
- [ ] Verifikasi manual semua acceptance criteria di SPEC.md.
- [ ] Sanitasi input form admin (XSS protection).
- **Acceptance**: Tidak ada bug major dan input aman.
- **Files**: `src/main.js`.

## Milestone 8: Build & Deployment
- [ ] Jalankan `npm run build`.
- [ ] Pastikan aset terbundle dengan benar.
- **Acceptance**: Folder `dist/` berisi file yang siap dideploy.
- **Files**: `dist/*`.
