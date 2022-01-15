$(document).ready(function () {


// # ===============================
// # = Nombre des produits
// # ===============================
    $.ajax({
        url: 'produits/count',
        data: '',
        type: 'GET',
        success: function (data) {
            $('#produit').html(data);
        },
        error: function (jqXHR, textStatus,
                         errorThrown) {
            console.log(textStatus);
        }
    });

    // # ===============================
// # = Nombre des blocs
// # ===============================
    $.ajax({
        url: 'crenauxs/count',
        data: '',
        type: 'GET',
        success: function (data) {
            $('#crenaux').html(data);
        },
        error: function (jqXHR, textStatus,
                         errorThrown) {
            console.log(textStatus);
        }
    });

    // # ===============================
// # = Nombre des Machines
// # ===============================
    $.ajax({
        url: 'machines/count',
        data: '',
        type: 'GET',
        success: function (data) {
            $('#machine').html(data);
        },
        error: function (jqXHR, textStatus,
                         errorThrown) {
            console.log(textStatus);
        }
    });
    $.ajax({
        url: 'crsalles/count',
        data: '',
        type: 'GET',
        success: function (data) {
            $('#reservation').html(data);
        },
        error: function (jqXHR, textStatus,
                         errorThrown) {
            console.log(textStatus);
        }
    });
    $.ajax({
        url: 'salles/count',
        data: '',
        type: 'GET',
        success: function (data) {
            $('#salle').html(data);
        },
        error: function (jqXHR, textStatus,
                         errorThrown) {
            console.log(textStatus);
        }
    });


// # ===============================
// # = Nombre des machines par marque
// # ===============================
    $.ajax({
        url: 'marques/count',
        contentType: "application/json",
        dataType: "json",
        data: '',
        type: 'GET',
        async: false,
        success: function (data, textStatus,
                           jqXHR) {
            console.log(data);
            var labels = new Array();
            var dt = new Array();
            Object.keys(data).forEach(key => {
                labels.push(key); // returns the keys in an object
                dt.push(data[key]);  // returns the appropriate value
            });

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dt,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Nombre des machines par marque',
                        fontSize: 21,
                        padding: 20,
                        fontFamily: 'Calibri',
                    },
                    legend: {
                        display: false
                    },
                    type: 'line',
                    scales: {

                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Nombre des machines'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Marques'
                            }
                        }],
                    }
                }
            });
        },
        error: function (jqXHR, textStatus,
                         errorThrown) {
            console.log(textStatus);
        }
    });
    //Nombre de salles par bloc
    $.ajax({
        url: 'blocs/count',
        contentType: "application/json",
        dataType: "json",
        data: '',
        type: 'GET',
        async: false,
        success: function (data, textStatus,
                           jqXHR) {
            console.log(data);
            var labels = new Array();
            var dt = new Array();
            Object.keys(data).forEach(key => {
                labels.push(key); // returns the keys in an object
                dt.push(data[key]);  // returns the appropriate value
            });

            var ctx = document.getElementById('chart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dt,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Nombre de salles par bloc',
                        fontSize: 21,
                        padding: 20,
                        fontFamily: 'Calibri',
                    },
                    legend: {
                        display: false
                    },
                    type: 'line',
                    scales: {

                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Nombre des salles'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Bloc'
                            }
                        }],
                    }
                }
            });
        },
        error: function (jqXHR, textStatus,
                         errorThrown) {
            console.log(textStatus);
        }
    });
});
