const mongoose = require('mongoose');
const carSchema = new mongoose.Schema(
  {
    marque: String, 
    modele: String,
    annee: Number,
    prix: Number,
    image: String, // Champ pour stocker le chemin de l'image
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur propriétaire de la voiture
    owners : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Référence à plusieurs utilisateurs propriétaires de la voiture    
},
    { timestamps: true },
);

const Car = mongoose.model('Car', carSchema);
module.exports = Car;