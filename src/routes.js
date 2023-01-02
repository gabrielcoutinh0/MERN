const express = require("express");
const routes = express.Router();
const User = require("./controllers/users.controllers");
const Product = require("./controllers/products.controllers");

//routes.get("/", User.index);

// USER ROUTE
routes.post("/api/users", User.create);
routes.get("/api/users", User.index);
routes.get("/api/users/:_id", User.details);
routes.delete("/api/users/:_id", User.delete);
routes.put("/api/users/", User.update);

//PRODUCT ROUTE
routes.post("/api/products", Product.create);
routes.get("/api/products", Product.index);
routes.get("/api/products/:_id", Product.details);
routes.delete("/api/products/:_id", Product.delete);
routes.put("/api/products/", Product.update);

module.exports = routes;
