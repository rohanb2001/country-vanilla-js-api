const searchButton = document.querySelector(".btn");
const form = document.querySelector("form");
const contentWrapper = document.querySelector(".content-wrapper");

// State Management
let countryName;

// Functions
function submitForm(e) {
  e.preventDefault();
  getCountryDetails();
}

async function getCountryDetails() {
  try {
    let countryURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    let response = await fetch(countryURL);
    let data = await response.json();
    showUI(data);
  } catch (error) {
    console.log("Coundn't  found searched country!...");
    contentWrapper.innerHTML = `<h3>Oops no result found!!!😶 Enter valid country name...</h3>`;
  }
}

function showUI(data) {
  let str = `
    <div class="image-title">
          <img src="${data[0].flags.svg}" />
          <h2 class="title">${data[0].name.common}</h2>
        </div>
        <div class="content">
          <div class="data-wrapper">
            <h4>Capital :</h4>
            <span>${data[0].capital[0]}</span>
          </div>
          <div class="data-wrapper">
            <h4>Continent :</h4>
            <span>${data[0].continents[0]}</span>
          </div>
          <div class="data-wrapper">
            <h4>Population :</h4>
            <span>${data[0].population}</span>
          </div>
          <div class="data-wrapper">
            <h4>Currency :</h4>
            <span>${
              data[0].currencies[Object.keys(data[0].currencies)].name
            } - ${Object.keys(data[0].currencies)[0]}</span>
          </div>
          <div class="data-wrapper">
            <h4>Common Languages :</h4>
            <span>${Object.values(data[0].languages)
              .toString()
              .split(",")
              .join(", ")}</span>
          </div>
        </div>
    `;

  contentWrapper.innerHTML = str;
}

function getFormValues(e) {
  countryName = e.target.value;
}

// EventListeners
form.addEventListener("submit", submitForm);
form.addEventListener("change", getFormValues);
