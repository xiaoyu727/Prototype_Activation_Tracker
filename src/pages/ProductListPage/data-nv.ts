/**
 * NV (New Verticals / Boba Bloom) product data.
 * Uses remote image URLs from Wolt image proxy.
 */
import type { Product } from './types';

import productPlaceholder from '../../images/img_placeholder.png';

function generateGTIN(id: string): string {
  const baseNumber = parseInt(id, 10);
  const randomPart = Math.floor(Math.random() * 1000000);
  const gtin = `12345${String(baseNumber).padStart(2, '0')}${String(randomPart).padStart(6, '0')}`;
  return gtin.slice(0, 13);
}

function generateQualityScore(id: string): number {
  const seed = parseInt(id, 10);
  return 40 + ((seed * 17) % 61);
}

/** NV initial product list — Boba Bloom bubble tea shop. */
export function getInitialProductsDataNV(): Product[] {
  const raw: (Omit<Product, 'gtin' | 'qualityScore'> & { gtin?: string; qualityScore?: number })[] = [
    // Most ordered — some have allergens declared, some don't
    { id: '1', name: 'Brown Sugar Daddy', category: 'Most ordered', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1fe33174-e1b9-11ec-8b48-8286b74c13c6_brown_sugar_daddy.jpeg', brand: 'Boba Bloom', description: 'Rich brown sugar syrup blended with fresh milk and chewy tapioca pearls, topped with a caramelized sugar crust.', allergens: ['Milk', 'Soy'], allergensDeclared: true },
    { id: '2', name: 'Mango with Love', category: 'Most ordered', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3023e614-e1b9-11ec-87cc-824c185fa319_mango_with_love.jpeg', brand: 'Boba Bloom', description: 'Fresh mango puree with jasmine green tea and coconut jelly.', allergens: ['Milk'], allergensDeclared: true },
    { id: '3', name: 'Strawberry Creamy Shake', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3cc43432-e1b9-11ec-adfc-4e1abe6c4042_strawberry_creamy_shake.jpeg', brand: 'Boba Bloom', allergens: ['Milk'], allergensDeclared: true },
    { id: '4', name: 'Mango without Love', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/119ea908-e1ba-11ec-a862-6e57b258b00b_mango_without_love.jpeg', brand: 'Boba Bloom' },
    { id: '5', name: 'Strawberry Kiss', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/2186f104-e1ba-11ec-80aa-2acea55ca2fe_strawberrykiss.jpeg', brand: 'Boba Bloom' },
    { id: '6', name: 'Lychee Butterfly Pea', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/29260ee0-e1ba-11ec-a266-f6aec82f0961_lychee_butterfly_pea.jpeg', brand: 'Boba Bloom', description: 'Butterfly pea flower tea with lychee syrup and tapioca pearls.', allergens: [], allergensDeclared: true },
    { id: '7', name: 'Brown Sugar Daddy Choco', category: 'Most ordered', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1784be6c-e1b9-11ec-95b5-ce1f61d61672_brown_sugar_daddy_choco.jpeg', brand: 'Boba Bloom' },
    { id: '8', name: 'Burning Sugar Daddy 0,7l', category: 'Most ordered', price: '€ 7.20', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/9f33926e-f156-11ec-bd8a-0ef4ff66a715_burningsugardaddy.jpeg', brand: 'Boba Bloom' },
    { id: '9', name: 'Classic but not Boring', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/72ba0d82-e1b9-11ec-a525-ce1f61d61672_classic_but_not_boring_milk_tea.jpeg', brand: 'Boba Bloom', description: 'A classic milk tea with a twist — brown sugar boba pearls in a smooth black tea base.', allergens: ['Milk'], allergensDeclared: true },
    { id: '10', name: 'Peach Please', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/17e113e6-e1ba-11ec-ba49-568fb4aa13f7_peach_please.jpeg', brand: 'Boba Bloom' },
    { id: '11', name: 'Matcha Yes I am Green Latte', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/4b8f14d2-e1b9-11ec-84f7-568fb4aa13f7_matcha_yes_i_am__green_latte.jpeg', brand: 'Boba Bloom' },
    { id: '12', name: 'Fizzy Green Apple', category: 'Most ordered', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/7d8f2684-e1b9-11ec-93d1-6ad5f248b449_fizzy_green_apple.jpeg', brand: 'Boba Bloom', allergens: [], allergensDeclared: true },

    // Specials
    { id: '13', name: 'Burning Sugar Daddy 0,7l', category: 'Specials', price: '€ 7.20', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/9f33926e-f156-11ec-bd8a-0ef4ff66a715_burningsugardaddy.jpeg', brand: 'Boba Bloom' },

    // Fruit tea — mostly undeclared
    { id: '14', name: 'Lychee Butterfly Pea', category: 'Fruit tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/29260ee0-e1ba-11ec-a266-f6aec82f0961_lychee_butterfly_pea.jpeg', brand: 'Boba Bloom', allergens: [], allergensDeclared: true },
    { id: '15', name: 'Strawberry Kiss', category: 'Fruit tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/2186f104-e1ba-11ec-80aa-2acea55ca2fe_strawberrykiss.jpeg', brand: 'Boba Bloom' },
    { id: '16', name: 'Peach Please', category: 'Fruit tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/17e113e6-e1ba-11ec-ba49-568fb4aa13f7_peach_please.jpeg', brand: 'Boba Bloom' },
    { id: '17', name: 'Mango without Love', category: 'Fruit tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/119ea908-e1ba-11ec-a862-6e57b258b00b_mango_without_love.jpeg', brand: 'Boba Bloom' },
    { id: '18', name: 'Passion Fruit Temptation', category: 'Fruit tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/8c563950-e1b9-11ec-b5b9-ca69c06f9b34_maracuja_temptation.jpeg', brand: 'Boba Bloom' },
    { id: '19', name: 'Kiwi Mar-Tea-Ni', category: 'Fruit tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/85f438be-e1b9-11ec-9c4c-aa05e0781374_kiwi_mar_tea_ni.jpeg', brand: 'Boba Bloom' },
    { id: '20', name: 'Fizzy Green Apple', category: 'Fruit tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/7d8f2684-e1b9-11ec-93d1-6ad5f248b449_fizzy_green_apple.jpeg', brand: 'Boba Bloom' },

    // Milk tea — some missing images and allergens
    { id: '21', name: 'Classic but not Boring', category: 'Milk tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/72ba0d82-e1b9-11ec-a525-ce1f61d61672_classic_but_not_boring_milk_tea.jpeg', brand: 'Boba Bloom', allergens: ['Milk'], allergensDeclared: true },
    { id: '22', name: 'Matcha Yes I am Green Latte', category: 'Milk tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/4b8f14d2-e1b9-11ec-84f7-568fb4aa13f7_matcha_yes_i_am__green_latte.jpeg', brand: 'Boba Bloom' },
    { id: '23', name: 'Strawberry Creamy Shake', category: 'Milk tea', price: '€ 6.30', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3cc43432-e1b9-11ec-adfc-4e1abe6c4042_strawberry_creamy_shake.jpeg', brand: 'Boba Bloom' },
    { id: '24', name: 'Taro Milk Tea', category: 'Milk tea', price: '€ 6.30', status: 'Active', brand: 'Boba Bloom' },
    { id: '25', name: 'Okinawa Milk Tea', category: 'Milk tea', price: '€ 6.50', status: 'Active', brand: 'Boba Bloom' },
    { id: '26', name: 'Hokkaido Milk Tea', category: 'Milk tea', price: '€ 6.30', status: 'Inactive', brand: 'Boba Bloom' },

    // Signature drinks — some missing images
    { id: '27', name: 'Mango with Love', category: 'Signature drinks', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/3023e614-e1b9-11ec-87cc-824c185fa319_mango_with_love.jpeg', brand: 'Boba Bloom', allergens: ['Milk'], allergensDeclared: true },
    { id: '28', name: 'Tropical Passion', category: 'Signature drinks', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/27e8016a-e1b9-11ec-9391-568fb4aa13f7_tropical_passion.jpeg', brand: 'Boba Bloom' },
    { id: '29', name: 'Brown Sugar Daddy', category: 'Signature drinks', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1fe33174-e1b9-11ec-8b48-8286b74c13c6_brown_sugar_daddy.jpeg', brand: 'Boba Bloom', allergens: ['Milk', 'Soy'], allergensDeclared: true },
    { id: '30', name: 'Brown Sugar Daddy Choco', category: 'Signature drinks', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/1784be6c-e1b9-11ec-95b5-ce1f61d61672_brown_sugar_daddy_choco.jpeg', brand: 'Boba Bloom' },
    { id: '31', name: 'Brown Sugar Daddy Matcha', category: 'Signature drinks', price: '€ 6.80', status: 'Active', image: 'https://imageproxy.wolt.com/menu/menu-images/629720efe4d32b688fd171ee/00aadf32-e1b9-11ec-abb2-6e57b258b00b_brown_sugar_daddy_matcha.jpeg', brand: 'Boba Bloom' },
    { id: '32', name: 'Rose Lychee Boba', category: 'Signature drinks', price: '€ 7.00', status: 'Active', brand: 'Boba Bloom' },
    { id: '33', name: 'Ube Coconut Boba', category: 'Signature drinks', price: '€ 7.20', status: 'Inactive', brand: 'Boba Bloom' },
  ];

  return raw.map((p) => ({
    ...p,
    gtin: p.gtin ?? generateGTIN(p.id),
    qualityScore: p.qualityScore !== undefined ? p.qualityScore : generateQualityScore(p.id),
  })) as Product[];
}

export { productPlaceholder as productPlaceholderNV };
