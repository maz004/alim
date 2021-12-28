$(document)
	.ready(
		function() {

			table = $('#tsalle')
				.DataTable({
					ajax : {
						url : "salles/all",
						dataSrc : ''
					},
					columns : [
						{
							data : "id"
						},
						{
							data : "code"
						},
						{
							data : "type"
						},
						{
							data : "capacite"
						},
						{
							data : "bloc.code"
						},
						{
							"render" : function() {
								return '<button type="button" class="btn btn-outline-danger supprimer">Supprimer</button>';
							}
						},
						{
							"render" : function() {
								return '<button type="button" class="btn btn-outline-secondary modifier">Modifier</button>';
							}
						} ]

				});
			$.ajax({
				url: '/blocs/all',
				type: 'GET',
				success: function (data) {
					var option = '';
					data.forEach(e => {
						option += '<option value =' + e.id + '>' + e.code + '</option>';
					});

					$('#bloc').append(option);
				},

				error: function (jqXHR, textStatus,
								 errorThrown) {
					console.log(textStatus);
				}


			}
			);

			$('#btn').click(
				function() {
					var code = $("#code");
					var type = $("#type");
					var capacite = $("#capacite");
					var bloc = $("#bloc");
					if ($('#btn').text() == 'Ajouter') {
						var p = {
							code : code.val(),
							type : type.val(),
							capacite : capacite.val(),
							bloc: {
								id: bloc.val()
							}
						};

						$.ajax({
							url : 'salles/save',
							contentType : "application/json",
							dataType : "json",
							data : JSON.stringify(p),
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
							"./page/salle.html");
					}
				});

			$('#table-content')
				.on(
					'click',
					'.supprimer',
					function() {

						var id = $(this).closest('tr').find(
							'td').eq(0).text();
						var oldLing = $(this).closest('tr')
							.clone();
						var newLigne = '<tr style="position: relative;" class="bg-light" ><th scope="row">'
							+ id
							+ '</th><td colspan="4" style="height: 100%;">';
						newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer cette salle ? </h4>';
						newLigne += '<button type="button" class="btn btn-outline-primary btn-sm confirmer" style="margin-left: 25px;">Oui</button>';
						newLigne += '<button type="button" class="btn btn-outline-danger btn-sm annuler" style="margin-left: 25px;">Non</button></td></tr>';

						$(this).closest('tr').replaceWith(
							newLigne);
						$('.annuler').click(
							function() {
								$(this).closest('tr')
									.replaceWith(
										oldLing);
							});
						$('.confirmer')
							.click(
								function(e) {
									e.preventDefault();
									$
										.ajax({
											url : 'salles/delete/'
												+ id,
											data : {},
											type : 'DELETE',
											async : false,
											success : function(
												data,
												textStatus,
												jqXHR) {
												if (data
													.includes("error") == true) {
													$(
														"#error")
														.modal();
												} else {
													table.ajax
														.reload();
												}
											},
											error : function(
												jqXHR,
												textStatus,
												errorThrown) {
												$(
													"#error")
													.modal();
											}
										});

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
					var type = $(this).closest('tr').find('td')
						.eq(2).text();
					var capacite = $(this).closest('tr').find('td').eq(
						3).text();
					var bloc = $(this).closest('tr').find('td').eq(
						4).text();
					btn.text('Modifier');
					$("#code").val(code);
					$("#type").val(type);
					$("#id").val(id);
					$("#capacite").val(capacite);
					var op = $('#bloc option').filter(function () {
						return $(this).html() == bloc;
					}).val();
					$("#bloc").val(op);
					btn.click(function(e) {
						e.preventDefault();
						var p = {
							id : $("#id").val(),
							code : $("#code").val(),
							type : $("#type").val(),
							capacite : $("#capacite").val(),
							bloc: {
								id: $("#bloc").val()

							}

						};
						if ($('#btn').text() == 'Modifier') {
							$.ajax({
								url : 'salles/save',
								contentType : "application/json",
								dataType : "json",
								data : JSON.stringify(p),
								type : 'POST',
								async : false,
								success : function(data,
												   textStatus, jqXHR) {
									table.ajax.reload();
									$("#code").val('');
									$("#type").val('');
									btn.text('Ajouter');
								},
								error : function(jqXHR, textStatus,
												 errorThrown) {
									console.log(textStatus);
								}
							});
							$("#main-content").load(
								"./page/salle.html");
						}
					});
				});


		});
