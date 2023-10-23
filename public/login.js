const loginHandler = async (e) => {

    e.preventDefault();
    console.log("button clicked");
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username && password) {

        const res = await fetch("/api/user/login", 
            {
                method: "POST",
                body: JSON.stringify({username, password}),
                headers: {"Content-Type": "application/json"}
            }
        );

        if(res.ok) {
            document.location.replace("/dashboard")
        } else {
            alert(res.statusText)
        };
    };
};


const loginButton = document.getElementById("login-button");

if (loginButton) {
    loginButton.addEventListener("click", loginHandler);
}