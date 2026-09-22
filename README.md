# E-Commerce RESTful API + GraphQL

## Setup
1. Clone the repo
2. Run `npm install`
3. Run `npm start` (or `node server.js`)
4. Server runs at http://localhost:5000

## REST Endpoints
- GET    /api/v1/products
- GET    /api/v1/products/:id
- POST   /api/v1/products
- PUT    /api/v1/products/:id
- DELETE /api/v1/products/:id
- Field selector: GET /api/v1/products?fields=name,price

## GraphQL
- Endpoint: /graphql (GraphiQL UI enabled for testing)
- Example query:
\`\`\`
{ products { name price } }
\`\`\`