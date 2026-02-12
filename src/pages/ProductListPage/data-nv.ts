/**
 * NV (New Verticals / METRO Supermarkets) product data and images.
 * Images from src/images/NV. Fallback: src/images/img_placeholder.png.
 */
import type { Product } from './types';

import productPlaceholder from '../../images/img_placeholder.png';

// NV product images
import AppleImg from '../../images/NV/Apple.jpg';
import ApplesImg from '../../images/NV/apples.jpg';
import BananasImg from '../../images/NV/bananas.jpg';
import StrawberriesImg from '../../images/NV/Strawberries.jpg';
import OrangesImg from '../../images/NV/Oranges.jpg';
import MangoImg from '../../images/NV/Mango.jpg';
import WatermelonImg from '../../images/NV/Watermelon.jpg';
import PineappleImg from '../../images/NV/Pineapple.jpg';
import KiwiImg from '../../images/NV/Kiwi.jpg';
import PearsImg from '../../images/NV/Pears.jpg';
import CherriesImg from '../../images/NV/Cherries.jpg';
import PeachesImg from '../../images/NV/Peaches.jpg';
import PlumsImg from '../../images/NV/Plums.jpg';
import LemonsImg from '../../images/NV/Lemons.jpg';
import LimesImg from '../../images/NV/Limes.jpg';
import BlackberriesImg from '../../images/NV/Blackberries.jpg';
import AvocadoImg from '../../images/NV/Avocado.jpg';
import PapayaImg from '../../images/NV/Papaya.jpg';
import DragonFruitImg from '../../images/NV/Dragon Fruit.jpg';
import SalmonImg from '../../images/NV/Salmon.jpg';
import SeabassImg from '../../images/NV/Seabass.jpg';
import SquidImg from '../../images/NV/Squid.jpg';
import PrawnsImg from '../../images/NV/Prawns.jpg';
import CodFilletsImg from '../../images/NV/Cod Fillets.jpg';
import TunaSteaksImg from '../../images/NV/Tuna Steaks.jpg';
import MusselsLiveImg from '../../images/NV/Mussels Live.jpg';
import SeaBreamImg from '../../images/NV/Sea Bream.jpg';
import OctopusImg from '../../images/NV/Octopus.jpg';
import LobsterImg from '../../images/NV/Lobster.jpg';
import ScallopsImg from '../../images/NV/Scallops.jpg';
import MackerelImg from '../../images/NV/Mackerel.jpg';
import CrabMeatImg from '../../images/NV/Crab Meat.jpg';
import DoveShowerHydrateImg from '../../images/NV/Dove Shower Hydrate.jpg';
import NeutrogenaHydroBoostImg from '../../images/NV/Neutrogena Hydro Boost.jpg';
import CeraVeFoamingCleanserImg from '../../images/NV/CeraVe Foaming Cleanser.jpg';
import NiveaSoftCreamImg from '../../images/NV/Nivea Soft Cream.jpg';
import GarnierMicellarWaterImg from '../../images/NV/Garnier Micellar Water.jpg';
import TheOrdinaryHyaluronicImg from '../../images/NV/The Ordinary Hyaluronic.jpg';
import BiodermaSensibioH2OImg from '../../images/NV/Bioderma Sensibio H2O.jpg';
import SimpleSkinImg from '../../images/NV/Simple Skin.jpg';
import MoisturizerImg from '../../images/NV/Moisturizer.jpg';
import SushiBoxImg from '../../images/NV/Sushi Box.jpg';
import LasagnaBologneseImg from '../../images/NV/Lasagna Bolognese.jpg';
import GreekSaladImg from '../../images/NV/Greek Salad.jpg';
import ChickenTikkaMasalaImg from '../../images/NV/Chicken Tikka Masala.jpg';
import BeefStirFryRiceImg from '../../images/NV/Beef Stir Fry with Rice.jpg';
import PastaCarbonaraImg from '../../images/NV/Pasta Carbonara.jpg';
import ThaiGreenCurryImg from '../../images/NV/Thai Green Curry.jpg';
import ChickenSandwichImg from '../../images/NV/Chicken Sandwich.jpg';
import QuinoaBowlImg from '../../images/NV/Quinoa Bowl .jpg';
import PadThaiNoodlesImg from '../../images/NV/Pad Thai Noodles.jpg';
import ChickenWrapImg from '../../images/NV/Chicken Wrap.jpg';
import SamosasImg from '../../images/NV/Samosas.jpg';
import MacAndCheeseImg from '../../images/NV/Mac & Cheese.jpg';
import ChickenTeriyakiRiceImg from '../../images/NV/Chicken Teriyaki Rice.jpg';
import FishAndChipsImg from '../../images/NV/Fish & Chips.jpg';
import FalafelWrapImg from '../../images/NV/Falafel Wrap.jpg';
import BeefTacosImg from '../../images/NV/Beef Tacos.jpg';
import CapreseSaladImg from '../../images/NV/Caprese Salad.jpg';

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

/** NV initial product list. */
export function getInitialProductsDataNV(): Product[] {
  const raw: (Omit<Product, 'gtin' | 'qualityScore'> & { gtin?: string; qualityScore?: number })[] = [
    { id: '1', name: 'Apples Pink Lady 1000g', category: 'Fresh Fruits', price: '$ 4.99', status: 'Active', image: AppleImg, brand: 'Fresh Market', gtin: generateGTIN('1'), qualityScore: generateQualityScore('1') },
    { id: '2', name: 'Apples Galant Imported 1000g', category: 'Fresh Fruits', price: '$ 5.49', status: 'Active', image: ApplesImg, brand: 'Fresh Market', gtin: generateGTIN('2'), qualityScore: generateQualityScore('2') },
    { id: '3', name: 'Bananas From Cyprus 1000g', category: 'Fresh Fruits', price: '$ 2.99', status: 'Inactive', image: BananasImg, brand: 'Fresh Market', gtin: generateGTIN('3'), qualityScore: generateQualityScore('3') },
    { id: '4', name: 'Grapes Thompson Seedless 500g', category: 'Fresh Fruits', price: '$ 6.99', status: 'Active', image: productPlaceholder, brand: 'Fresh Market', gtin: generateGTIN('4'), qualityScore: generateQualityScore('4') },
    { id: '5', name: 'Strawberries Fresh 250g', category: 'Fresh Fruits', price: '$ 4.49', status: 'Inactive', image: StrawberriesImg, brand: 'Fresh Market', gtin: generateGTIN('5'), qualityScore: generateQualityScore('5') },
    { id: '6', name: 'Oranges Valencia 1000g', category: 'Fresh Fruits', price: '$ 3.99', status: 'Active', image: OrangesImg, brand: 'Fresh Market', gtin: generateGTIN('6'), qualityScore: generateQualityScore('6') },
    { id: '7', name: 'Blueberries Premium 125g', category: 'Fresh Fruits', price: '$ 5.99', status: 'Active', image: productPlaceholder, brand: 'Fresh Market', gtin: generateGTIN('7'), qualityScore: generateQualityScore('7') },
    { id: '8', name: 'Mango Fresh Each', category: 'Fresh Fruits', price: '$ 2.49', status: 'Active', image: MangoImg, brand: 'Fresh Market', gtin: generateGTIN('8'), qualityScore: generateQualityScore('8') },
    { id: '9', name: 'Watermelon Seedless Kg', category: 'Fresh Fruits', price: '$ 1.99', status: 'Active', image: WatermelonImg, brand: 'Fresh Market', gtin: generateGTIN('9'), qualityScore: generateQualityScore('9') },
    { id: '10', name: 'Pineapple Golden Each', category: 'Fresh Fruits', price: '$ 3.49', status: 'Active', image: PineappleImg, brand: 'Fresh Market', gtin: generateGTIN('10'), qualityScore: generateQualityScore('10') },
    { id: '11', name: 'Kiwi Green 500g', category: 'Fresh Fruits', price: '$ 4.99', status: 'Active', image: KiwiImg, brand: 'Fresh Market', gtin: generateGTIN('11'), qualityScore: generateQualityScore('11') },
    { id: '12', name: 'Pears Conference 750g', category: 'Fresh Fruits', price: '$ 4.29', status: 'Active', image: PearsImg, brand: 'Fresh Market', gtin: generateGTIN('12'), qualityScore: generateQualityScore('12') },
    { id: '13', name: 'Cherries Fresh 500g', category: 'Fresh Fruits', price: '$ 8.99', status: 'Active', image: CherriesImg, brand: 'Fresh Market', gtin: generateGTIN('13'), qualityScore: generateQualityScore('13') },
    { id: '14', name: 'Peaches Yellow 1000g', category: 'Fresh Fruits', price: '$ 5.49', status: 'Active', image: PeachesImg, brand: 'Fresh Market', gtin: generateGTIN('14'), qualityScore: generateQualityScore('14') },
    { id: '15', name: 'Plums Red 500g', category: 'Fresh Fruits', price: '$ 3.99', status: 'Active', image: PlumsImg, brand: 'Fresh Market', gtin: generateGTIN('15'), qualityScore: generateQualityScore('15') },
    { id: '16', name: 'Atlantic Salmon Steaks 750g', category: 'Fresh Fish & Seafood', price: '$ 18.99', status: 'Active', image: SalmonImg, brand: 'Ocean Fresh' },
    { id: '17', name: 'European Seabass (400-600g)', category: 'Fresh Fish & Seafood', price: '$ 12.99', status: 'Active', image: SeabassImg, brand: 'Ocean Fresh' },
    { id: '18', name: 'European Squid 500g', category: 'Fresh Fish & Seafood', price: '$ 9.99', status: 'Inactive', image: SquidImg, brand: 'Ocean Fresh' },
    { id: '19', name: 'King Prawns Raw 500g', category: 'Fresh Fish & Seafood', price: '$ 16.99', status: 'Active', image: PrawnsImg, brand: 'Ocean Fresh' },
    { id: '20', name: 'Cod Fillets Fresh 600g', category: 'Fresh Fish & Seafood', price: '$ 14.99', status: 'Inactive', image: CodFilletsImg, brand: 'Ocean Fresh' },
    { id: '21', name: 'Tuna Steaks Fresh 500g', category: 'Fresh Fish & Seafood', price: '$ 22.99', status: 'Active', image: TunaSteaksImg, brand: 'Ocean Fresh' },
    { id: '22', name: 'Mussels Live 1000g', category: 'Fresh Fish & Seafood', price: '$ 7.99', status: 'Active', image: MusselsLiveImg, brand: 'Ocean Fresh' },
    { id: '23', name: 'Sea Bream Whole 500g', category: 'Fresh Fish & Seafood', price: '$ 11.99', status: 'Active', image: SeaBreamImg, brand: 'Ocean Fresh' },
    { id: '24', name: 'Octopus Cleaned 800g', category: 'Fresh Fish & Seafood', price: '$ 19.99', status: 'Active', image: OctopusImg, brand: 'Ocean Fresh' },
    { id: '25', name: 'Lobster Live Each', category: 'Fresh Fish & Seafood', price: '$ 34.99', status: 'Active', image: LobsterImg, brand: 'Ocean Fresh' },
    { id: '26', name: 'Scallops Fresh 300g', category: 'Fresh Fish & Seafood', price: '$ 24.99', status: 'Active', image: ScallopsImg, brand: 'Ocean Fresh' },
    { id: '27', name: 'Mackerel Fresh 600g', category: 'Fresh Fish & Seafood', price: '$ 8.99', status: 'Active', image: MackerelImg, brand: 'Ocean Fresh' },
    { id: '28', name: 'Dove Shower Hydrate 720ml', category: 'Facial Care', price: '$ 6.99', status: 'Active', image: DoveShowerHydrateImg, brand: 'Dove' },
    { id: '29', name: 'Dove Shower Deep Nour 600ml', category: 'Facial Care', price: '$ 6.49', status: 'Active', image: DoveShowerHydrateImg, brand: 'Dove' },
    { id: '30', name: 'Neutrogena Hydro Boost 200ml', category: 'Facial Care', price: '$ 9.99', status: 'Active', image: NeutrogenaHydroBoostImg, brand: 'Neutrogena' },
    { id: '31', name: 'CeraVe Foaming Cleanser 236ml', category: 'Facial Care', price: '$ 12.99', status: 'Active', image: CeraVeFoamingCleanserImg, brand: 'CeraVe' },
    { id: '32', name: 'Nivea Soft Cream 300ml', category: 'Facial Care', price: '$ 5.99', status: 'Active', image: NiveaSoftCreamImg, brand: 'Nivea' },
    { id: '33', name: 'Garnier Micellar Water 400ml', category: 'Facial Care', price: '$ 7.49', status: 'Active', image: GarnierMicellarWaterImg, brand: 'Garnier' },
    { id: '34', name: 'LOreal Revitalift Night 50ml', category: 'Facial Care', price: '$ 14.99', status: 'Active', image: productPlaceholder, brand: "L'Oreal" },
    { id: '35', name: 'Olay Regenerist Serum 50ml', category: 'Facial Care', price: '$ 24.99', status: 'Active', image: productPlaceholder, brand: 'Olay' },
    { id: '36', name: 'The Ordinary Hyaluronic 30ml', category: 'Facial Care', price: '$ 6.80', status: 'Active', image: TheOrdinaryHyaluronicImg, brand: 'The Ordinary' },
    { id: '37', name: 'Cetaphil Cleanser 500ml', category: 'Facial Care', price: '$ 11.99', status: 'Active', image: productPlaceholder, brand: 'Cetaphil' },
    { id: '38', name: 'Bioderma Sensibio H2O 500ml', category: 'Facial Care', price: '$ 15.99', status: 'Active', image: BiodermaSensibioH2OImg, brand: 'Bioderma' },
    { id: '39', name: 'La Roche Toleriane 200ml', category: 'Facial Care', price: '$ 16.99', status: 'Active', image: productPlaceholder, brand: 'La Roche-Posay' },
    { id: '40', name: 'Fruit & Go Mango 220g', category: 'Ready Made Meals', price: '$ 3.99', status: 'Active', image: productPlaceholder, brand: 'Deli Kitchen' },
    { id: '41', name: 'Caesar Salad Chicken 350g', category: 'Ready Made Meals', price: '$ 6.99', status: 'Active', image: productPlaceholder, brand: 'Deli Kitchen' },
    { id: '42', name: 'Sushi Box Mix 8 Pieces', category: 'Ready Made Meals', price: '$ 9.99', status: 'Active', image: SushiBoxImg, brand: 'Deli Kitchen' },
    { id: '43', name: 'Lasagna Bolognese 400g', category: 'Ready Made Meals', price: '$ 5.99', status: 'Active', image: LasagnaBologneseImg, brand: 'Deli Kitchen' },
    { id: '44', name: 'Greek Salad Fresh 300g', category: 'Ready Made Meals', price: '$ 4.99', status: 'Active', image: GreekSaladImg, brand: 'Deli Kitchen' },
    { id: '45', name: 'Chicken Tikka Masala 450g', category: 'Ready Made Meals', price: '$ 7.99', status: 'Active', image: ChickenTikkaMasalaImg, brand: 'Deli Kitchen' },
    { id: '46', name: 'Beef Stir Fry with Rice 500g', category: 'Ready Made Meals', price: '$ 8.99', status: 'Active', image: BeefStirFryRiceImg, brand: 'Deli Kitchen' },
    { id: '47', name: 'Pasta Carbonara 350g', category: 'Ready Made Meals', price: '$ 6.49', status: 'Active', image: PastaCarbonaraImg, brand: 'Deli Kitchen' },
    { id: '48', name: 'Vegetable Spring Rolls 6pcs', category: 'Ready Made Meals', price: '$ 4.49', status: 'Active', image: productPlaceholder, brand: 'Deli Kitchen' },
    { id: '49', name: 'Thai Green Curry 400g', category: 'Ready Made Meals', price: '$ 7.49', status: 'Active', image: ThaiGreenCurryImg, brand: 'Deli Kitchen' },
    { id: '50', name: 'Margherita Pizza Fresh 300g', category: 'Ready Made Meals', price: '$ 5.49', status: 'Active', image: productPlaceholder, brand: 'Deli Kitchen' },
    { id: '51', name: 'Chicken Sandwich Deluxe', category: 'Ready Made Meals', price: '$ 4.99', status: 'Active', image: ChickenSandwichImg, brand: 'Deli Kitchen' },
    { id: '52', name: 'Quinoa Buddha Bowl 380g', category: 'Ready Made Meals', price: '$ 8.49', status: 'Active', image: QuinoaBowlImg, brand: 'Deli Kitchen' },
    { id: '53', name: 'Salmon Poke Bowl 420g', category: 'Ready Made Meals', price: '$ 11.99', status: 'Active', image: productPlaceholder, brand: 'Deli Kitchen' },
    { id: '54', name: 'Lemons Fresh 500g', category: 'Fresh Fruits', price: '$ 2.99', status: 'Active', image: LemonsImg, brand: 'Fresh Market' },
    { id: '55', name: 'Limes Fresh 400g', category: 'Fresh Fruits', price: '$ 2.49', status: 'Active', image: LimesImg, brand: 'Fresh Market' },
    { id: '56', name: 'Raspberries Fresh 170g', category: 'Fresh Fruits', price: '$ 5.49', status: 'Active', image: productPlaceholder, brand: 'Fresh Market' },
    { id: '57', name: 'Blackberries Fresh 150g', category: 'Fresh Fruits', price: '$ 5.99', status: 'Active', image: BlackberriesImg, brand: 'Fresh Market' },
    { id: '58', name: 'Avocado Ready to Eat Each', category: 'Fresh Fruits', price: '$ 1.99', status: 'Active', image: AvocadoImg, brand: 'Fresh Market' },
    { id: '59', name: 'Papaya Fresh Each', category: 'Fresh Fruits', price: '$ 3.99', status: 'Active', image: PapayaImg, brand: 'Fresh Market' },
    { id: '60', name: 'Dragon Fruit Each', category: 'Fresh Fruits', price: '$ 4.49', status: 'Active', image: DragonFruitImg, brand: 'Fresh Market' },
    { id: '61', name: 'Clams Fresh 500g', category: 'Fresh Fish & Seafood', price: '$ 9.99', status: 'Active', image: productPlaceholder, brand: 'Ocean Fresh' },
    { id: '62', name: 'Crab Meat Fresh 200g', category: 'Fresh Fish & Seafood', price: '$ 14.99', status: 'Active', image: CrabMeatImg, brand: 'Ocean Fresh' },
    { id: '63', name: 'Halibut Fillets 500g', category: 'Fresh Fish & Seafood', price: '$ 19.99', status: 'Active', image: productPlaceholder, brand: 'Ocean Fresh' },
    { id: '64', name: 'Simple Skin Toner 200ml', category: 'Facial Care', price: '$ 6.99', status: 'Active', image: SimpleSkinImg, brand: 'Simple' },
    { id: '65', name: 'Eucerin Hydration Cream 250ml', category: 'Facial Care', price: '$ 13.99', status: 'Active', image: productPlaceholder, brand: 'Eucerin' },
    { id: '66', name: 'Aveeno Moisturizer 300ml', category: 'Facial Care', price: '$ 10.99', status: 'Active', image: MoisturizerImg, brand: 'Aveeno' },
    { id: '67', name: 'Burrito Bowl Chicken 450g', category: 'Ready Made Meals', price: '$ 8.99', status: 'Active', image: productPlaceholder, brand: 'Deli Kitchen' },
    { id: '68', name: 'Pad Thai Noodles 380g', category: 'Ready Made Meals', price: '$ 7.99', status: 'Active', image: PadThaiNoodlesImg, brand: 'Deli Kitchen' },
    { id: '69', name: 'Chicken Wrap Mediterranean', category: 'Ready Made Meals', price: '$ 5.49', status: 'Active', image: ChickenWrapImg, brand: 'Deli Kitchen' },
    { id: '70', name: 'Vegetable Samosas 4pcs', category: 'Ready Made Meals', price: '$ 3.99', status: 'Active', image: SamosasImg, brand: 'Deli Kitchen' },
    { id: '71', name: 'Mac & Cheese Classic 350g', category: 'Ready Made Meals', price: '$ 4.99', status: 'Active', image: MacAndCheeseImg, brand: 'Deli Kitchen' },
    { id: '72', name: 'Chicken Teriyaki Rice 480g', category: 'Ready Made Meals', price: '$ 8.49', status: 'Active', image: ChickenTeriyakiRiceImg, brand: 'Deli Kitchen' },
    { id: '73', name: 'Fish & Chips 500g', category: 'Ready Made Meals', price: '$ 9.99', status: 'Active', image: FishAndChipsImg, brand: 'Deli Kitchen' },
    { id: '74', name: 'Falafel Wrap Vegan', category: 'Ready Made Meals', price: '$ 5.99', status: 'Active', image: FalafelWrapImg, brand: 'Deli Kitchen' },
    { id: '75', name: 'Beef Tacos 3pcs', category: 'Ready Made Meals', price: '$ 7.49', status: 'Active', image: BeefTacosImg, brand: 'Deli Kitchen' },
    { id: '76', name: 'Caprese Salad 280g', category: 'Ready Made Meals', price: '$ 5.99', status: 'Active', image: CapreseSaladImg, brand: 'Deli Kitchen' },
    { id: '77', name: 'Shrimp Fried Rice 420g', category: 'Ready Made Meals', price: '$ 9.49', status: 'Active', image: productPlaceholder, brand: 'Deli Kitchen' },
  ];

  return raw.map((p) => ({
    ...p,
    gtin: p.gtin ?? generateGTIN(p.id),
    qualityScore: p.qualityScore !== undefined ? p.qualityScore : generateQualityScore(p.id),
  })) as Product[];
}

export { productPlaceholder as productPlaceholderNV };
