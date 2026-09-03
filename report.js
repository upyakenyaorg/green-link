// ================================
// UPYA GREENLINK - REPORT SYSTEM
// ================================

// PASTE YOUR SUPABASE DETAILS HERE
const SUPABASE_URL = "https://treciudfeaariziivopd.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_4d5zawsmlIT6vpWXXcEUqA_4-h5rA40";

// Load Supabase
const { createClient } = supabase;

const db = createClient(SUPABASE_URL, SUPABASE_KEY);


// ================================
// GET FORM ELEMENTS
// ================================

const reportForm = document.getElementById("reportForm");
const successMessage = document.getElementById("successMessage");


// ================================
// SUBMIT REPORT
// ================================

reportForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const urgency = document.getElementById("urgency").value;

    // Generate report ID
    const reportID =
        "GL-" +
        Date.now().toString().slice(-6);


    // ================================
    // GET GPS LOCATION
    // ================================

    let latitude = null;
    let longitude = null;

    if (navigator.geolocation) {

        try {

            const position = await new Promise((resolve, reject) => {

                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    {
                        enableHighAccuracy: true,
                        timeout: 10000
                    }
                );

            });

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

        } catch (error) {

            console.log("GPS location not available.");

        }
    }


    // ================================
    // SAVE TO SUPABASE
    // ================================

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


    // ================================
    // CHECK FOR ERRORS
    // ================================

    if (error) {

        console.error(error);

        alert(
            "Report could not be submitted.\n\n" +
            error.message
        );

        return;
    }


    // ================================
    // SUCCESS
    // ================================

    reportForm.style.display = "none";

    successMessage.style.display = "block";

    successMessage.innerHTML = `
        <div class="success-box">

            <h2>🌱 Report Submitted!</h2>

            <p>
                Thank you for helping your community.
                Your climate report has been received by UPYA GreenLink.
            </p>

            <h3>Report ID</h3>

            <strong>${reportID}</strong>

            <p>
                Keep this ID for future reference.
            </p>

        </div>
    `;

});
