
// -------------------------code for video playing in background---------------
function deferVideo() {

  //defer html5 video loading
  $("video source").each(function () {
    var sourceFile = $(this).attr("data-src");
    $(this).attr("src", sourceFile);
    var video = this.parentElement;
    video.load();
    // uncomment if video is not autoplay
    //video.play();
  });

}
window.onload = deferVideo;

//-------------------------------------------------------------------------------

(function ($) { // Begin jQuery
  $(function () { // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $('nav ul li a:not(:only-child)').click(function (e) {
      $(this).siblings('.nav-dropdown').toggle();
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function () {
      $('.nav-dropdown').hide();
    });
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function () {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active');
    });
  }); // end DOM ready
})(jQuery); // end jQuery


// Puts the loading icon in an event list
$(function () {
  // this code is for this demo only
  $('button').click(function () {
    $('.wrapper').toggleClass('loading');
  });

  /*
$('table').tablesorter({
  theme: 'blue',
      initialized: function(){
        $('.wrapper').removeClass('loading');
      }
});
  */
});


//event listener, adds loading animation when ajax call is made and waits ajax call to finish 
$wrapper = $(".wrapper");

$(document).on({
  ajaxStart: function () { $wrapper.addClass("loading"); },
  ajaxStop: function () { $wrapper.removeClass("loading"); }
});
//---------------------------------------------------------------------------------------------

//initial variables
var startPoint;
var endPoint;
// Array to hold coordinates to check weather for
var convertedCoords = [];


// Google Maps, does something we dont know what it does
// function calcRoute() {
//   var request = {
//     origin: startPoint,
//     destination: endPoint,
//     travelMode: 'DRIVING'
//   };
//   directionsService.route(request, function (response, status) {
//     if (status == 'OK') {
//       directionsRenderer.setDirections(response);
//     }
//   });
// }


//--------------------------------------------------Styling the map--------------------------------------------------------------//
//------------------------------------------------dont touch code below-------------------------------------------------------------  

// Put USA map on screen onload:
function initMap() {

  // Create a new StyledMapType object, passing it an array of styles,
  // and the name to be displayed on the map type control.
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ],
    { name: 'Styled Map' });

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 38.5, lng: -96 },
    zoom: 4.3,
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
}

//-------------------------------------------- Dont touch this code above--------------------------------
// ---------------------------------------------------------------------------------------------------------

// Google Geocoding API to convert coordinates to city and add results to array:
function getGeocodeCity(coordinates) {
  var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordinates + "&key=AIzaSyAmLr5yU5_SJ5Jx1AA-T59scJF4xuLvLEc";
  $.ajax({
    url: geocodeURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response)
      var geocodedCity = response.results[(response.results.length) - 4].formatted_address
      console.log(geocodedCity)
      convertedCoords.splice(1, 0, geocodedCity)
      console.log("Array of converted cities: " + convertedCoords)
      return convertedCoords;
    })
}

// Test run of above function
// var sampleCoords = "30.66, -88.20"
// getGeocodeCity(sampleCoords)

// Pull info from local storage to place in input form
document.getElementById("pointA").value = localStorage.getItem("start");
document.getElementById("pointB").value = localStorage.getItem("destination");

//event listener for submit bttn:
$("#submit").on("click", function (event) {
  event.preventDefault();
  // empty the weather info table
  $('#tb').empty()
  // empty the route directions
  $("#directions").empty();
  
  // clears array to empty previous user input
  coordsToCheck = [];
  convertedCoords = [];
  
  // save user inputs to variables
  var startPoint = $("#pointA").val();
  var endPoint = $("#pointB").val();

  // Save user input to local storage:
    function saveComment() {
    var start = document.getElementById("pointA").value;
    var destination = document.getElementById("pointB").value;
    localStorage.setItem("start", start);
    localStorage.setItem("destination", destination);
  }

  // run function to save input into local storage
  saveComment();


  console.log("Going from " + startPoint + " to " + endPoint);

  // add user input to array of cities to run in weather API
  convertedCoords.push(startPoint)
  convertedCoords.push(endPoint)

  //-----------------------------------------------Google Map-----------------------------------------
  // Puts map on screen with JSON style from Google
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ],
    { name: 'Styled Map' });
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  // choose focus point for map to show
  var mapOptions = {
    zoom: 4,
    center: { lat: 38, lng: -96 }
  }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  directionsRenderer.setPanel(document.getElementById('directions'));

  //puts route on the map
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // var start = document.getElementById('pointA').value;
    // var end = document.getElementById('pointB').value;
    directionsService.route({
      origin: startPoint,
      destination: endPoint,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      }
    });
  }

  var request = {
    origin: startPoint,
    destination: endPoint,
    travelMode: 'DRIVING'

  };
  directionsService.route(request, function (result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
  });
  //---------------------------------------------------------------------------------------------

  // ----------------------------Function to pull cities at 50-mile intervals from route and-----------------------
  var directionsURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" + startPoint + "&destination=" + endPoint + "&key=AIzaSyAmLr5yU5_SJ5Jx1AA-T59scJF4xuLvLEc";
  $.ajax({
    url: directionsURL,
    method: "GET"
  })
    .then(function (response) {
      //var results = response.data;
      console.log("Google directions API object below")
      console.log(response)

      // show error message if there is an invalid address
      if (response.status == "NOT_FOUND") {
        $("#pointA").val("Invalid Address");
        $("#pointB").val("Please Try Again");
      }

      /*
      else {
        console.log(response.routes[0].legs[0].steps[0].html_instructions)
        var distanceValue;
        */

      // Checks distance for each step of route. Saves long distances to variable:
      for (var i = 0; i < response.routes[0].legs[0].steps.length; i++) {
        var distanceValue = response.routes[0].legs[0].steps[i].distance.value;
        // console.log(response.routes[0].legs[0].steps[i].distance); 
        // distanceValue will be used to determine locations for which to check weather

        // var startLat = response.routes[0].legs[0].start_location.lat;
        // var startLong = response.routes[0].legs[0].start_location.lng;
        // var originCoords = startLat + "," + startLong;
        // coordsToCheck.push(originCoords)
        //getGeocodeCity(originCoords);
        if (distanceValue >= 80000) {
          var lat = response.routes[0].legs[0].steps[i].end_location.lat;
          var lng = response.routes[0].legs[0].steps[i].end_location.lng;
          var latLong = lat + "," + lng;
          coordsToCheck.push(latLong)
          console.log(coordsToCheck)
        }
      }
      // Pull coordinates for points after long distances
      for (var i = 0; i < coordsToCheck.length; i++) {
        getGeocodeCity(coordsToCheck[i])
      }

      console.log(convertedCoords)
      // var endLat = response.routes[0].legs[0].end_location.lat;
      // var endLong = response.routes[0].legs[0].end_location.lng;
      // var endCoords = endLat + "," + endLong;
      // coordsToCheck.push(endCoords)
      return convertedCoords;
    })
  //---------------------------------------------------------------------------------------------


  
  // add delay to weather api
  async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  // Run cities array through Open Weather API and append info to weather info table
  function first() {

    for (var i = 0; i < convertedCoords.length; i++) {
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + convertedCoords[i] + "&appid=fe2767efcdc5875e488e5fcdeb27a943&units=imperial"

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        // console.log(response)
        // console.log(response.city.name)
        var sunrise = response.city.sunrise;
        var sunset = response.city.sunset;
        // console.log("+++++++")
        convertedMorning = timeConverter(sunrise)
        // console.log("+++++++")
        convertedNight = timeConverter(sunset)
        // console.log("+++++++")
        // console.log("___________")
        // console.log("___________")
        $("#tb").append(
          $("<tr>").append(
            $("<td>").text(response.city.name),
            // console.log(response.list[1].wind),
            $("<td>").text(response.list[1].wind.speed),
            $("<td>").text(response.list[1].main.humidity),
            $("<td>").text(response.list[1].main.temp),
            $("<td>").text(convertedMorning),
            $("<td>").text(convertedNight),
            // console.log(response.list[1].weather[0].description),
            $("<td>").text(response.list[1].weather[0].description)

          ))

      })

    }


    // Unix time converter:
    function timeConverter(a) {
      let unix_timestamp = a
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp * 1000);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      // console.log("this is the formatted time: ", formattedTime);
      return formattedTime
    }


  }

  
  // Delay weather API call to allow time for cities array to be filled:
  let run = async () => {
    await delay(2000)
    first();
  }
  run();
})


  

//Parallax:
// ('.parallax').parallax({ imageSrc: 'assets/background/back.jpg' });
// $('.parallax').parallax({imageSrc: '/assets.background.back.jpg'});
// var image = document.getElementsByClassName('thumbnail');
// new simpleParallax(image, {
// 	delay: .6,
// 	transition: 'cubic-bezier(0,0,0,1)'
// });
// console.log(image)

