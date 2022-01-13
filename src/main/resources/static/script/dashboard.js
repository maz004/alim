$(document)
	.ready(
		function() {

			table = $('#tdashboard')
				.DataTable({
					ajax : {
						url : "salles/all",
						dataSrc : ''
					},
					columns : [

						{
							data : "type"
						},

						{
							"render" : function() {
								return '<button type="button" class="btn btn-success supprimer">Liste des Reservation pour la salle</button>';
							}
						}
						 ]

				});

			$('#btn').click(
				function() {
					var code = $("#code");

					if ($('#btn').text() == 'Ajouter') {
						var m = {
							code : code.val()
						};

						$.ajax({
							url : 'blocs/save',
							contentType : "application/json",
							dataType : "json",
							data : JSON.stringify(m),
							type : 'POST',
							async : false,
							success : function(data, textStatus,
											   jqXHR) {
								table.ajax.reload();
							},
							error : function(jqXHR, textStatus,
											 errorThrown) {
								console.log(textStatus);
							}
						});
						$("#main-content").load(
							"./page/bloc.html");
					}
				});

			$('#table-content')
				.on(
					'click',
					'.supprimer',
					function() {
						var salle = $(this).closest('tr').find('td')
							.eq(0).text();

						$.ajax({
							type: "POST",
							url: "crsalles/dash/{salle}?salle=" + salle,
							dataType: "text",
							success : function(data) {
								alert(data);

							}
						});




						});






			$('#table-content').on(
				'click',
				'.modifier',
				function() {
					var btn = $('#btn');
					var id = $(this).closest('tr').find('td').eq(0)
						.text();
					;
					var code = $(this).closest('tr').find('td').eq(
						1).text();
					btn.text('Modifier');
					$("#code").val(code);
					$("#id").val(id);

					btn.click(function(e) {
						e.preventDefault();
						var m = {
							id : $("#id").val(),
							code : $("#code").val()
						};
						if ($('#btn').text() == 'Modifier') {
							$.ajax({
								url : 'blocs/save',
								contentType : "application/json",
								dataType : "json",
								data : JSON.stringify(m),
								type : 'POST',
								async : false,
								success : function(data,
												   textStatus, jqXHR) {
									table.ajax.reload();

									btn.text('Ajouter');
								},
								error : function(jqXHR, textStatus,
												 errorThrown) {
									console.log(textStatus);
								}
							});
							$("#main-content").load(
								"./page/bloc.html");
						}
					});
				});

		});
