let products = [
  { id: 1, name: "Wireless Mouse", price: 1200, category: "Electronics", stock: 50 },
  { id: 2, name: "Bluetooth Speaker", price: 3500, category: "Electronics", stock: 30 },
  { id: 3, name: "Cotton T-Shirt", price: 800, category: "Clothing", stock: 100 },
];

let nextId = 4;

module.exports = { products, getNextId: () => nextId++ };