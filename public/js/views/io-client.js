var socket = io();
socket.emit('addToQueue','hello');

socket.on('partyId', function(msg){
	console.log('party ID is: ' + msg);
});
