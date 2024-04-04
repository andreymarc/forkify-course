import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';



// if (module.hot) {
//   module.hot.accept();
// }


const controlRecipes = async function () {
  try {

    resultsView.renderSpinner();

    const id = window.location.hash.slice(3);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading the recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe

    recipeView.render(model.state.recipe);

  } catch (err) {
    alert(err);
    console.log(err);
    recipeView.renderError();
  }



};

const controlSearchResults = async function () {
  try {
    // 1) Get search query 
    resultsView.renderSpinner();
    console.log(resultsView);

    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage(5));

    // 4) Render  initial pagaination buttons

    paginationView.render(model.state.search);


  } catch (err) {
    console.log(err);

  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe sercings (in state)
  model.updateServings(newServings);


  // Update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(8);


};


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandleClick(controlPagination);
  console.log('Welcome!');
};

init();