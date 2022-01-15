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
                            data: "date",

                        },
                        {
                            data: "salle.id"
                        },
                        {
                            data: "salle.type"
                        },
                        {
                            data: "crenaux.id"
                        },
                        {
                            data: "crenaux.shTime"
                        },
                        {
                            data: "status"
                        },
                        {
                            "render": function () {
                                return '<button type="button" class="btn btn-danger supprimer">Supprimer</button>';
                            }
                        },

                        {
                            "render": function () {
                                return '<button type="button" class="btn btn-secondary valider">Valider</button>';
                            }



                        },
                        {
                            "render": function () {
                                return '<button type="button" class="btn btn-secondary rejetter">Rejetter</button>';
                            }
                        }]

                });

            $.ajax({
                    url: '/crenauxs/all',
                    type: 'GET',
                    success: function (data) {
                        var option = '';
                        data.forEach(e => {
                            option += '<option value =' + e.id + '>' + e.shTime +  '</option>';
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
                        var crenaux = $(this).closest('tr').find('td')
                            .eq(3).text();
                        var salle = $(this).closest('tr').find('td')
                            .eq(1).text();
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
                                            url: 'crsalles/deletee/{salle,crenaux}?creneaux='+ crenaux + '&salle=' + salle
                                            ,
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
                '.valider',
                function (e) {
                    var crenaux = $(this).closest('tr').find('td')
                        .eq(3).text();
                    var salle = $(this).closest('tr').find('td')
                        .eq(1).text();
                    e.preventDefault();
                    $
                        .ajax({
                            url: 'crsalles/findme/{salle,crenaux}?creneaux='+ crenaux + '&salle=' + salle
                            ,
                            data: {},
                            type: 'POST',
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
            $('#table-content').on(
                'click',
                '.rejetter',
                function (e) {
                    var crenaux = $(this).closest('tr').find('td')
                        .eq(3).text();
                    var salle = $(this).closest('tr').find('td')
                        .eq(1).text();
                    e.preventDefault();
                    $
                        .ajax({
                            url: 'crsalles/reject/{salle,crenaux}?creneaux='+ crenaux + '&salle=' + salle
                            ,
                            data: {},
                            type: 'POST',
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


        })
;
