//Global Variables
toDo = [];
currentHour = parseInt(moment().format('HH'));

//Display the Current Day
function loadDate() {
    currentDay = moment().format('dddd, MMMM Do YYYY');
    $('#currentDay').text(currentDay);
}

loadDate();

//Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(toDo));
};

function loadTasks() {
  //Get task items from local storage
  var savedList = localStorage.getItem('tasks');

  if (!savedList) {
      return false;
  }

  //Convert back to array
  toDo = JSON.parse(savedList);

  //Fill in the task details
  for (i = 0; i < toDo.length; i++) {
    var taskTxt = toDo[i].text;
    var taskId = toDo[i].id;
    $('#' + taskId).val(taskTxt);
  }
};

// Save Button is Clicked
$('.saveBtn').click(function() {
    //Get text from textarea
    var taskTxt = $(this).siblings('.description').val();
    //Get ID for the textarea
    var taskId = $(this).siblings('.description').attr('id');
    console.log(taskId);
    //Create object with above information
    taskObj = {
        id: taskId,
        text: taskTxt
    }
    toDo.push(taskObj);

    saveTasks();
});

//Check the current time versus the category
function auditTasks(taskEl) {
    rowHour = parseInt($('.description').parent('.row').attr('id'));

    //Remove any previous classes
    $(taskEl).removeClass('present future past');

    //Apply new class based on timeframe
    if (rowHour === currentHour) {
        console.log('present');
        $(taskEl).addClass('present');
    }
    else if (rowHour < currentHour) {
        console.log('past');
        $(taskEl).addClass('past');
    }
    else if (rowHour > currentHour) {
        console.log('future');
        $(taskEl).addClass('future');
    }
};

loadTasks();

setInterval(function() {
    $('.description').each(function (el){
      auditTasks(el);
    });
}, 5000);