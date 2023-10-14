const handleLogout = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    document.location.replace("/login");
};


const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
}