
const newPostHanlder = async (e) => {
    e.preventDefault();

    document.getElementById("new-post-title").value.trim();
    document.getElementById("new-post-text").value.trim();

    const res = await fetch("api/user/post", {


const loginHandler = async (e) => {

    e.preventDefault();

    console.log("button clicked")
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
    e.preventDefault();
    console.log("button clicked")
    await fetch("/api/user/logout", {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"}
    });
};


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


document.getElementById("logout-button").addEventListener("click", handleLogout);
document.getElementById("register-button").addEventListener("click", handleRegister)
document.getElementById("login-form").addEventListener("click", loginHandler);







