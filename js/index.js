// Define a base URL for the PokeAPI
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Define the front image;
const frontImg = document.getElementById("front-img");

// Get the search input and search button elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultContainer = document.getElementById("result-container");

// Define a function that fetches the image URL and creates an img tag for a given Pokemon
function fetchPokemon(pokemon) {
  // Use the fetch API to get the image URL
  fetch(baseUrl + pokemon) // Concatenate the base URL and the Pokemon name
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      // Get the image URL from the data object
      const imageUrl = data.sprites.front_default;
      // Set the src attribute to the image URL
      frontImg.src = imageUrl;
      // Set the alt attribute to the Pokemon name
      frontImg.alt = pokemon;

      // Pokemon name
        const name = document.createElement("h2");
        name.innerText = data.name;
        
      // Append the img element to the result container
      resultContainer.innerHTML = '';
      resultContainer.appendChild(name);
      resultContainer.appendChild(frontImg);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  const userInput = searchInput.value.trim();
  if (userInput !== "") {
    fetchPokemon(userInput);
  }
});

// Add an event listener to the search input for pressing Enter key
searchInput.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    const userInput = searchInput.value.trim();
    if (userInput !== "") {
      fetchPokemon(userInput);
    }
  }
});