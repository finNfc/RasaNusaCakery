import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildWhatsAppUrl } from './ui';
import { store } from './store';
import { initialProducts } from './products';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
vi.stubGlobal('localStorage', localStorageMock);

describe('RasaNusa Logic Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // 1. WhatsApp URL - Format Internasional 08 -> 62
  it('buildWhatsAppUrl: should convert 08 to 62', () => {
    const p = { id: 1, nama: 'Kopi' };
    expect(buildWhatsAppUrl('0812', p)).toContain('62812');
  });

  // 2. WhatsApp URL - Keep international format
  it('buildWhatsAppUrl: should keep international format', () => {
    const p = { id: 1, nama: 'Kopi' };
    expect(buildWhatsAppUrl('+62812', p)).toContain('62812');
  });

  // 3. WhatsApp URL - URI Encoded message
  it('buildWhatsAppUrl: should encode message', () => {
    const p = { id: 1, nama: 'Kopi Susu' };
    expect(buildWhatsAppUrl('628', p)).toContain('Kopi%20Susu');
  });

  // 4. Store - Save data
  it('store.save: should stringify and save data', () => {
    const data = [{ id: 1, nama: 'Test' }];
    store.save(data);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  // 5. Store - Load valid data
  it('store.load: should load valid array', () => {
    const data = initialProducts;
    localStorage.setItem(store.KEY, JSON.stringify(data));
    const loaded = store.load();
    expect(loaded.length).toBe(data.length);
  });

  // 6. Store - Load corrupted data (Recovery)
  it('store.load: should recover from corrupted JSON', () => {
    localStorage.setItem(store.KEY, '{invalid}');
    const loaded = store.load();
    expect(loaded).toEqual(initialProducts);
  });

  // 7. Store - Load invalid structure (Recovery)
  it('store.load: should recover from non-array data', () => {
    localStorage.setItem(store.KEY, JSON.stringify({ not: 'an array' }));
    const loaded = store.load();
    expect(loaded).toEqual(initialProducts);
  });

  // 8. Store - Validate product field (Price < 0)
  it('store.load: should recover if price is negative', () => {
    const badData = [{ ...initialProducts[0], harga: -100 }];
    localStorage.setItem(store.KEY, JSON.stringify(badData));
    const loaded = store.load();
    expect(loaded).toEqual(initialProducts);
  });

  // 9. Store - Validate category
  it('store.load: should recover if category invalid', () => {
    const badData = [{ ...initialProducts[0], kategori: 'Otomotif' }];
    localStorage.setItem(store.KEY, JSON.stringify(badData));
    const loaded = store.load();
    expect(loaded).toEqual(initialProducts);
  });

  // 10. Store - Reset Demo
  it('store.resetDemo: should clear storage and return initial', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    localStorage.setItem(store.KEY, JSON.stringify([{ id: 99 }]));
    const result = store.resetDemo();
    expect(localStorage.removeItem).toHaveBeenCalledWith(store.KEY);
    expect(result).toEqual(initialProducts);
  });
});
