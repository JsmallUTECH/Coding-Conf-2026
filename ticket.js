// Retrieve the registration information.
const savedData = sessionStorage.getItem("codingConfRegistration");

// Redirect visitors without registration data.
if (!savedData) {
    window.location.replace("index.html");
} else {
    try {
        // Convert stored JSON into a JavaScript object.
        const attendee = JSON.parse(savedData);

        // Check the required registration properties.
        if (
            !attendee ||
            typeof attendee.fullName !== "string" ||
            typeof attendee.email !== "string" ||
            typeof attendee.github !== "string" ||
            typeof attendee.avatar !== "string" ||
            attendee.fullName.trim() === "" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email) ||
            !/^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(attendee.github) ||
            !/^data:image\/(jpeg|png);base64,/.test(attendee.avatar)
        ) {
            throw new Error("Invalid registration data.");
        }

        // Display the personalized confirmation.
        document.getElementById("confirmationMessage").textContent =
            "Congrats, " + attendee.fullName + "! Your ticket is ready.";

        // Display the attendee's name.
        document.getElementById("ticketName").textContent =
            attendee.fullName;

        // Display the uploaded avatar.
        const avatarImage = document.getElementById("ticketAvatar");
        avatarImage.src = attendee.avatar;
        avatarImage.alt = "Profile picture of " + attendee.fullName;

        // Display the GitHub username and profile link.
        const githubLink = document.getElementById("ticketGithub");

        githubLink.textContent = attendee.github;
        githubLink.href =
            "https://github.com/" + attendee.github.substring(1);

    } catch (error) {
        // Remove invalid data and return to the home page.
        sessionStorage.removeItem("codingConfRegistration");
        window.location.replace("index.html");
    }
}