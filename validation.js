const form = document.getElementById("registrationForm");

// Run validation when the form is submitted.
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get the information entered by the user.
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const github = document.getElementById("github").value.trim();
    const avatar = document.getElementById("avatar").files[0];

    // Clear previous error messages.
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("githubError").textContent = "";
    document.getElementById("avatarError").textContent = "";

    // Clear previous invalid field indicators.
    document.getElementById("fullName").removeAttribute("aria-invalid");
    document.getElementById("email").removeAttribute("aria-invalid");
    document.getElementById("github").removeAttribute("aria-invalid");
    document.getElementById("avatar").removeAttribute("aria-invalid");

    let isValid = true;

    // Validate the full name.
    if (fullName === "") {
        showError("fullName", "nameError", "Please enter your full name.");
        isValid = false;
    }

    // Validate the email address.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError("email", "emailError", "Please enter a valid email address.");
        isValid = false;
    }

    // Validate the GitHub username.
    const githubPattern = /^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

    if (!githubPattern.test(github)) {
        showError("github", "githubError", "Enter a valid GitHub username starting with @.");
        isValid = false;
    }

    // Validate the uploaded image.
    if (!avatar) {
        showError("avatar", "avatarError", "Please upload a profile picture.");
        isValid = false;
    } else {

        if (avatar.type !== "image/jpeg" && avatar.type !== "image/png") {
            showError("avatar", "avatarError", "Only JPEG and PNG images are allowed.");
            isValid = false;
        }

        if (avatar.size >= 500 * 1024) {
            showError("avatar", "avatarError", "Your image must be smaller than 500 KB.");
            isValid = false;
        }
    }

    // Stop if any information is invalid.
    if (!isValid) {
        return;
    }

    // Read the uploaded image.
    const reader = new FileReader();

    reader.onload = function() {

        // Store the registration information in an object.
        const registrationData = {
            fullName: fullName,
            email: email,
            github: github,
            avatar: reader.result
        };

        // Save the information in sessionStorage.
        try {
            sessionStorage.setItem(
                "codingConfRegistration",
                JSON.stringify(registrationData)
            );

            // Open the ticket page.
            window.location.href = "ticket.html";

        } catch (error) {
            showError("avatar", "avatarError",
                "Unable to save your registration. Please try again.");
        }
    };

    // Display an error if the image cannot be read.
    reader.onerror = function() {
        showError("avatar", "avatarError",
            "Unable to read your image. Please choose another.");
    };

    reader.readAsDataURL(avatar);
});

// Display an error message beside an input.
function showError(inputId, errorId, message) {
    document.getElementById(errorId).textContent = message;
    document.getElementById(inputId).setAttribute("aria-invalid", "true");
}