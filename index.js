$(document).ready(function() {
  var aliments = [];

  var $nomAliment = $("#nomAliment");
  var $calories = $("#calories");
  var $ajouterAlimentBtn = $("#ajouterAlimentBtn");
  var $listeAliments = $("#listeAliments");
  var $graphiqueCalories = $("#graphiqueCalories");

  $ajouterAlimentBtn.on("click", function() {
    var nom = $nomAliment.val();
    var calories = parseInt($calories.val());

    if (nom !== "" && !isNaN(calories)) {
      var aliment = {
        nom: nom,
        calories: calories
      };

      aliments.push(aliment);

      $nomAliment.val("");
      $calories.val("");

      mettreAJourTableauAliments();
      mettreAJourGraphiqueCalories();
    }
  });

  $listeAliments.on("click", ".supprimerAlimentBtn", function() {
    var index = $(this).data("index");
    aliments.splice(index, 1);
    mettreAJourTableauAliments();
    mettreAJourGraphiqueCalories();
  });

  function mettreAJourTableauAliments() {
    $listeAliments.empty();

    $.each(aliments, function(index, aliment) {
      var $tr = $("<tr>");
      $tr.append("<td>" + aliment.nom + "</td>");
      $tr.append("<td>" + aliment.calories + "</td>");
      $tr.append(
        '<td><button class="supprimerAlimentBtn" data-index="' +
          index +
          '">Supprimer</button></td>'
      );

      $listeAliments.append($tr);
    });
  }

  var chart;

  function mettreAJourGraphiqueCalories() {
    var labels = [];
    var data = [];

    $.each(aliments, function(index, aliment) {
      labels.push(aliment.nom);
      data.push(aliment.calories);
    });

    // Destruction du graphique précédent s'il existe
    if (chart) {
      chart.destroy();
    }

    var ctx = $graphiqueCalories[0].getContext("2d");
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Calories consommées",
            data: data,
            backgroundColor: "rgba(66, 133, 244, 0.6)"
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}); 
