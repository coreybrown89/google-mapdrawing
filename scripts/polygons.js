var $addressSubmit = $('input[type=submit]');
var $mapArea = $('.draw-yard');
var $address = $('#map-address');





function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.7603, lng: -95.4679},
      zoom: 19,
    streetViewControl: false,
    disableDefaultUI: true,
    mapTypeId: 'satellite'
    });

    // Enable Polygon Drawing
    var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polygon']
    },
    polygonOptions: {
      fillColor: '#a3ccff',
      fillOpacity: .5,
    strokeColor: '#a3ccff',
      strokeWeight: 3,
      clickable: true,
      editable: false,
      zIndex: 1
    }

  
  }); 

  drawingManager.setMap(map);

  drawingManager.setOptions({
    drawingControlOptions: {
    position: google.maps.ControlPosition.BOTTOM_LEFT,
    drawingModes: ['polygon']
  }
});

  // completed polygon listener
  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
  var newPoly = polygon.getPath();
  var polyArea = google.maps.geometry.spherical.computeArea(newPoly);
  var polyAreaRounded = Math.round(polyArea);
  var areaTemplate = '<p>Nice, your yard is ' + polyAreaRounded + ' square feet </p>';

  $('h1').append(areaTemplate);
});
  

  } // initMap()

  $(document).ready(function(){
    $addressSubmit.click(function(){
      initMap();

    })

  });