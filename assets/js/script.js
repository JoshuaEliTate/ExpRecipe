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
    

    
    
    function displayRecipes(data){
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
        //   var titleEl = document.createElement('iframe');
        //   titleEl.setAttribute('src',data.hits[i].recipe.uri)
        // titleEl.setAttribute('title',data.hits[i].recipe.label)
      
        //   recipeEl.appendChild(titleEl);
      
            var addIngredientsButton = document.createElement('button')
            addIngredientsButton.innerText = "Add Ingredients to Grocery List"


          innerRecipeEl.appendChild(recipeEl);
          innerRecipeEl.appendChild(addIngredientsButton);

          recipeContainerEl.appendChild(innerRecipeEl)
        }
      };

   
      displayRecipes();
}

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
      searchButtonClickHandler();
      displayRecipes();
    });

