var $addressSubmit = $('input[type=submit]');
var $mapArea = $('.draw-yard');
var address = document.getElementById('address-input');






//var options = { types: ['address'] };
//autocomplete = new google.maps.places.Autocomplete(address, options);

function initMap() {

  var centerMap = function(location) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 20,
    streetViewControl: false,
    disableDefaultUI: true,
    mapTypeId: 'satellite'
    });

    drawingManager.setMap(map);
  };

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

  // start address autocomplete
  function initialize() {
    var input = document.getElementById('address-input');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', updateAddress);

    function updateAddress() {
    place = autocomplete.getPlace();
    centerMap(place.geometry.location);
    $('section.enter-address').fadeOut('300');
    $('.draw-yard h1').delay('400').fadeIn('slow');
    //$('form.address-area').hide();
    
    }
  }
  
    google.maps.event.addDomListener(window, 'load', initialize);


  
  } // initMap()



