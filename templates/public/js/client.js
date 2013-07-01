/* Author: YOUR NAME HERE
 */

$(document).ready(function() {

  var socket = io.connect();

  $('#sender').bind('click', function() {
    socket.emit('message', $("#chat").val() + "\n");
    $("#chat").val("");
  });

  socket.on('server_message', function(data){
    $('#receiver').append(data);
  });
});