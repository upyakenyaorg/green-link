function reportProblem() {
    alert(
        "GreenLink Climate Reporting\n\n" +
        "The reporting system will allow you to submit a climate or environmental problem with a photo and location."
    );
}

function joinVolunteer() {
    alert(
        "Welcome to UPYA GreenLink!\n\n" +
        "The volunteer registration system will allow young people to join climate-action projects."
    );
}

function toggleMenu() {
    const nav = document.querySelector("nav");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "75px";
        nav.style.right = "7%";
        nav.style.background = "white";
        nav.style.padding = "20px";
        nav.style.borderRadius = "10px";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
    }
}
