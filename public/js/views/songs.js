$(document).ready( function () {
	var table = $('#songTable').DataTable();

	$('#songTable').removeClass('hide');

	$('#songTable tbody').on('click', 'tr', function () {
		var data = table.row( this ).data();
		$('#title').html(data[0]);
		$('#artist').html(data[1]);
		$('#disk').html(data[2]);
		$('#songModal').modal('show');
	});
});
