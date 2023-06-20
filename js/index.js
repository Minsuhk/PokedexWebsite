// Define a pokemon URL for the PokeAPI
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

// Define the image;
const nfrontImg = document.getElementById("nfront-img");
const nbackImg = document.getElementById("nback-img")
const sfrontImg = document.getElementById("sfront-img")
const sbackImg = document.getElementById("sback-img")
// Get the search input and search button elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultContainer = document.getElementById("result-container");

// Define a function that fetches the image URL and creates an img tag for a given Pokemon
function fetchPokemon(pokemon) {
  // Use the fetch API to get the image URL
  fetch(pokemonURL + pokemon) // Concatenate the pokemon URL and the Pokemon name
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      // Get the image URL from the data object
      const imageUrl1 = data.sprites.front_default;
      const imageUrl2 = data.sprites.back_default;
      const imageUrl3 = data.sprites.front_shiny;
      const imageUrl4 = data.sprites.back_shiny;
      // Set the src attribute to the image URL
      nfrontImg.src = imageUrl1;
      nbackImg.src = imageUrl2;
      sfrontImg.src = imageUrl3;
      sbackImg.src = imageUrl4;
      // Set the alt attribute to the Pokemon name
      nfrontImg.alt = "normal front";
      nbackImg.alt = "normal back";
      sfrontImg.alt = "shiny front";
      sbackImg.alt = "shiny back";
      // Pokemon name
      const name = document.createElement("h2");
      name.innerText = data.name;
      
      // Append the img element to the result container
      resultContainer.innerHTML = '';
      resultContainer.appendChild(name);
      // resultContainer.appendChild(nfrontImg);

    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}
// Add an event listener to the search input for pressing Enter key
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const userInput = searchInput.value.trim();
    if (userInput !== "") {
      searchButton.click();
      fetchPokemon(userInput);
    }
  }
});
// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  const userInput = searchInput.value.trim();
  if (userInput !== "") {
    fetchPokemon(userInput);
  }
});

//Button Carousel
document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel__item");
  const buttonsHtml = Array.from(items, () => {
    return `<span class="carousel__button"></span>`;
  });

  carousel.insertAdjacentHTML(
    "beforeend",
    `
		<div class="carousel__nav">
			${buttonsHtml.join("")}
		</div>
	`
  );

  const buttons = carousel.querySelectorAll(".carousel__button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      // un-select all the items
      items.forEach((item) =>
        item.classList.remove("carousel__item--selected")
      );
      buttons.forEach((button) =>
        button.classList.remove("carousel__button--selected")
      );

      items[i].classList.add("carousel__item--selected");
      button.classList.add("carousel__button--selected");
    });
  });

  // Select the first item on page load
  items[0].classList.add("carousel__item--selected");
  buttons[0].classList.add("carousel__button--selected");
});

//Keep the search conditions lowercase to prevent any capitalization issues
function convertToLowercase(input) {
  input.value = input.value.toLowerCase();
}

//Keep hidden until search
// function toggleDisplay() {
//   const elements = document.getElementsByClassName('carousel');

//   for (let i = 0; i < elements.length; i++) {
//     const element = elements[i];
//     if (element.style.display === 'flex') {
//       element.style.display = 'none'; // Change to the desired display value
//     } else {
//       element.style.display = 'flex'; // Change to the desired display value
//     }
//   }
// }
// function toggleDisplay(){
//   const myElement = document.getElementsByClassName('carousel');

//   if (!myElement.classList.contains('visible')) {
//     myElement.classList.add('visible');
//     myElement.classList.remove('hidden');

//     // Perform any additional action here after the first click
//     console.log('Display property changed!');
//   } 
// }
let clickCount = 0;

// Create a function to change the button's display property.
function toggleDisplay() {
  // Only change the display property if the click count is 0.
  if (clickCount === 0) {
    document.querySelector(".carousel").style.display = "flex";
  }

  // Increment the click count.
  clickCount++;
}
