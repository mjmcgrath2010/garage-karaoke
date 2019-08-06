var socket = io();

var table;

$(document).ready( function () {
	table = $('#queueTable').DataTable();

	$('#queueTable').removeClass('hide');
});

socket.on('partyId', function(msg){
	console.log('party ID is: ' + msg);
});

socket.on('songAdded', function(msg) {
	table.rows.add([{
		0: msg.name,
		1: msg.title,
		2: msg.artist,
		3: msg.disk,
	}]).draw();
});

$('#addSong').click(function () {
	var title = $('#title').html(),
		artist = $('#artist').html(),
		name =  $('#name').val(),
		disk = $('#disk').html();
	socket.emit('addToQueue', { title: title, name: name, artist: artist, disk: disk });
	$('#songModal').modal('hide');
});
