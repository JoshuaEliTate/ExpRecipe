// var calenderPage = document.getElementById("calenderPage")
// var recipe = document.getElementById("recipe")
// var grocerys = document.getElementById("grocerys")
// var maps = document.getElementById("maps")
// var addButton = document.getElementById("addButton")
// var mapsApi = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA1JXEKT9a254rpI4wE82X8QYKPL1N5oB0&callback=initMap'

function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
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
//below function operates calendar functionality
function calendarOperation() {
  var mondayRef = 1;
  var sundayRef = 7;

  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var dateRange = document.getElementById("date-range");
  var dateViews = document.getElementsByClassName("date");
  var daysOfMonth = document.getElementById("days-of-month");
  var calendarPopover = document.getElementById("calendar-popover");

  function adjustCalendar(monRef, sunRef) {
    var monday = moment().day(monRef);
    var sunday = moment().day(sunRef);

    if (monRef > 0) {
      for (var date = monRef; date <= sunRef; date++) {
        dateViews[(date - 1) % 7].innerHTML = moment()
          .day(date)
          .format("M[/]D");
      }
    } else {
      for (var date = -monRef; date >= -sunRef; date--) {
        dateViews[-(monRef + date)].innerHTML = moment()
          .day(-date)
          .format("M[/]D");
      }
    }

    if (monday.format("YYYY") !== sunday.format("YYYY")) {
      dateRange.innerHTML = `${monday.format(
        "MMMM Do, YYYY"
      )} - ${sunday.format("MMMM Do, YYYY")}`;
    } else {
      dateRange.innerHTML = `${monday.format("MMMM Do")} - ${sunday.format(
        "MMMM Do, YYYY"
      )}`;
    }
  }

  // Init
  adjustCalendar(mondayRef, sundayRef);

  next.onclick = function () {
    mondayRef += 7;
    sundayRef += 7;
    adjustCalendar(mondayRef, sundayRef);
  };

  prev.onclick = function () {
    mondayRef -= 7;
    sundayRef -= 7;
    adjustCalendar(mondayRef, sundayRef);
  };
}
calendarOperation();

//recipe page
var recipePage = document.getElementById("recipePage");
// recipePage.style.display = "none";

//function for button click
function searchButtonClickHandler() {
  console.log("clicked");
  var searchTerm = document.getElementById("searchValue").value;
  console.log(searchTerm);

// if searchTerm.includes(" "){
//     searchTerm.value.replace(" ", "%20")
// }
 var url =  "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=721b4d87&app_key=0475da3604824a32e01eca985922f4e9"
 url = encodeURI(url);
 console.log(url);
  //fetch api and run functions for large weather card and five days
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("got the data");
      console.log(data);
    });
}
  
  recipePage.style.display = "flex";

  // button click function
  document
    .getElementById("recipeSearchBtn")
    .addEventListener("click", function () {
    //   searchButtonClickHandler();
      console.log("clicked")
      searchButtonClickHandler();
    });

