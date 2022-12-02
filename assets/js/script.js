
// var calenderPage = document.getElementById("calenderPage")
// var recipe = document.getElementById("recipe")
// var grocerys = document.getElementById("grocerys")
// var maps = document.getElementById("maps")
// var addButton = document.getElementById("addButton")

//below function operates calendar functionality
function calendarOperation() {
    var mondayRef = 1;
    var sundayRef = 7;
    
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var dateRange = document.getElementById('date-range');
    var dateViews = document.getElementsByClassName('date');
    var daysOfMonth = document.getElementById('days-of-month');
    var calendarPopover = document.getElementById('calendar-popover');
    
   
    function adjustCalendar(monRef, sunRef) {
      var monday = moment().day(monRef);
      var sunday = moment().day(sunRef);
      
      if (monRef > 0) {
        for (var date = monRef; date <= sunRef; date++) {
          dateViews[(date - 1) % 7].innerHTML = moment().day(date).format('M[/]D');
        }
      } else {
        for (var date = -monRef; date >= -sunRef; date --) {
          dateViews[-(monRef + date)].innerHTML = moment().day(-date).format('M[/]D');
        }
      }
    
      if (monday.format('YYYY') !== sunday.format('YYYY')) {
        dateRange.innerHTML = `${monday.format('MMMM Do, YYYY')} - ${sunday.format('MMMM Do, YYYY')}`;
      } else {
        dateRange.innerHTML = `${monday.format('MMMM Do')} - ${sunday.format('MMMM Do, YYYY')}`;
      }
    }
    
    // Init
    adjustCalendar(mondayRef, sundayRef);
    
    next.onclick = function() {
      mondayRef += 7;
      sundayRef += 7;
      adjustCalendar(mondayRef, sundayRef);
    }
    
    prev.onclick = function() {
      mondayRef -= 7;
      sundayRef -= 7;
      adjustCalendar(mondayRef, sundayRef);
    }
  };
  calendarOperation()

