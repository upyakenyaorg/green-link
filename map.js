```javascript
// CREATE MAP
// Initial pilot location: Seme / Kisumu area

const map = L.map("climateMap").setView(
    [-0.10, 34.75],
    12
);


// MAP TILES

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; OpenStreetMap contributors'
    }
).addTo(map);


// CLIMATE DATA
// These are DEMO points for the prototype.

const climateData = [

    {
        type: "waste",
        title: "Illegal Waste Dumping",
        location: "Community Road",
        description:
            "Waste accumulation reported by the community.",
        coordinates: [-0.105, 34.735]
    },

    {
        type: "flooding",
        title: "Flood-Prone Area",
        location: "Low-Lying Community Area",
        description:
            "Area reported to experience flooding during heavy rainfall.",
        coordinates: [-0.085, 34.765]
    },

    {
        type: "trees",
        title: "Green Seme Tree Project",
        location: "Community Tree-Planting Site",
        description:
            "UPYA youth tree planting and monitoring project.",
        coordinates: [-0.125, 34.745]
    },

    {
        type: "water",
        title: "Water Challenge",
        location: "Community Water Point",
        description:
            "Community reported a water-access challenge.",
        coordinates: [-0.075, 34.725]
    },

    {
        type: "project",
        title: "Community Clean-Up",
        location: "Community Centre",
        description:
            "Completed youth-led environmental clean-up.",
        coordinates: [-0.115, 34.775]
    },

    {
        type: "trees",
        title: "School Tree Project",
        location: "Local School",
        description:
            "Youth and students participating in tree planting.",
        coordinates: [-0.065, 34.755]
    }

];


// STORE MARKERS

let markers = [];


// CREATE MARKERS

climateData.forEach(item => {

    const marker = L.marker(item.coordinates);

    marker.category = item.type;

    marker.bindPopup(`

        <div style="min-width:220px">

            <h3>${item.title}</h3>

            <p>
                <strong>Location:</strong>
                ${item.location}
            </p>

            <p>
                ${item.description}
            </p>

            <button
                onclick="viewProject('${item.title}')"
                style="
                    padding:8px 12px;
                    border:none;
                    border-radius:6px;
                    background:#1e40af;
                    color:white;
                    cursor:pointer;
                "
            >
                View Details
            </button>

        </div>

    `);

    marker.addTo(map);

    markers.push(marker);

});


// FILTER MAP

function filterMap(category, button) {

    document
        .querySelectorAll(".filter")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    button.classList.add("active");


    markers.forEach(marker => {

        if (
            category === "all" ||
            marker.category === category
        ) {

            marker.addTo(map);

        } else {

            map.removeLayer(marker);

        }

    });

}


// VIEW PROJECT

function viewProject(title) {

    alert(
        title +
        "\n\nMore information will be available when GreenLink is connected to the project database."
    );

}
```
