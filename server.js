const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const productRoutes = require("./routes/products");
const { errorHandler } = require("./middleware/errorHandler");
const { schema, root } = require("./graphql/schema");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// REST routes
app.use("/api/v1/products", productRoutes);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // browser me test karne ke liye UI milega
  })
);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: { code: 404, message: "Route not found" } });
});

// Global error handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});