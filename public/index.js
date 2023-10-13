const loginHandler = async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username && password) {

        const res = await fetch("/api/user/login", 
            {
                method: "POST",
                body: JSON.stringify({username, password}),
                headers: {"Content-Type": "application/json"}
            }
        )

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


document.getElementById("logout-button").addEventListener("click", handleLogout);
document.getElementById("login-form").addEventListener("submit", loginHandler);





