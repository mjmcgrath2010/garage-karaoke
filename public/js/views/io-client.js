var socket = io();
socket.emit('addToQueue','hello');

socket.on('addToQueue', function(msg){
	console.log('message  from server: ' + msg);
});
