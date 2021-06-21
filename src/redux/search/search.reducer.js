const initialState = {
  recipe: {
    uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6",
    label: "Chicken Vesuvio",
    image: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg",
    source: "Serious Eats",
    url: "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
    shareAs:
      "http://www.edamam.com/recipe/chicken-vesuvio-b79327d05b8e5b838ad6cfd9576b30b6/chicken",
    yield: 4.0,
    description:
      "A meal is an eating occasion that takes place at a certain time and includes prepared food",
    categories: ["Dairy-Free", "Gluten-Free", "Kosher"],
    cautions: ["Sulfites"],
    ingredients: [
      "1/2 cup olive oil",
      "5 cloves garlic, peeled",
      "2 large russet potatoes, peeled and cut into chunks",
      "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
      "3/4 cup white wine",
      "3/4 cup chicken stock",
      "3 tablespoons chopped parsley",
      "1 tablespoon dried oregano",
      "Salt and pepper",
      "1 cup frozen peas, thawed",
    ],
    difficulty: "5/5",
    calories: 4228.043058200812,
    time: 60.0,
    cuisineType: ["italian"],
    mealType: ["lunch/dinner"],
    dishType: ["main course"],
    directions: [
      "Heat an oven to 325°F. In a roasting pan (or a large (14-inch) oven-proof skillet), heat the olive oil over medium until shimmering. Add the potatoes and garlic and cook until golden brown, about 12 minutes. Remove to a plate, leaving behind as much oil as possible.",
      "Add the chicken to the skillet, skin-side down. Cook until golden and crisp, then turn and cook the other side until golden as well. Add the wine and cook until it reduces by half.",
      "Return the garlic and potatoes to the pan, along with the chicken stock, parsley, oregano, and a pinch of salt and pepper. Transfer to the oven and cook, uncovered, until the chicken is cooked through, about 45 minutes. Add the peas to the pan with 5 minutes left in the cooking time. Serve with the roasting juices in the pan.",
    ],
  },
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_SEARCH":
      console.log("ON SEARCH!");
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default searchReducer;
