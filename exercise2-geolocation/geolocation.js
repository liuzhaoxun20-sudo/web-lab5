// Get the element where we will display the result
const outputEl = document.getElementById('geolocation');

// Called when the button is clicked
function getGeolocation() {
    // Check if the browser supports the Geolocation API
    if (navigator.geolocation) {
        // Ask for the current position
        // On success, call showGeolocation
        // On failure (e.g. permission denied), call handleError
        navigator.geolocation.getCurrentPosition(showGeolocation, handleError);
        outputEl.innerHTML = "Requesting location…";
    } else {
        // Browser does not support geolocation
        outputEl.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Success callback: we got the position
function showGeolocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    outputEl.innerHTML =
        "Latitude: " + lat + "\n" +
        "Longitude: " + lon;
}

// Error callback: user denied, unavailable, timeout, etc.
function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            outputEl.innerHTML =
                "You denied the location request.\n" +
                "If you want to try again:\n" +
                "1. Click the lock icon near the browser address bar.\n" +
                "2. Allow location access for this page.\n" +
                "3. Click the button again.";
            break;
        case error.POSITION_UNAVAILABLE:
            outputEl.innerHTML =
                "Location information is unavailable (for example, GPS or network information could not be retrieved).";
            break;
        case error.TIMEOUT:
            outputEl.innerHTML =
                "The request to get your location timed out. Please try again.";
            break;
        default:
            outputEl.innerHTML =
                "An unknown error occurred and your location could not be retrieved.";
    }
}
