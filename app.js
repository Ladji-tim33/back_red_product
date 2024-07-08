// app.js
const mongoose = require("mongoose");

const express = require("express");

const stuffRoutes = require("./route/stuff");

const userRoutes = require("./route/user");

const app = express();
app.use(express.json());

// Définir le dossier contenant les images statiques
app.use("/images", express.static("images"));

mongoose
  .connect(
    "mongodb+srv://ladjitimera:Mpintey98@cluster0.xqlz4oz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use(bodyParser.json());

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
