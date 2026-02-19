/**
 * RX (Restaurants / Burgeramt Prenzlauer Berg) product data.
 * Images: prefer matching file in src/images/RX; fallback src/images/RX/img_placeholder.png.
 */
import type { Product } from './types';

import rxPlaceholder from '../../images/RX/img_placeholder.png';

// Product images (exact or alternate filename match)
import imgCheesebombBurger from '../../images/RX/Cheesebomb Burger.avif';
import imgChiliCheesebombBurger from '../../images/RX/Chili Cheesebomb Burger.avif';
import imgMobbBeefBurger from '../../images/RX/Mobb Beef Burger.avif';
import imgCheatDayBurger from '../../images/RX/Cheat Day Burger.avif';
import imgSmokeyPigBurger from '../../images/RX/Smokey Pig Burger.avif';
import imgChickenChiliCheeseBurger from '../../images/RX/Chicken Chili Cheese Burger.avif';
import imgChickenClassicBurger from '../../images/RX/Chicken Classic Burger.avif';
import imgRapBeevBurger from '../../images/RX/Rap Beev Burger.avif';
import imgFries from '../../images/RX/Fries.avif';
import imgSuperCheeseFries from '../../images/RX/Super Cheese Fries.avif';
import imgNuttyFries from '../../images/RX/Nutty Fries.avif';
import imgHoodFries from '../../images/RX/Hood Fries.avif';
import imgChickenNuggets from '../../images/RX/Chicken Nuggets.avif';
import imgTripleChocolate from '../../images/RX/Triple Chocolate.avif';
import imgMacadamiaWhiteChocolate from '../../images/RX/Macadamia White Chocolate.avif';
import imgTomatoKetchup from '../../images/RX/Tomato Ketchup.avif';
import imgMayonnaise from '../../images/RX/Mayonnaise.avif';
import imgBarbecuesoße from '../../images/RX/Barbecuesoße.avif';
import imgCocaColaZero from '../../images/RX/Coca-Cola Zero 0,33.avif';
import imgFanta from '../../images/RX/Fanta 0,33.avif';
import imgStillWater from '../../images/RX/still water.avif';
import imgSparklingWater from '../../images/RX/sparking water.avif';

/** Map product name -> image URL. No entry = use placeholder. */
const RX_IMAGE_BY_NAME: Record<string, string> = {
  'Cheesebomb Burger': imgCheesebombBurger,
  'Chili Cheesebomb Burger': imgChiliCheesebombBurger,
  'Mobb Beef Burger': imgMobbBeefBurger,
  'Cheat Day Burger': imgCheatDayBurger,
  'Smokey Pig Burger': imgSmokeyPigBurger,
  'Chicken Chili Cheese Burger': imgChickenChiliCheeseBurger,
  'Chicken Burger Classic': imgChickenClassicBurger,
  'Rap Beev Burger': imgRapBeevBurger,
  'Fritten': imgFries,
  'Super Cheese Fries': imgSuperCheeseFries,
  'Nutty Fries': imgNuttyFries,
  'Hood Fries': imgHoodFries,
  'Chicken Nuggets': imgChickenNuggets,
  'Triple Chocolate Cookie': imgTripleChocolate,
  'Macadamia White Chocolate Cookie': imgMacadamiaWhiteChocolate,
  'Tomato Ketchup': imgTomatoKetchup,
  'Mayonnaise': imgMayonnaise,
  'BBQ Sauce': imgBarbecuesoße,
  'Coca-Cola Zero': imgCocaColaZero,
  'Fanta': imgFanta,
  'Still Water': imgStillWater,
  'Sparkling Water': imgSparklingWater,
};

function generateGTIN(id: string): string {
  const baseNumber = parseInt(id.replace(/\D/g, '') || '0', 10);
  const randomPart = Math.floor(Math.random() * 1000000);
  const gtin = `67890${String(baseNumber).padStart(2, '0')}${String(randomPart).padStart(6, '0')}`;
  return gtin.slice(0, 13);
}

function generateQualityScore(id: string): number {
  const seed = parseInt(id.replace(/\D/g, '') || '0', 10);
  return 40 + ((seed * 17) % 61);
}

import type { Allergen } from './types';

const RX_ITEMS: { name: string; category: string; allergens?: Allergen[]; allergensDeclared?: boolean; description?: string }[] = [
  { name: 'Cheesebomb Burger', category: 'Beef Burger', allergens: ['Cereals containing gluten', 'Milk', 'Eggs', 'Sesame'], allergensDeclared: true, description: 'Double beef patty loaded with melted cheese, pickles, and our signature sauce in a brioche bun.' },
  { name: 'Chili Cheesebomb Burger', category: 'Beef Burger', allergens: ['Cereals containing gluten', 'Milk', 'Eggs', 'Sesame'], allergensDeclared: true },
  { name: 'Geto Burger', category: 'Beef Burger' },
  { name: 'Mobb Beef Burger', category: 'Beef Burger', allergens: ['Cereals containing gluten', 'Milk', 'Sesame'], allergensDeclared: true },
  { name: 'Cheat Day Burger', category: 'Beef Burger' },
  { name: 'Double Trouble Burger', category: 'Beef Burger' },
  { name: 'Smokey Pig Burger', category: 'Beef Burger', allergens: ['Cereals containing gluten', 'Milk', 'Mustard'], allergensDeclared: true },
  { name: 'Chicken Chili Cheese Burger', category: 'Chicken Burger', allergens: ['Cereals containing gluten', 'Milk', 'Eggs'], allergensDeclared: true },
  { name: 'Chicken Burger Classic', category: 'Chicken Burger' },
  { name: 'Crispy Chicken Burger', category: 'Chicken Burger' },
  { name: 'Beyond Cheeseburger', category: 'Beyond Meat Burger', allergens: ['Cereals containing gluten', 'Soy', 'Milk'], allergensDeclared: true },
  { name: 'Beyond Chili Burger', category: 'Beyond Meat Burger' },
  { name: 'Rap Beev Burger', category: 'Vegetarian Burgers' },
  { name: 'Veggie Burger Classic', category: 'Vegetarian Burgers' },
  { name: 'Fritten', category: 'Snacks', allergens: [], allergensDeclared: true, description: 'Crispy golden fries, lightly salted.' },
  { name: 'Super Cheese Fries', category: 'Snacks', allergens: ['Milk'], allergensDeclared: true },
  { name: 'Nutty Fries', category: 'Snacks', allergens: ['Nuts', 'Milk'], allergensDeclared: true },
  { name: 'Hood Fries', category: 'Snacks' },
  { name: 'Chicken Nuggets', category: 'Snacks', allergens: ['Cereals containing gluten', 'Eggs'], allergensDeclared: true },
  { name: 'Triple Chocolate Cookie', category: 'Cookies', allergens: ['Cereals containing gluten', 'Milk', 'Eggs', 'Soy'], allergensDeclared: true },
  { name: 'Macadamia White Chocolate Cookie', category: 'Cookies', allergens: ['Cereals containing gluten', 'Milk', 'Eggs', 'Nuts'], allergensDeclared: true },
  { name: 'Tomato Ketchup', category: 'Extras', allergens: [], allergensDeclared: true },
  { name: 'Mayonnaise', category: 'Extras', allergens: ['Eggs', 'Mustard'], allergensDeclared: true },
  { name: 'Vegan Mayonnaise', category: 'Extras', allergens: ['Soy'], allergensDeclared: true },
  { name: 'BBQ Sauce', category: 'Extras' },
  { name: 'Chili Sauce', category: 'Extras' },
  { name: 'Coca-Cola', category: 'Non-Alcoholic Drinks', allergens: [], allergensDeclared: true },
  { name: 'Coca-Cola Zero', category: 'Non-Alcoholic Drinks', allergens: [], allergensDeclared: true },
  { name: 'Fanta', category: 'Non-Alcoholic Drinks', allergens: [], allergensDeclared: true },
  { name: 'Sprite', category: 'Non-Alcoholic Drinks', allergens: [], allergensDeclared: true },
  { name: 'Still Water', category: 'Non-Alcoholic Drinks', allergens: [], allergensDeclared: true },
  { name: 'Sparkling Water', category: 'Non-Alcoholic Drinks', allergens: [], allergensDeclared: true },
];

/** Default price by category for RX items. */
function defaultPriceForCategory(category: string): string {
  if (category.includes('Burger')) return '€ 9.99';
  if (category === 'Snacks') return '€ 4.49';
  if (category === 'Cookies') return '€ 2.99';
  if (category === 'Extras') return '€ 0.49';
  if (category === 'Non-Alcoholic Drinks') return '€ 2.49';
  return '€ 5.99';
}

/** RX initial product list. */
export function getInitialProductsDataRX(): Product[] {
  const raw: (Omit<Product, 'gtin' | 'qualityScore'> & { gtin?: string; qualityScore?: number })[] = RX_ITEMS.map(
    (item, index) => ({
      id: `rx-${index + 1}`,
      name: item.name,
      category: item.category,
      price: defaultPriceForCategory(item.category),
      status: 'Active' as const,
      image: RX_IMAGE_BY_NAME[item.name] ?? rxPlaceholder,
      brand: 'Burgeramt Prenzlauer Berg',
      ...(item.allergens !== undefined && { allergens: item.allergens }),
      ...(item.allergensDeclared !== undefined && { allergensDeclared: item.allergensDeclared }),
      ...(item.description !== undefined && { description: item.description }),
    })
  );

  return raw.map((p) => ({
    ...p,
    gtin: p.gtin ?? generateGTIN(p.id),
    qualityScore: p.qualityScore !== undefined ? p.qualityScore : generateQualityScore(p.id),
  })) as Product[];
}

export { rxPlaceholder as productPlaceholderRX };
