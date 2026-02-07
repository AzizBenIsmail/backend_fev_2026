const mongoose = require("mongoose");

const factureSchema = new mongoose.Schema(
  {

  },
  { timestamps: true },
);


const Facture = mongoose.model("Facture", factureSchema);
module.exports = Facture;
