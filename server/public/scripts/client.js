console.log('js');

$(document).ready(function () {
  console.log('JQ');
  $(document).on('click', '#deleteBtn', deleteTaskHandler);
  $(document).on('click', '#completedBtn', completionUpdate);
  $('#addTaskButton').on('click', function() {
    let tasks = {
      todo: $('#todoIn').val(),
      importance: $('#importanceIn').val(),
      rank: $('#rankIn').val(),
      notes: $('#notesIn').val(),
    };
    saveTask(tasks);
    deleteInputs();
})
  getTasks();
  
}); // end doc ready

function completedInputs() {
  console.log('completed task');
}

function deleteInputs() {
  console.log('delete tasks');
  $('#todoIn').val(''); 
  $('#importanceIn').val('');
  $('#rankIn').val('');
  $('#notesIn').val('');
  $('#completed').val('');
}



    console.log('in addButton on click');

 

function getTasks() {
  console.log('in getTasks');
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/weekendToDo',
  })
    .then(function (tasksArray) {
      let tasksOnDom = $('#viewTasks');

      tasksOnDom.empty();

      console.log('getTasks GET response:', tasksArray);



      for (let tasks of tasksArray) {
        let completedBtn = `<button id="completedBtn" 
        data-id="${tasks.id}" data-status="${tasks.completed}">
        Completed</button>`;

        let deleteBtn = `<button id="deleteBtn" 
        data-id="${tasks.id}">
        Delete</button>`;

      

        tasksOnDom.append(`
          <tr class="tasks-row">
          <td data-info="${tasks.todo}">${tasks.todo}</td>
          <td data-info="${tasks.importance}">${tasks.importance}</td>
          <td data-info="${tasks.rank}">${tasks.rank}</td>
          <td data-info="${tasks.notes}">${tasks.notes}</td>
          <td data-info="${tasks.completed}">${tasks.completed}</td>
          <td>${completedBtn}</td>
          <td>${deleteBtn}</td>

          </tr>
        `);
      }
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
} // end getTasks

function yellowBtn() {
  console.log('yellow');
  $(this).css('background-color', 'green');
  console.log($(this).parent());
}
function completionUpdate() {
  console.log('complete update');
  let thisTaskId = $(this).data('id');
  let thisTaskStatus = $(this).data('status');
  console.log('this task status', thisTaskStatus);
  console.log('this task id', thisTaskId);
  $.ajax({
    method: 'PUT',
    url: `/weekendToDo/${thisTaskId}`,
    data: {
      thisTaskStatus,
    },
  })
    .then((response) => {
      console.log('Successful!');
      getTasks();
    })
    .catch((error) => {
      alert('Error in completion', error);
    });
    yellowBtn();
}
function deleteTaskHandler() {
  // call AJAX to DELETE tasks;
  deleteTask($(this).data("id"))
}
function deleteTask(taskId) {
  
  $.ajax({
    method: 'DELETE',
    url: `/weekendToDo/${taskId}`,
    
  })
    .then(function (response) {
      getTasks();
    })
    .catch(function (banana) {
      alert('error', banana);
    });
}

function saveTask(newTask) {
  console.log('in saveTasks', newTask);

  let task_to_add = newTask;
  console.log(task_to_add);

  // ajax call to server to post tasks:
  $.ajax({
    method: 'POST',
    url: '/weekendToDo',
    data: task_to_add,
  })
    .then(function (response) {
      console.log('saveTasks POST response:', response);
      getTasks();
    })
    .catch(function (err) {
      console.log('error posting task:', err);
    });
}


