# UI-SPEC.md: RasaNusa

## Design Language
- **Warna**: 
  - Background: Krem Hangat (`#FDF6E3`)
  - Aksen/Primary: Hijau Rempah (`#4A6741`)
  - Text: Dark Slate (`#2D2D2D`)
- **Tipografi**: Sans-serif (Inter/system-ui).
- **Kontras**: WCAG AA Compliant.

## Komponen
- **Navbar**: Logo kiri, nav kanan (Katalog, Admin).
- **Hero**: Tagline, background krem.
- **Grid Produk**: Card (border halus, bayangan tipis).
- **Filter**: Dropdown Kategori, Input Pencarian.
- **Button WA**: Hijau dengan icon teks putih.
- **Admin**: Table sederhana, Form modal.

## Wireframe
### Mobile (Satu Kolom)
```text
[ Navbar ]
[ Hero Text ]
[ Search | Filter ]
[ Product Card 1 ]
[ Product Card 2 ]
...
[ Footer ]
```

### Desktop (Grid Multi-Kolom)
```text
[ Navbar (Logo... Katalok | Admin) ]
[          Hero Text           ]
[ Search | Filter ]
[ Card 1 | Card 2 | Card 3 | Card 4 ]
[ Card 5 | Card 6 | Card 7 | Card 8 ]
[ Footer ]
```

## Dashboard Demo (Admin)
```text
[ Sidebar/Tab: Ringkasan | Produk ]
[ Total Produk: 8 | Total Stok: 120 ]
[ [Tambah Produk] ]
[ Table: Nama | Kategori | Harga | Stok | Aksi ]
[ ...data rows... ]
```
