"use strict";


const $cupcakeList = $('.cupcake-list');
const $cupcakeForm = $('.add-cupcake-form');
const CUPCAKE_API = '/api/cupcakes';



/**
 * Creates HTML for each cupcake instance.
 */
function generateHtmlMarkup(cupcake) {

  return $(`
  <div>
    <li>
      Flavor: ${cupcake.flavor}, Size: ${cupcake.size}, Rating: ${cupcake.rating}
    </li>
    <br>
    <img src="${cupcake.image_url}" alt="cupcake-image">
  </div>`);
}


/**
 * Makes a request to API, grabs list of existing cupcakes
 * in database.
 */
async function getCupcakesList() {

  const response = await fetch(CUPCAKE_API);
  const data = await response.json();

  return data.cupcakes;
}

/**
 * Given a list of cupcakes, append each cupcake to the DOM.
*/
function displayCupcakes(cupcakes) {

  for (const cupcake of cupcakes) {
    const $cupcakeHTML = generateHtmlMarkup(cupcake);
    $cupcakeList.append($cupcakeHTML);
  }

}

async function addCupcake(event) {



}


$('add-cupcake-form').on('submit', addCupcake);








