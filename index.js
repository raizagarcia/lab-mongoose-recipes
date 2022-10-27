const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  "title": "Chocolate Cake",
    "level": "Easy Peasy",
    "ingredients": [
      "all-purpose flour",
      "sugar",
      "unsweetened cocoa powder",
      "baking powder",
      "baking soda",
      "salt",
      "espresso powder",
      "milk",
      "oil",
      "eggs",
      "vanilla extract",
      'boiling water',
    ],
    "cuisine": "International",
    "dishType": "dessert",
    "image": "https://addapinch.com/wp-content/uploads/2013/01/chocolate-cake-DSC_1788.jpg",
    "duration": 45,
    "creator": "Robyn Stone"
}
//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made

    //await Recipe.create(data[1]);
    await Recipe.create(newRecipe);

    const allRecipe = await Recipe.insertMany(data);
    allRecipe.forEach((recipe)=> {
      console.log(recipe.title)
    })
    
    const updateRecipe = await Recipe.findOneAndUpdate({
      title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true},
      )

      await Recipe.deleteOne({title: "Carrot Cake"})
      console.log('Carrot Cake was removed');
    
      dbConnection.disconnect();

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

 /*mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
