const loginHandler = async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username && password) {
        const options = {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"}
        }
        const res = await fetch("/api/user/login", options);

        if(res.ok) {
            document.location.replace("/")
        } else {
            alert(res.statusText)
        }
    }
}

const handleLogout = async (e) => {
    e.preventDefault()
    console.log("button clicked")
    await fetch("/api/user/logout", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
    })
};


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#logout-button").addEventListener("click", handleLogout);
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".login-form").addEventListener("submit", loginHandler);
});


