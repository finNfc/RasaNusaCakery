import { initialProducts } from './products.js';

export const store = {
  // Key dengan versi: rasanusa:products:v1
  KEY: 'rasanusa:products:v1',

  // Simpan data ke localStorage
  save: (data) => {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(store.KEY, json);
      console.log('Data tersimpan:', json.substring(0, 100) + '...');
      return true;
    } catch (e) {
      console.error('Gagal simpan data:', e);
      return false;
    }
  },

  // Muat data dari localStorage dengan validasi
  load: () => {
    try {
      const raw = localStorage.getItem(store.KEY);
      if (!raw) throw new Error('Tidak ada data di storage');

      const parsed = JSON.parse(raw);

      // Validasi array
      if (!Array.isArray(parsed)) {
        throw new Error('Data harus berupa array');
      }

      // Validasi tiap elemen
      for (let i = 0; i < parsed.length; i++) {
        const p = parsed[i];
        if (!p || typeof p !== 'object') throw new Error(`Elemen ${i} bukan object`);
        if (typeof p.id !== 'number') throw new Error(`Elemen ${i}: id harus number`);
        if (typeof p.nama !== 'string') throw new Error(`Elemen ${i}: nama harus string`);
        if (!['Makanan', 'Minuman'].includes(p.kategori)) throw new Error(`Elemen ${i}: kategori tidak valid`);
        if (typeof p.harga !== 'number' || p.harga < 0) throw new Error(`Elemen ${i}: harga harus number >= 0`);
        if (!Number.isInteger(p.stok) || p.stok < 0) throw new Error(`Elemen ${i}: stok harus integer >= 0`);
        if (typeof p.deskripsi !== 'string') throw new Error(`Elemen ${i}: deskripsi harus string`);
        if (typeof p.imageUrl !== 'string') throw new Error(`Elemen ${i}: imageUrl harus string`);
        if (typeof p.unggulan !== 'boolean') throw new Error(`Elemen ${i}: unggulan harus boolean`);
      }

      console.log('Data berhasil dimuat:', parsed.length, 'produk');
      return parsed;

    } catch (e) {
      console.error('Gagal muat data:', e.message);
      console.log('Pulihkan ke data awal...');
      store.save(initialProducts);
      // Tampilkan pemberitahuan
      const notif = document.createElement('div');
      notif.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);background:#ffcccc;padding:10px;border-radius:4px;z-index:9999;';
      notif.innerHTML = '<strong>Data korup!</strong> Dipulihkan ke contoh awal.';
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 3000);
      return [...initialProducts];
    }
  },

  // Export data sebagai JSON
  exportJSON: () => {
    const data = store.load();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rasanusa-products.json';
    a.click();
    URL.revokeObjectURL(url);
    console.log('Data diekspor sebagai JSON');
  },

  // Impor data dari JSON (file upload)
  importJSON: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (!Array.isArray(imported)) throw new Error('Import harus berupa array');
          // Validasi dasar
          for (const item of imported) {
            if (!item.id || !item.nama || !item.kategori || typeof item.harga === 'undefined' || typeof item.stok === 'undefined') {
              throw new Error('Struktur produk tidak valid');
            }
          }
          store.save(imported);
          console.log('Data berhasil diimpor');
          resolve(imported);
        } catch (err) {
          console.error('Gagal impor JSON:', err.message);
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },

  // Reset demo: hapus data dan kembalikan ke awal
  resetDemo: () => {
    if (confirm('Yakin ingin reset data? Semua perubahan akan hilang.')) {
      localStorage.removeItem(store.KEY);
      console.log('Data direset');
      return [...initialProducts];
    }
    return store.load();
  }
};