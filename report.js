```javascript
const form = document.getElementById("reportForm");

const photo = document.getElementById("photo");

const preview = document.getElementById("photoPreview");

const successMessage = document.getElementById("successMessage");


// PHOTO PREVIEW

photo.addEventListener("change", function () {

    preview.innerHTML = "";

    const file = this.files[0];

    if (file) {

        const image = document.createElement("img");

        image.src = URL.createObjectURL(file);

        preview.appendChild(image);

    }

});


// GET LOCATION

function getLocation() {

    const status = document.getElementById("locationStatus");

    if (!navigator.geolocation) {

        status.textContent =
            "Location services are not supported by this browser.";

        return;

    }

    status.textContent = "📍 Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude = position.coords.latitude;

            const longitude = position.coords.longitude;

            status.textContent =
                "✓ Location captured: " +
                latitude.toFixed(5) +
                ", " +
                longitude.toFixed(5);

        },

        function() {

            status.textContent =
                "Unable to access your location. Please enter it manually.";

        }

    );

}


// SUBMIT REPORT

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const category =
        document.getElementById("category").value;

    const location =
        document.getElementById("location").value;

    const reportID =
        "UPYA-" +
        Math.floor(100000 + Math.random() * 900000);


    form.style.display = "none";

    successMessage.style.display = "block";

    document.getElementById("reportNumber").innerHTML =
        "<strong>Report ID:</strong> " + reportID;

});
```
