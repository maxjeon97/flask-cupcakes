"use strict";


const $cupcakeList = $('.cupcake-list');
const $cupcakeForm = $('.add-cupcake-form');
const ALL_CUPCAKES_API_ENDPOINT = '/api/cupcakes';


/**
 * Creates HTML for each cupcake instance.
 */
function generateHtmlMarkup(cupcake) {

  return $(`
  <div data-id=${cupcake.id}>
    <li class="text-primary">
      <b>Flavor:</b> ${cupcake.flavor}, <b>Size:</b> ${cupcake.size},
      <b>Rating:</b> ${cupcake.rating}
    </li>
    <img class="cupcake-img" src="${cupcake.image_url}" alt="cupcake-image">
  </div>`);
}


/**
 * Makes a request to API, grabs list of existing cupcakes
 * in database.
 */
async function getCupcakesList() {

  const response = await fetch(ALL_CUPCAKES_API_ENDPOINT);
  const data = await response.json();

  return data.cupcakes;
}


/**
 * Given a list of cupcakes, append each cupcake to the DOM.
*/
function displayCupcakes(cupcakes) {

  for (const cupcake of cupcakes) {
    const $cupcake = generateHtmlMarkup(cupcake);
    $cupcakeList.append($cupcake);
  }
}


/**
 * Retrieves data from form submission, submits post request to API, generates
 * HTML based on response data, and appends new cupcake to the DOM.
 */
async function addNewCupcake(evt) {
  evt.preventDefault();
  const flavor = $('#flavor').val();
  const size = $('#size').val();
  const rating = $('#rating').val();
  const imgURL = $('#image-url').val();

  const response = await fetch(ALL_CUPCAKES_API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      "flavor": flavor,
      "size": size,
      "rating": rating,
      "image_url": imgURL
    }),
    headers: {
      "content-type": "application/json",
    }
  });

  const data = await response.json();

  const $cupcake = generateHtmlMarkup(data.cupcake);
  $cupcakeList.append($cupcake);
  $cupcakeForm.trigger("reset");
}

$cupcakeForm.on('submit', addNewCupcake);


/**
 * Handles deletion of a cupcake on image click
 */
async function deleteCupcake(evt) {

  const $evtTarget = $(evt.target);
  const $cupcake = $evtTarget.closest('div');
  const cupcakeId = $cupcake.data('id');

  await fetch(`${ALL_CUPCAKES_API_ENDPOINT}/${cupcakeId}`, {
    method: 'DELETE'
  });

  $cupcake.remove();
}

$cupcakeList.on('click', '.cupcake-img', deleteCupcake);


/**
 * On homepage load, calls functions that retrieve all cupcakes and display
 * them on the page
 */
async function start() {
  const cupcakes = await getCupcakesList();
  displayCupcakes(cupcakes);
}

start();








