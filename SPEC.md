# SPEC.md: RasaNusa

## Tujuan
Katalog produk UMKM makanan/minuman lokal. Media promosi cepat via WhatsApp. Latihan build 1 hari.

## Pengguna
- **Calon Pembeli**: Lihat produk, cari, pesan via WA.
- **Pengelola Toko**: Kelola stok dan data produk (CRUD) di perangkat sama.

## Fitur MVP
1. **Katalog**: Grid 8 produk. Foto, nama, harga (Rp), stok.
2. **Pencarian & Filter**: Cari nama. Filter kategori. Urut harga/stok.
3. **WhatsApp Link**: Tombol pesan otomatis format teks: "Halo, saya mau pesan [Nama Produk]".
4. **Dashboard Admin**:
   - Ringkasan: Total jenis produk, total stok.
   - CRUD: Tambah, edit, hapus produk (simpan di `localStorage`).
   - Flag Unggulan: Tampilkan di posisi atas.

## Data Model (JSON)
```javascript
{
  id: "uuid/timestamp",
  nama: "String",
  kategori: "Makanan|Minuman",
  harga: Number (>=0),
  stok: Integer (>=0),
  deskripsi: "String",
  imageUrl: "String/Placeholder",
  unggulan: Boolean
}
```

## Non-functional Requirements
- **Persistence**: `localStorage`. Data tetap ada saat *refresh*.
- **UI**: Mobile first. Responsive. Vanilla CSS/Tailwind (CDN/Vite).
- **Tech Stack**: Vite, Vanilla JS. Tanpa library eksternal berlebih.

## Risiko
- **Data Loss**: Bersihkan *cache* browser hapus semua produk.
- **Skalabilitas**: `localStorage` terbatas (~5MB). Cukup untuk katalog kecil.

## Out-of-Scope
- Sistem Login/Auth.
- Integrasi Payment Gateway.
- Upload gambar ke server (pakai URL/Base64/Local Path).

## Acceptance Criteria
- [ ] Halaman utama tampilkan 8 produk awal.
- [ ] Pencarian filter produk secara *real-time*.
- [ ] Klik tombol WA buka tab baru ke `wa.me` dengan teks benar.
- [ ] Tambah produk di dashboard muncul di katalog setelah simpan.
- [ ] Ringkasan stok di dashboard update otomatis saat data berubah.

## Implementation Plan
### Iterasi 1: Setup & Display (3 Jam)
- Inisialisasi Vite.
- Buat data *mock* (8 produk).
- Render kartu produk ke DOM.
- Styling dasar (Grid).

### Iterasi 2: Interactive Catalog (3 Jam)
- Logika pencarian (input event).
- Logika sorting & kategori (select event).
- Fungsi generate URL WhatsApp.

### Iterasi 3: Admin Dashboard & Storage (4 Jam)
- Form CRUD.
- Integrasi `localStorage` (Get/Set).
- Hitung statistik ringkasan.
- Final UI polish.

→ skipped: Real image upload, add when server available.
→ skipped: Auth, add when multi-user needed.