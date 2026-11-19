# RasaNusa Cakery - Dokumentasi Teknis

## ✅ Checklist Keamanan & Kualitas

- [x] **Token/API Key**: Tidak ada di kode sumber
- [x] **Data Pelanggan Nyata**: Tidak ada (hanya data produk dummy)
- [x] **Build**: Berhasil (`npm run build`)
- [x] **Test**: 10/10 lolos (`npm test` dengan jsdom)
- [x] **WhatsApp Link**: Logika benar, nomor placeholder (`+628****7890`)
- [x] **Mobile Responsif**: Breakpoint 768px & 1024px di CSS
- [x] **localStorage Limitations**: Terddokumentasi di bawah

## 🔗 Verifikasi WhatsApp Link

**Logika** (`src/ui.js:9-14`):
```javascript
buildWhatsAppUrl = (nomor, produk) => {
  const cleanNumber = nomor.replace(/\D/g, '');
  const finalNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.slice(1) : cleanNumber;
  const message = `Halo, saya mau pesan ${produk.nama} (ID: ${produk.id})`;
  return `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`;
}
```

**Hasil untuk placeholder `+628****7890`**:
- Membersihkan: `6287890` (hanya digit)
- Format final: `6287890` (tidak diawali `0`)
- URL: `https://wa.me/6287890?text=Halo%2C%20saya%20mau%20pesan%20Kue%20Lapis%20(ID%3A%201)`

> ⚠️ **Catatan**: Nomor `+628****7890` adalah **placeholder demo**. Di produksi, ganti dengan nomor WhatsApp bisnis asli (format: `+628xxxxxxxxxx` minimal 10-12 digit setelah `62`).

## 📱 Responsif Mobile

CSS mengandung breakpoint:
- **≤ 768px**: Stack vertikal (header, toolbar, grid 1 kolom, footer 1 kolom)
- **≤ 1024px**: Footer 2 kolom
- **> 1024px**: Layout penuh (grid multi-kolom, footer 5 kolom)

Tested via Chrome DevTools device toolbar - tidak ada overflow horizontal, touch target ≥ 48px.

## ⚠️ Keterbatasan localStorage (Key: `rasanusa:products:v1`)

| Batasan | Detail | Mitigasi |
|---------|--------|----------|
| **Kapasitas** | ~5-10 MB per origin (browser dependent) | Cukup untuk ratusan produk; tidak untuk gambar base64 |
| **Sinkronisasi** | Hanya device/browser yang sama | Tidak cocok multi-device / multi-user |
| **Persistensi** | Bisa dihapus user via "Clear Site Data" | Export/Import JSON tersedia di Admin Dashboard |
| **Concurrency** | Tidak ada locking; race condition jika tab ganda | Demo single-user; produksi butuh backend |
| **Tipe Data** | Hanya string (perlu `JSON.parse/stringify`) | Validasi ketat di `store.load()` |
| **Keamanan** | Terbaca script same-origin (XSS risk) | `escapeHtml` pada render; tidak simpan data sensitif |
| **Private Browsing** | Blokir/ditolak di beberapa browser (Safari) | Fallback ke `initialProducts` di `store.load()` |

## 🛡️ Audit Keamanan (Dev Dependencies)

`npm audit` melaporkan 5 kerentanan di **dev tools** (`vite`, `vitest`, `esbuild`, `tinypool`):
- Semua **hanya mempengaruhi development server**, bukan production build
- Production build (`dist/`) statis, tidak menjalankan Vite/Vitest
- Upgrade major (Vite 5→8, Vitest 1→5) **tidak dilakukan** per instruksi (breaking changes, lingkungan latihan 1 hari)

**Rekomendasi produksi**:
1. `npm audit fix --force` di lingkungan terisolasi
2. Jalankan regresi test penuh
3. Deploy hanya folder `dist/`

## 🚀 Menjalankan

```bash
# Development
npm run dev      # http://localhost:5173

# Production build
npm run build    # Output ke dist/

# Preview production build
npm run preview  # http://localhost:4173

# Test
npm test         # Vitest + jsdom (10 tests)
```