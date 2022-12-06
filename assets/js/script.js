// var calenderPage = document.getElementById("calenderPage")
// var recipe = document.getElementById("recipe")
// var grocerys = document.getElementById("grocerys")
// var maps = document.getElementById("maps")
// var addButton = document.getElementById("addButton")

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

