console.log('js');

$(document).ready(function () {
  console.log('JQ');
  $('#deleteButton').on('click', deleteInputs);
  $('#completeButton').on('click', completedInputs);
  //$('#addTaskButton').on('click', getTasks);
  //getTasks();
}); // end doc ready

function completedInputs() {
  console.log('completed task');
}

function deleteInputs() {
  console.log('delete tasks');
  $('#todoIn').val(''), $('#importanceIn').val('');
  $('#rankIn').val('');
  $('#notesIn').val('');
  $('#completed').val('');
}


//function setupClickListeners() {
  //$(document).on('click', '.koala-transfer-button', updateTransfer);
  //$('#addButton').on('click', function () {
    console.log('in addButton on click');

    // get user input and put in an object
    function taskToAdd() {
      let tasks = {
      todo: $('#todoIn').val(),
      importance: $('#importanceIn').val(),
      rank: $('#rankIn').val(),
      notes: $('#notesIn').val(),
    };

    //Reset inputs to empty:
    $('#todoIn').val(), $('#importanceIn').val('');
    $('#rankIn').val('');
    $('#notesIn').val('');
   
    saveTask(taskToSend);
  }

function getTasks() {
  console.log('in getTasks');
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/weekend_to_do_app',
  })
    .then(function (tasksArray) {
      let tasksOnDom = $('#viewTasks');

      tasksOnDom.empty();

      console.log('getTasks GET response:', tasksArray);

      for (let tasks of tasksArray) {
        let addTaskButton = `<button class="addTaskButton" data-id="${tasks.id}" data-status="${tasks.getTasks}">
        Toggle ready to transfer</button>`;

        tasksOnDom.append(`
          <tr class="tasks-row>
          <td data-info="${tasks.todo}">${tasks.todo}</td>
          <td data-info="$${tasks.importance}">${tasks.importance}</td>
          <td data-info="$${tasks.rank}">${tasks.rank}</td>
          <td data-info="$${tasks.notes}">${tasks.notes}</td>
          <td data-info="$${tasks.completed}">${tasks.completed}</td>
            <td>${addTaskButton}</td>
          </tr>
        `);
      }
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
} // end getKoalas

function saveTask(newTask) {
  console.log('in saveTasks', newTask);

  //let task_to_add = newTask;

  // ajax call to server to post koalas:
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newTask,
  })
    .then(function (response) {
      console.log('saveTasks POST response:', response);
      getKoalas();
    })
    .catch(function (err) {
      console.log('error posting task:', err);
    });
}

function createTask() {
  console.log('new');
  let thisKoalaId = $(this).data('id');
  let thisKoalaStatus = $(this).data('status');
  $.ajax({
    method: 'PUT',
    url: `/tasks/${thisTasksId}`,
    data: {
      thisKoalaStatus,
    },
  })
    .then((response) => {
      console.log('Successful transfer!');
      getKoalas();
    })
    .catch((error) => {
      alert('Error with transfer', error);
    });
}
