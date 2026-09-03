// ========================================
// UPYA GREENLINK REPORT SYSTEM
// ========================================

// YOUR SUPABASE DETAILS
const SUPABASE_URL = "https://treciudfeaariziivopd.supabase.co";
const SUPABASE_KEY = "sb_publishable_4d5zawsmlIT6vpWXXcEUqA_4-h5rA40";

// Create Supabase connection
const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// VARIABLES
// ========================================

let latitude = null;
let longitude = null;


// ========================================
// GET FORM
// ========================================

const reportForm = document.getElementById("reportForm");


// ========================================
// USE MY LOCATION
// ========================================

function getLocation() {

    const locationStatus =
        document.getElementById("locationStatus");

    if (!navigator.geolocation) {

        locationStatus.textContent =
            "❌ Location is not supported by this browser.";

        return;
    }

    locationStatus.textContent =
        "📍 Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            locationStatus.textContent =
                "✅ Location captured successfully.";

        },

        function(error) {

            console.log(error);

            locationStatus.textContent =
                "⚠️ Could not get your location. You can enter it manually.";

        }
    );
}


// ========================================
// PHOTO PREVIEW
// ========================================

const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");

photoInput.addEventListener("change", function() {

    photoPreview.innerHTML = "";

    const file = photoInput.files[0];

    if (!file) {
        return;
    }

    const image = document.createElement("img");

    image.src = URL.createObjectURL(file);

    image.style.maxWidth = "100%";
    image.style.maxHeight = "300px";
    image.style.borderRadius = "12px";
    image.style.marginTop = "10px";

    photoPreview.appendChild(image);
});


// ========================================
// SUBMIT REPORT
// ========================================

reportForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const submitButton =
        document.querySelector(".submit-report");

    submitButton.disabled = true;

    submitButton.textContent =
        "Submitting...";


    // Get form information
    const category =
        document.getElementById("category").value;

    const description =
        document.getElementById("description").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const urgency =
        document.querySelector(
            'input[name="urgency"]:checked'
        ).value;


    // Generate report number
    const reportID =
        "GL-" + Date.now().toString().slice(-6);


    // ========================================
    // SEND TO SUPABASE
    // ========================================

    const { data, error } = await db
        .from("climate_reports")
        .insert([
            {
                report_id: reportID,
                category: category,
                description: description,
                location: location,
                latitude: latitude,
                longitude: longitude,
                urgency: urgency,
                status: "New"
            }
        ])
        .select();


    // ========================================
    // HANDLE ERROR
    // ========================================

    if (error) {

        console.error("SUPABASE ERROR:", error);

        alert(
            "The report could not be submitted.\n\n" +
            error.message
        );

        submitButton.disabled = false;

        submitButton.textContent =
            "🚨 Submit Climate Report";

        return;
    }


    // ========================================
    // SUCCESS
    // ========================================

    reportForm.style.display = "none";

    const successMessage =
        document.getElementById("successMessage");

    successMessage.style.display = "block";

    document.getElementById("reportNumber").innerHTML = `
        <strong>Report ID: ${reportID}</strong>
    `;

});
