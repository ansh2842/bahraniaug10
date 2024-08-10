const mongoose = require('mongoose');

module.exports = async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://bharanifoods21:m253LULyi682HLRG@bharanicluster.1hr4yvh.mongodb.net/?retryWrites=true&w=majority&appName=bharanicluster",)
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; 
}
}