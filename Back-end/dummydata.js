const Chance = require('chance');
const chance = new Chance();

const categories = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty"
];

const generateProduct = () => {
  const isInStock = chance.bool();
  const selectedCategory = chance.pickone(categories);
  const productName = chance.word();

  return {
    id: chance.integer({ min: 1, max: 1000 }),
    productName: productName,
    category: selectedCategory,
    price: chance.floating({ min: 10, max: 100, fixed: 2 }),
    discountPrice: chance.floating({ min: 5, max: 50, fixed: 2 }),
    description: chance.sentence(),
    stockStatus: isInStock ? 'In Stock' : 'Out of Stock',
    mainImage: generateImageURL(selectedCategory, productName),
    subImages: Array.from({ length: 4 }, () => generateImageURL(selectedCategory, productName)),
  };
};

const generateImageURL = (category, productName) => {
  if (category === "Woman’s Fashion") {
    return `https://example.com/womens-fashion-image.jpg`;
  } else if (category === "Electronics" && productName.toLowerCase().includes('iphone')) {
    return `https://example.com/iphone-main-image.jpg`;
  } else {
    return `https://example.com/${encodeURIComponent(category.toLowerCase())}-image.jpg`;
  }
};

// Generate an array of 500 products
const products = Array.from({ length: 100 }, generateProduct);

console.log(JSON.stringify(products, null, 2));
