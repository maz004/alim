$(document)
    .ready(
        function() {

            table = $('#tcrenaux')
                .DataTable({
                    ajax : {
                        url : "crenauxs/all",
                        dataSrc : ''
                    },
                    columns : [
                        {
                            data : "id"
                        },
                        {
                            data : "heureDebut"
                        },
                        {
                            data : "heureFin"
                        },
                        {
                            "render" : function() {
                                return '<button type="button" class="btn btn-danger supprimer">Supprimer</button>';
                            }
                        },
                        {
                            "render" : function() {
                                return '<button type="button" class="btn btn-secondary modifier">Modifier</button>';
                            }
                        } ]

                });

            $('#btn').click(
                function() {
                    var heureDebut = $("#heureDebut");
                    var heureFin = $("#heureFin");

                    if ($('#btn').text() == 'Ajouter') {
                        var m = {
                            heureDebut : heureDebut.val(),
                            heureFin : heureFin.val()
                        };

                        $.ajax({
                            url : 'crenauxs/save',
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
                            "./page/crenaux.html");
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
                        newLigne += '<h4 class="d-inline-flex">Voulez vous vraiment supprimer ce creneaux ? </h4>';
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
                                            url : 'crenauxs/delete/'
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
                    var heureDebut = $(this).closest('tr').find('td').eq(
                        1).text();
                    var heureFin = $(this).closest('tr').find('td').eq(
                        2).text();
                    btn.text('Modifier');
                    $("#heureDebut").val(heureDebut);
                    $("#heureFin").val(heureFin);
                    $("#id").val(id);

                    btn.click(function(e) {
                        e.preventDefault();
                        var m = {
                            id : $("#id").val(),
                            heureDebut : $("#heureDebut").val(),
                            heureFin : $("#heureFin").val()
                        };
                        if ($('#btn').text() == 'Modifier') {
                            $.ajax({
                                url : 'crenauxs/save',
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
                                "./page/crenaux.html");
                        }
                    });
                });

        });
