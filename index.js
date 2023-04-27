// Returns the last checked radio button from an array of radio buttons
function getCheckedRadioBtn(radioBtnsArr) {
  let checkedRadioBtn;
  radioBtnsArr.forEach((btn) => {
    if (btn.checked) checkedRadioBtn = btn;
  });
  return checkedRadioBtn;
}

// Search the specified engine with the specified query
// Engine must be present in the engineData array
function search(engine, query, target = "self") {
  let engineData = [
    {
      name: "google",
      prefix: "https://www.google.com/search?q=",
    },
    {
      name: "youtube",
      prefix: "https://www.youtube.com/results?search_query=",
    },
  ];
  // Replace space char with a plus char
  let userQuery = query.split(" ").join("+");

  // Compare provided engine with known engines and change location to
  // that with the required prefix added
  engineData.forEach((eng) => {
    if (engine.toLowerCase() == eng.name)
      window.location.assign(eng.prefix + userQuery, target);
  });
}

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchEngineRadioBtns = document.querySelectorAll(
  "input[name='searchEngine']"
);
const searchEngineLabels = document.querySelectorAll(".engine__label");

// Add event listener to each search engine label to check if it is active
searchEngineRadioBtns.forEach((btn) => {
  btn.onclick = () => {
    searchEngineLabels.forEach((label) => {
      label.classList.remove("active");
      if (label.innerText == btn.value) label.classList.add("active");
    });
  };
});

// Use the values from the HTML elements to interact with the search
// function
function handleUserSearch() {
  let userEngine = getCheckedRadioBtn(searchEngineRadioBtns).value;

  search(userEngine, searchInput.value);
}

// Bind the handleUserSearch function to the search button press and
// 'Enter' key press on the input
searchInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") handleUserSearch();
});
searchBtn.onclick = handleUserSearch;
