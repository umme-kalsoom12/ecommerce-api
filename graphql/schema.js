const { buildSchema } = require("graphql");
const { products } = require("../data/products");

const schema = buildSchema(`
  type Product {
    id: Int
    name: String
    price: Int
    category: String
    stock: Int
  }

  type Query {
    products: [Product]
    product(id: Int!): Product
  }
`);

const root = {
  products: () => products,
  product: ({ id }) => products.find((p) => p.id === id),
};

module.exports = { schema, root };