console.log('js');

$(document).ready(function () {
  console.log('JQ');
  $('#addTaskButton').on('click', addTask)
  // Establish Click Listeners
  //setupClickListeners();
  // load existing koalas on page load
}); // end doc ready

// function addTask() {
//   console.log('Adding new task');
//   $('#taskToDo').on('click', taskToAdd);
// }

function setupClickListeners() {
  //$(document).on('click', '.koala-transfer-button', updateTransfer);
  $('#addButton').on('click', function () {
    console.log('in addButton on click');

    // get user input and put in an object
    let taskToAdd = {
      todo: $('#todoIn').val(),
      importance: $('#importanceIn').val(),
      rank: $('#rankIn').val(),
      notes: $('#notesIn').val(),
    };

    //Reset inputs to empty:
    $('#todoIn').val(),
    $('#importanceIn').val('');
    $('#rankIn').val('');
    $('#notesIn').val('');
    // call saveKoala with the new obejct
    saveTask(taskToSend);  });
}
function getTasks() {
  console.log('in getTasks');
  // ajax call to server to get tasks
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then(function (tasksArray) {
      let tasksOnDom = $('#viewTasks');

      tasksOnDom.empty();

      console.log('getTasks GET response:', tasksArray);

      for (let tasks of tasksArray) {
        let addTaskButton = `<button class="addTaskButton" data-id="${task.id}" data-status="${task.getTasks}">
        Toggle ready to transfer</button>`;

        tasksOnDom.append(`
          <tr>
            <td>${tasks.todo}</td>
            <td>${tasks.importance}</td>
            <td>${tasks.rank}</td>
            <td>${tasks.notes}</td>
            <td>${addTaskButton}</td>
          </tr>
        `);
      }
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);

  let task_to_add = newTask;

  // ajax call to server to post koalas:
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: task_to_add,
  })
    .then(function (response) {
      console.log('saveKoala POST response:', response);
      getKoalas();
    })
    .catch(function (err) {
      console.log('error posting koala:', err);
    });
}

function newTask() {
  console.log('new');
  let thisKoalaId = $(this).data('id');
  let thisKoalaStatus = $(this).data('status');
  $.ajax({
    method: 'PUT',
    url: `/koalas/${thisKoalaId}`,
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

