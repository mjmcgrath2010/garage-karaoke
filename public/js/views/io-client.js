var socket = io();


socket.on('partyId', function(msg){
	console.log('party ID is: ' + msg);
});


$('#addSong').click(function(){
	var title = $('#title').html(),
		artist = $('#artist').html(),
		name =  $('#name').val();
	socket.emit('addToQueue', { title: title, name: name, artist: artist });
	$('#songModal').modal('hide');
});
