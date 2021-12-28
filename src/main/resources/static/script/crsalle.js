$(document)
    .ready(
        function () {

            table = $('#tcrsalle')
                .DataTable({
                    ajax: {
                        url: "crsalles/all",
                        dataSrc: ''
                    },
                    columns: [

                        {
                            data: "id"
                        },
                        {
                            data: "date"
                        },
                        {
                            data: "salle.id"
                        },
                        {
                            data: "crenaux.id"
                        },
                        {
                            "render": function () {
                                return '<button type="button" class="btn btn-outline-danger supprimer">Supprimer</button>';
                            }
                        },
                        {
                            "render": function () {
                                return '<button type="button" class="btn btn-outline-secondary modifier">Modifier</button>';
                            }
                        }]

                });

            $.ajax({
                    url: '/crenauxs/all',
                    type: 'GET',
                    success: function (data) {
                        var option = '';
                        data.forEach(e => {
                            option += '<option value =' + e.id + '>' + e.heureDebut + '->' + e.heureFin + '</option>';
                        });

                        $('#crenaux').append(option);
                    },

                    error: function (jqXHR, textStatus,
                                     errorThrown) {
                        console.log(textStatus);
                    }


                }
            );
            $.ajax({
                    url: '/salles/all',
                    type: 'GET',
                    success: function (data) {
                        var option = '';
                        data.forEach(e => {
                            option += '<option value =' + e.id + '>' + e.type + '</option>';
                        });

                        $('#salle').append(option);
                    },

                    error: function (jqXHR, textStatus,
                                     errorThrown) {
                        console.log(textStatus);
                    }


                }
            );


$('#btn').click(
    function () {
        var date = $("#date");
        var salle = $("#salle");
        var crenaux = $("#crenaux");
        if ($('#btn').text() == 'Ajouter') {
            var p = {
                date: date.val(),
                salle: {
                    id: salle.val()
                },
                crenaux: {
                    id: crenaux.val()
                }

            };

            $.ajax({
                url: 'crsalles/save',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(p),
                type: 'POST',
                async: false,
                success: function (data, textStatus,
                                   jqXHR) {
                    table.ajax.reload();
                },
                error: function (jqXHR, textStatus,
                                 errorThrown) {
                    console.log(textStatus);
                }
            });
            $("#main-content").load(
                "./page/crsalle.html");
        }
    });

$('#table-content')
    .on(
        'click',
        '.supprimer',
        function () {

            var id = $(this).closest('tr').find(
                'td').eq(0).text();
            var oldLing = $(this).closest('tr')
                .clone();
            var newLigne = '<tr style="position: relative;" class="bg-light" ><th scope="row">'
                + id
                + '</th><td colspan="4" style="height: 100%;">';
            newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer cette marque ? </h4>';
            newLigne += '<button type="button" class="btn btn-outline-primary btn-sm confirmer" style="margin-left: 25px;">Oui</button>';
            newLigne += '<button type="button" class="btn btn-outline-danger btn-sm annuler" style="margin-left: 25px;">Non</button></td></tr>';

            $(this).closest('tr').replaceWith(
                newLigne);
            $('.annuler').click(
                function () {
                    $(this).closest('tr')
                        .replaceWith(
                            oldLing);
                });
            $('.confirmer')
                .click(
                    function (e) {
                        e.preventDefault();
                        $
                            .ajax({
                                url: 'crsalles/delete/'
                                    + id,
                                data: {},
                                type: 'DELETE',
                                async: false,
                                success: function (
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
                                error: function (
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
    function () {
        var btn = $('#btn');
        var id = $(this).closest('tr').find('td').eq(0)
            .text();
        var date = $(this).closest('tr').find('td')
            .eq(1).text();
        var crenaux = $(this).closest('tr').find('td')
            .eq(3).text();
        var salle = $(this).closest('tr').find('td')
            .eq(2).text();


        btn.text('Modifier');
        $("#date").val(date);
        var op = $('#crenaux option').filter(function () {
            return $(this).html() == crenaux;
        }).val();
        $("#crenaux").val(op);
        var opp = $('#salle option').filter(function () {
            return $(this).html() == salle;
        }).val();
        $("#salle").val(opp);
        $("#id").val(id);

        btn.click(function (e) {
            e.preventDefault();
            var p = {
                id: $("#id").val(),
                date: $("#date").val(),
                crenaux: {
                    id: $("#crenaux").val()

                },
                salle: {
                    id: $("#salle").val()

                }

            };
            if ($('#btn').text() == 'Modifier') {
                $.ajax({
                    url: 'crenauxs/save',
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(p),
                    type: 'POST',
                    async: false,
                    success: function (data,
                                       textStatus, jqXHR) {
                        table.ajax.reload();
                        $("#date").val('');
                        $("#mcrenaux").val('');
                        $("#salle").val('');
                        btn.text('Ajouter');
                    },
                    error: function (jqXHR, textStatus,
                                     errorThrown) {
                        console.log(textStatus);
                    }
                });
                $("#main-content").load(
                    "./page/crenaux.html");
            }
        });
    });


})
;
