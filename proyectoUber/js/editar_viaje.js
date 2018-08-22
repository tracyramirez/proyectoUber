var route = null;
var kms = null;
var inicio = null;
var final = null; 
var costo = null;

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 10.32, lng: -84.43}
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: checkboxArray[i].value,
          stopover: true
        });
      }
    }

    directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('end').value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
              '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
          inicio = route.legs[i].start_address;
          final = route.legs[i].end_address;
          kms = route.legs[i].distance.text;
          mostrar_informacion();
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

function mostrar_informacion(){
  $('#btn_iniciar_viaje').css('display', 'block');
  $('#kms').text(kms);
  costo = parseFloat(kms.replace(' km', ''))*500;
  $('#costo').text(costo);
}

function modificar_viaje(){
  var usuario_actual = localStorage.getItem('usuario_actual');
  var viajes = JSON.parse(localStorage.getItem(usuario_actual+"_viajes")) || [];
  var viaje = {id: viajes.length+1, usuario: usuario_actual, chofer: $('#chofer').val(), 
  inicio: inicio, final: final, kms: kms, costo: costo}
  $.each(viajes, function( index, value ) {
      if(value.id == localStorage.getItem('viaje_editar')){
        viajes[index] = viaje;
        return;
      }
  });
  localStorage.setItem(usuario_actual+"_viajes", JSON.stringify(viajes));
  $(location).attr('href', 'dashboard.html'); 
}
