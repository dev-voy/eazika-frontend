// Import new icons directly from the react-icons library
import { GiFruitBowl, GiTomato, GiMushroomGills, GiBreadSlice, GiWheat, GiCupcake } from "react-icons/gi";
// CORRECTED: Replaced GiEgg with LuEgg
import { LuMilk, LuEgg } from "react-icons/lu";

// A more detailed list of all categories using the new icons
export const allCategories = [
  { name: 'Fruits', slug: 'fruits', count: 5, icon: GiFruitBowl },
  { name: 'Vegetables', slug: 'vegetables', count: 4, icon: GiTomato },
  { name: 'Dairy', slug: 'dairy', count: 2, icon: LuMilk },
  { name: 'Bakery', slug: 'bakery', count: 2, icon: GiBreadSlice },
  { name: 'Grains', slug: 'grains', count: 1, icon: GiWheat },
  // CORRECTED: Using LuEgg for Proteins
  { name: 'Proteins', slug: 'proteins', count: 2, icon: LuEgg },
  { name: 'Mushrooms', slug: 'mushrooms', count: 1, icon: GiMushroomGills },
  { name: 'Sweets', slug: 'sweets', count: 1, icon: GiCupcake },
];

// This is now our main product database. Each product has a category slug.
export const products = [
  // Fruits
  { id: 1, name: 'Avocado', price: '$6.70', image: '/assests/images/Avocado.jpeg', liked: true, category: 'fruits' },
  { id: 2, name: 'Grapes', price: '$7.20', image: '/assests/images/Grapes.jpeg', liked: false, category: 'fruits' },
  { id: 3, name: 'Orange', price: '$4.90', image: '/assests/images/Orange.jpeg', liked: false, category: 'fruits' },
  { id: 4, name: 'Banana', price: '$3.50', image: '/assests/images/Banana.jpeg', liked: false, category: 'fruits' },
  { id: 5, name: 'Blueberry', price: '$8.70', image: '/assests/images/Blueberry.jpeg', liked: false, category: 'fruits' },
  
  // Vegetables
  { id: 6, name: 'Broccoli', price: '$8.70', image: '/assests/images/Broccoli.jpeg', liked: false, category: 'vegetables' },
  { id: 7, name: 'Tomatoes', price: '$4.90', image: '/assests/images/Tomatoes.jpeg', liked: false, category: 'vegetables' },
  { id: 8, name: 'Cucumber', price: '$2.30', image: '/assests/images/Cucumber.jpeg', liked: false, category: 'vegetables' },
  { id: 9, name: 'Bell Pepper', price: '$3.10', image: '/assests/images/Bell Pepper.jpeg', liked: false, category: 'vegetables' },
  
  // Dairy
  { id: 10, name: 'Milk', price: '$5.50', image: '/assests/images/Milk.jpeg', liked: false, category: 'dairy' },
  { id: 11, name: 'Cheese', price: '$12.00', image: '/assests/images/Cheese.jpeg', liked: false, category: 'dairy' },
  
  // Bakery
  { id: 12, name: 'Bread Loaf', price: '$6.20', image: '/assests/images/Bread Loaf.jpeg', liked: false, category: 'bakery' },
  { id: 13, name: 'Croissant', price: '$3.80', image: '/assests/images/Croissant.jpeg', liked: false, category: 'bakery' },
];

export const trendingDeals = products.slice(0, 4);
export const categories = allCategories.slice(0, 4);

