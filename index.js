const express = require("express");
const path = require("path")
const app = express();
require("dotenv").config();
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose
  .connect(process.env.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`[DATABASE]Connected to MongoDB`);
  })
  .catch((error) => {
    console.error("Erreur de la connexion à la base de données : ", error);
  });
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/songs", require("./routes/routes"));
app.listen(port, () =>
  console.log(`[SERVER] Le server écoute sur le port : ${port}`)
);
