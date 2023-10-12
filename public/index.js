const loginHandler = async (e) => {
    console.log("Handler executed")
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username && password) {
        const options = {
            method: "POST",
            body: JSON.stringify(username, password),
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

document.getElementById("login-form").addEventListener("submit", loginHandler)