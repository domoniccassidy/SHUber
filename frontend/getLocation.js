// References used:

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates/longitude
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
// https://www.w3schools.com/html/html5_geolocation.asp

// Default values
let lat;
let long;

// Calls the popup when you click the 'popup' button this will likely be automated upon a taxi request
$("#popup").click(function(){
    $("#locationContainer").modal();
});

// Function called upon successfully receiving user location
function success(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    // For now displaying lat and long to user but later can be passed elsewhere once integrated into main system
    $("#latitude").html(lat);
    $("#longitude").html(long);
    $("#status").html("Successfully retrieved current location.");
}

// Function called upon failure to get user location
// Discerns type error and displays to the user. (Can either user alert of a display box of some kind)
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
}

// User currently clicks a button to get the location inside the popup but can be automated if desired
$("#getLocation").click(function () {
    navigator.geolocation.getCurrentPosition(success, showError);
});