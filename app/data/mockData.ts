import { 
    Cookie, 
    CupSoda, 
    ShoppingBasket, 
    Smile, 
    Home, 
    Sparkles, 
} from "lucide-react";

// A more detailed list of all categories using the new, consistent icon set
export const allCategories = [
  { name: 'Snacks', slug: 'snacks', count: 4, icon: Cookie },
  { name: 'Beverages', slug: 'beverages', count: 4, icon: CupSoda },
  { name: 'Grocery', slug: 'grocery', count: 4, icon: ShoppingBasket },
  { name: 'Personal Care', slug: 'personal-care', count: 4, icon: Smile },
  { name: 'Household', slug: 'household', count: 4, icon: Home },
  { name: 'Beauty & Wellness', slug: 'beauty-wellness', count: 3, icon: Sparkles },
];

// This is now our main product database. Each product has a category slug.
export const products = [
  // Packaged Snacks
  { id: 1, name: 'Lays Potato Chips', price: '$3.50', image: '/assests/images/chips.jpeg', liked: false, category: 'snacks' },
  { id: 2, name: 'Oreo Biscuits', price: '$4.20', image: '/assests/images/oreo.jpeg', liked: false, category: 'snacks' },
  { id: 3, name: 'Cadbury Dairy Milk', price: '$2.80', image: '/assests/images/chocolate.jpeg', liked: true, category: 'snacks' },
  { id: 4, name: 'Kurkure Masala Munch', price: '$2.50', image: '/assests/images/kurkure.jpeg', liked: false, category: 'snacks' },

  // Beverages
  { id: 5, name: 'Coca-Cola Can', price: '$1.50', image: '/assests/images/coke.jpeg', liked: false, category: 'beverages' },
  { id: 6, name: 'Tropicana Orange Juice', price: '$3.80', image: '/assests/images/juice.jpeg', liked: false, category: 'beverages' },
  { id: 7, name: 'Red Bull Energy Drink', price: '$4.00', image: '/assests/images/redbull.jpeg', liked: false, category: 'beverages' },
  { id: 8, name: 'Lipton Green Tea', price: '$5.50', image: '/assests/images/tea.jpeg', liked: false, category: 'beverages' },

  // Packaged Grocery
  { id: 9, name: 'Aashirvaad Atta', price: '$8.00', image: '/assests/images/atta.jpeg', liked: false, category: 'grocery' },
  { id: 10, name: 'Daawat Basmati Rice', price: '$12.50', image: '/assests/images/rice.jpeg', liked: false, category: 'grocery' },
  { id: 11, name: 'Tata Toor Dal', price: '$6.20', image: '/assests/images/dal.jpeg', liked: false, category: 'grocery' },
  { id: 12, name: 'Fortune Sunflower Oil', price: '$9.80', image: '/assests/images/oil.jpeg', liked: false, category: 'grocery' },

  // Personal Care
  { id: 13, name: 'Head & Shoulders Shampoo', price: '$7.50', image: '/assests/images/shampoo.jpeg', liked: false, category: 'personal-care' },
  { id: 14, name: 'Dove Soap Bar', price: '$2.20', image: '/assests/images/soap.jpeg', liked: false, category: 'personal-care' },
  { id: 15, name: 'Nivea Body Cream', price: '$6.80', image: '/assests/images/cream.jpeg', liked: false, category: 'personal-care' },
  { id: 16, name: 'Axe Deodorant', price: '$5.90', image: '/assests/images/deo.jpeg', liked: false, category: 'personal-care' },

];


// Trending Deals for the homepage can now be a subset of our main products list
export const trendingDeals = products.slice(0, 4);

// This can be used for the small category list on the homepage
export const categories = allCategories.slice(0, 4);

