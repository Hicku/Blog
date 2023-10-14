const handleRegister = async (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const first_name = document.getElementById("reg-fname").value.trim();
    const last_name = document.getElementById("reg-lname").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    try {
        const response = await fetch("/api/user/", {
            method: "POST",
            body: JSON.stringify({ username, email, first_name, last_name, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Registration failed. Please try again.");
        }
    } catch (error) {
        console.error("An error occurred during registration:", error);
        alert("Registration failed. Please try again.");
    }
};

const registerButton = document.getElementById("register-button");

if (registerButton) {
    registerButton.addEventListener("click", handleRegister);
}