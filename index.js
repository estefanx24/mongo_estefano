const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb://admin:password@18.213.167.234:8010/BackendDB?authSource=admin"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3010, () => {
      console.log("Server is running on http://localhost:3010");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const promotionRoutes = require("./src/routes/promotion.routes");
const transactionRoutes = require("./src/routes/transaction.routes");
const boletaRoutes = require("./src/routes/boleta.routes");

app.use("/promotions", promotionRoutes);
app.use("/transactions", transactionRoutes);
app.use("/boletas", boletaRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API Transaction");
});
