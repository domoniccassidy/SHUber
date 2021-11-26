// References used:

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/longitude
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
// https://www.w3schools.com/html/html5_geolocation.asp

// https://leafletjs.com/examples/quick-start/
// https://leafletjs.com/examples/custom-icons/
// Copyright notice - https://www.openstreetmap.org/copyright
// https://www.liedman.net/leaflet-routing-machine/tutorials/basic-usage/

// Key used for ITSE Group Project - Provided through Mapbox
const key = 'pk.eyJ1Ijoia2llcmFueWVzIiwiYSI6ImNrdzI4bjZvejA3djMzMXFseGpjaXRhcHMifQ.oNgLKm04eGOq4gRmlrpOAA';
const shuberMap = L.map('map');
let lat, long;
let userMarker, driverMarker;

// Custom taxi png image to plot on the map
const taxiIcon = L.icon({
    iconUrl: 'taxiIcon.png',

    iconSize: [32, 32], // size of the icon
    iconAnchor: [32, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [-15, -32] // point from which the popup should open relative to the iconAnchor
});

//
// Function called upon successfully receiving user location
//
function success(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    $("#status").html("Successfully retrieved current location.");
    //console.log("Lat: " + lat + "\n" + "Long: " + long)

    // Updating the map to show the new user location
    plotUserLocation(lat, long);

    // Updating the map to show the drivers location
    plotDriverLocation(lat, long);

    // !! For now just passing default values but connect this up later !!
    plotRoute(53.3784, -1.4543, 53.4064, -1.4217);
}

// Function called upon failure to get user location
// Discerns type error and displays to the user. (Can either use an alert or a display box of some kind)
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            $("#status").html("You denied the request to get current location.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#status").html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#status").html("The request to get location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $("#status").html("An unknown error occurred.");
            break;
    }
    
    // Remove possible existing markers and reset to default location
    shuberMap.removeLayer(userMarker);
    shuberMap.removeLayer(driverMarker);
    shuberMap.setView([53.3811, -1.4701], 12);
}

function initialiseMap() {
    // Setting default view of the map to sheffield city ([lat, long], zoom)
    shuberMap.setView([53.3811, -1.4701], 12);

    // Default map settings
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: key
    }).addTo(shuberMap);
}

function plotUserLocation(lat, long) {
    shuberMap.setView([lat, long], 14);
    
    // Plot the user location on the map
    userMarker = L.marker([lat, long]).addTo(shuberMap).bindPopup("Your current location.");
}

function plotDriverLocation(lat, long) {
    // Plot the driver's location on the map
    driverMarker = L.marker([lat+0.0010, long+0.0010], { icon: taxiIcon }).addTo(shuberMap).bindPopup("Your driver's current location.");
}

function plotRoute(startLat, startLong, endLat, endLong) {

    // We are using mapbox for the routing service API
    // Make read-only route so that the user cannot edit it in anyway
    L.Routing.control({
        waypoints: [
            L.latLng(startLat, startLong),
            L.latLng(endLat, endLong)
        ],
        router: L.Routing.mapbox(key),
        fitSelectedRoutes: true,
        draggableWaypoints: false,
        routeWhileDragging: false,
        lineOptions : {
            addWaypoints: false
        }
    }).addTo(shuberMap);
    
}

//
// Script entry point - This code is run firstly.
//
initialiseMap();

// Trigger get location through button click
$("#getLocation").click(function () {
    navigator.geolocation.getCurrentPosition(success, showError);
});

