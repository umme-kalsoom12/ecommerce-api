# E-Commerce API — Enterprise RESTful API & GraphQL (CSC337 Lab 03)

A local Node.js/Express API for a product catalog that demonstrates enterprise-grade REST API design: clean noun-based routing, proper HTTP verbs, idempotent operations, a standardized JSON error schema, and a GraphQL endpoint that solves REST's classic over-fetching problem.

## 🚀 Setup & Run

git clone <this-repo-url>
cd ecommerce-api
npm install
npm start

Server runs at http://localhost:5000

- REST base: http://localhost:5000/api/v1
- GraphQL endpoint: http://localhost:5000/graphql
- GraphQL playground (browser UI, via GraphiQL): http://localhost:5000/graphql

Optional dev mode with auto-reload:
npm run dev

## 📦 Module 1 — RESTful Resource Modeling

All endpoints are noun-based (/products, not /getProducts); the HTTP verb defines the action.

| Method | Endpoint                 | Description                  |
|--------|---------------------------|-------------------------------|
| GET    | /api/v1/products        | List all products             |
| GET    | /api/v1/products/:id    | Get single product             |
| POST   | /api/v1/products        | Create product → 201 Created |
| PUT    | /api/v1/products/:id    | Idempotent full update         |
| DELETE | /api/v1/products/:id    | Delete product                 |

### Idempotency

- GET, PUT, DELETE are idempotent — repeating the same request produces the same end state, with no extra side effects.
- POST is intentionally not idempotent — each call creates a new product with a new ID.

curl -X PUT http://localhost:5000/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse Pro", "price": 1800}'

## ⚠️ Module 2 — Consistent Error Schema

Every error, from every part of the app, follows the same JSON shape:

{
  "success": false,
  "error": {
    "code": 404,
    "message": "Product with id 999 not found",
    "path": "/api/v1/products/999",
    "timestamp": "2026-09-22T10:15:30Z"
  }
}

| Status | When                                              |
|--------|----------------------------------------------------|
| 201    | Resource created successfully                       |
| 400    | Client sent invalid/missing data (validation error) |
| 404    | Resource does not exist                              |
| 500    | Genuine unexpected server error                      |

## 🎯 Module 3 — Solving Over-Fetching

Option A — Field selector (REST):
GET /api/v1/products?fields=name,price

Returns only the requested fields instead of the full product object.

Option B — GraphQL:
{
  products {
    name
    price
  }
}

curl -X POST http://localhost:5000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ products { name price } }"}'

Visit http://localhost:5000/graphql in a browser for an interactive query builder (GraphiQL).

## 🗂 Project Structure

ecommerce-api/
├── server.js                  # App entry point
├── data/
│   └── products.js            # In-memory data store
├── routes/
│   └── products.js            # Module 1: CRUD routes
├── middleware/
│   └── errorHandler.js        # Module 2: centralized error handling
├── graphql/
│   └── schema.js               # Module 3: GraphQL schema/resolvers
└── README.md

## 🧪 Testing

Tested manually via Postman for:
- Correct status codes (200/201/400/404)
- Idempotent PUT and DELETE (same input → same end state)
- Field-selector and GraphQL both returning reduced payloads
- Standardized error format across all failure cases

## 🛠 Tech Stack

Node.js, Express, GraphQL (express-graphql, graphql), CORS, in-memory data store (no external DB required for this lab).

