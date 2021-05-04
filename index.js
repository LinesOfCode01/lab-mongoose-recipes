const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

//const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
// const MONGODB_URI =
//   "mongodb+srv://franciscoLabs:321123@cluster0.ivf5f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_URI =
  "mongodb+srv://franciscoLabs:321123@cluster0.ivf5f.mongodb.net/IronHackLabs?authSource=admin&replicaSet=atlas-ag4p2h-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "broccoli cheese soup",
      level: "Easy Peasy",
      ingredients: ["broccoli", "cheese", "salt", "pepper"],
      cuisine: "American",
      dishType: "soup",
      duration: 5,
    });
  })

  // .then(res => console.log(res));

  .then(() => {
    return Recipe.insertMany(data).then((res) => console.log(res));
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then(() => {
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
