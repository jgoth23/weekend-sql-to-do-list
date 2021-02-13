console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  //setupClickListeners();
  // load existing koalas on page load
}); // end doc ready

function setupClickListeners() {
  $(document).on('click', '.koala-transfer-button', updateTransfer);
  $('#addButton').on('click', function () {
    console.log('in addButton on click');

    // get user input and put in an object
    let taskToAdd = {
      importance: $('#importanceIn').val(),
      rank: $('#rankIn').val(),
      notes: $('#notesIn').val(),
    };

    //Reset inputs to empty:
    $('#importanceIn').val('');
    $('#rankIn').val('');
    $('#notesIn').val('');
    

    // call saveKoala with the new obejct
    //saveKoala(koalaToSend);
  });
}
