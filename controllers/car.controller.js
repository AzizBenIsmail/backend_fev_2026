const car = require("../models/car.model");
const userModel = require("../models/user.model");

module.exports.getAllCars = async (req, res) => {
  try {
    const cars = await car.find();
    if (cars.length === 0) {
      throw new Error("No cars found");
    }
    res
      .status(200)
      .json({ message: "Cars retrieved successfully", data: cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const carData = await car.findById(carId);
    if (!carData) {
      throw new Error("Car not found");
    }
    res
      .status(200)
      .json({ message: "Car retrieved successfully", data: carData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createCar = async (req, res) => {
  try {
    const { marque, modele, annee, prix } = req.body;
    const newCar = new car({ marque, modele, annee, prix });
    await newCar.save();
    res.status(201).json({ message: "Car created successfully", data: newCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const { marque, modele, annee, prix } = req.body;
    const updatedCar = await car.findByIdAndUpdate(
      carId,
      { marque, modele, annee, prix },
      { new: true },
    );
    if (!updatedCar) {
      throw new Error("Car not found");
    }
    res
      .status(200)
      .json({ message: "Car updated successfully", data: updatedCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await car.findByIdAndDelete(carId);
    if (!deletedCar) {
      throw new Error("Car not found");
    }
    res
      .status(200)
      .json({ message: "Car deleted successfully", data: deletedCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.createCarWithImage = async (req, res) => {
  try {
    const { marque, modele, annee, prix } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const newCar = new car({ marque, modele, annee, prix, image: imagePath });
    await newCar.save();
    res.status(201).json({ message: "Car created successfully", data: newCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur propriétaire de la voiture
module.exports.assignCarToUser = async (req, res) => {
  //One
  try {
    const carId = req.params.carId;
    const userId = req.params.userId;
    const carData = await car.findById(carId);
    if (!carData) {
      throw new Error("Car not found");
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      throw new Error("User not found");
    }
    const updatedCar = await car.findByIdAndUpdate(
      carId,
      { owner: userId },
      { new: true },
    );
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { mycar: carId },
      { new: true },
    );
    res
      .status(200)
      .json({ message: "Car assigned to user successfully", data: carData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//owners : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Référence à plusieurs utilisateurs propriétaires de la voiture
module.exports.assignCarToMultipleUsers = async (req, res) => {
  try {
    const carId = req.params.carId;
    const userIds = req.body.userIds;
    const carData = await car.findById(carId);
    if (!carData) {
      throw new Error("Car not found");
    }
    const updatedCar = await car.findByIdAndUpdate(
      carId,
      { owners: userIds },
      { new: true },
    );
    const updatedUsers = await userModel.updateMany(
      { _id: { $in: userIds } },
      { $push: { listOfCars: carId } },
      { new: true },
    );
    res
      .status(200)
      .json({
        message: "Car assigned to multiple users successfully",
        data: carData,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCarWithOwner = async (req, res) => {
  try {
    const carId = req.params.carId;
    const carData = await car.findById(carId).populate("owner", "name email");
    if (!carData) {
      throw new Error("Car not found");
    }
    res
      .status(200)
      .json({ message: "Car with owner retrieved successfully", data: carData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.removeCarFromUser = async (req, res) => {
  try {
    const carId = req.params.carId;
    const userId = req.params.userId;
    const carData = await car.findById(carId);
    if (!carData) {
      throw new Error("Car not found");
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      throw new Error("User not found");
    }
    const updatedCar = await car.findByIdAndUpdate(
        carId,  
        { $pull: { owners: userId }, owner: null },
        { new: true },
    );
    const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $pull: { listOfCars: carId }, mycar: null },
        { new: true },
    );
    res
        .status(200)
        .json({ message: "Car removed from user successfully", data: carData });
  }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

module.exports.rechercheCars = async (req, res) => {
  try {
    const { prix } = req.body;
    const cars = await car.find({ prix: { $lte: prix } });
    if (cars.length === 0) {
      throw new Error("No cars found with the specified price");
    }
    res
      .status(200)
      .json({ message: "Cars retrieved successfully", data: cars });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.rechercheCars = async (req, res) => {
    try {
        const { marque } = req.body;
        const cars = await car.find({ marque: marque });
        if (cars.length === 0) {
            throw new Error("No cars found with the specified brand");
        }   
        res
            .status(200)
            .json({ message: "Cars retrieved successfully", data: cars });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.rechercheCarsByYear = async (req, res) => {
    try {
        const { annee } = req.body;
        const cars = await car.find({ annee: annee });
        if (cars.length === 0) {
            throw new Error("No cars found with the specified year");
        }
        res
            .status(200)
            .json({ message: "Cars retrieved successfully", data: cars });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};