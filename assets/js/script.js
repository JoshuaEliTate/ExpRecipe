// var calenderPage = document.getElementById("calenderPage")
// var recipe = document.getElementById("recipe")
// var grocerys = document.getElementById("grocerys")
// var maps = document.getElementById("maps")
// var addButton = document.getElementById("addButton")
// var mapsApi = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1JXEKT9a254rpI4wE82X8QYKPL1N5oB0&callback=initMap'
var recipeButton = document.getElementById("recipe");
var recipePage = document.getElementById("recipePage");
var groceryPage = document.getElementById("groceryPage");
var map = document.getElementById("map");

function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.608013, lng:  -122.335167 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;


//recipe page
var recipePage = document.getElementById("recipePage");
var recipeContainerEl = document.getElementById("recipeResults")
// recipePage.style.display = "none";

//function for button click
function searchButtonClickHandler() {
  console.log("clicked");
  var searchTerm = document.getElementById("searchValue").value;
  console.log(searchTerm);
  



 var url =  "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=721b4d87&app_key=0475da3604824a32e01eca985922f4e9"
 url = encodeURI(url);
 console.log(url);

  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("got the data");
      console.log(data);
      displayRecipes(data);
    });
    

}
    
    function displayRecipes(data){
        console.log(data)
        if (data.hits.length === 0) {
          recipeContainerEl.textContent = 'No recipes found.'; 
          return;
        }
      
      
        for (var i = 0; i < data.hits.length; i++) {
         
          var recipeName = data.hits[i].recipe.label;
          console.log(recipeName)
      
          var recipeEl = document.createElement('div');
          recipeEl.innerText = data.hits[i].recipe.label

          var innerRecipeEl = document.createElement('div');

            onClick(recipeEl, data.hits[i])
       
      
            var addIngredientsButton = document.createElement('button')
            addIngredientsButton.innerText = "Add Ingredients to Grocery List"


          innerRecipeEl.appendChild(recipeEl);
          innerRecipeEl.appendChild(addIngredientsButton);

          recipeContainerEl.appendChild(innerRecipeEl)
        }
      };


function onClick(element, data){
    element.addEventListener('click', function(){
        var recipeModal = document.createElement('div');
        var exitButton = document.createElement('button');
        exitButton.innerText = 'X'
        recipeModal.appendChild(exitButton)
        var titleEl = document.createElement('iframe');
          titleEl.setAttribute('src',data.recipe.url)
            titleEl.setAttribute('title',data.recipe.label)
            recipeModal.appendChild(titleEl)
            document.body.appendChild(recipeModal)

            exitButton.addEventListener('click',function(){
              recipeModal.style.display = 'none';
            })
        
    }

    )
}

  recipePage.style.display = "flex";

  // button click function
  document
    .getElementById("recipeSearchBtn")
    .addEventListener("click", function () {
    //   searchButtonClickHandler();
      console.log("clicked")
      console.log("debug recipes", displayRecipes  )
      searchButtonClickHandler();
      console.log(displayRecipes,"displaying recipes")
    });


//recipe page
var recipePage = document.getElementById("recipePage");
// recipePage.style.display = "none";

recipeButton.addEventListener('click', recipeClicker);

