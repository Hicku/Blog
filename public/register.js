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

// Edit comment handler

// const toggleEditCommentHandler = async (e) => {
//     e.preventDefault();
//     const commentElement = e.target.closest(".comment");
//     const comment_id = postElement.getAttribute("data-comment-id");

//     const currentBody = document.getElementById('postText');
//     const contentUpdate = document.createElement("textarea");
//     const saveButton = document.createElement("button")
//     const updateButton = document.getElementById('edit-comment-button')
    
//     contentUpdate.value = currentBody.textContent
//     contentUpdate.setAttribute("id", "contentUpdate-comment")

//     currentBody.replaceWith(contentUpdate)
//     updateButton.replaceWith(saveButton)
//     saveButton.id = "save-comment"
//     saveButton.textContent = "Save"

//     const saveCommentHandler = async (event) => {
//         event.preventDefault();
//         const text = document.getElementById('contentUpdate').value;
//         console.log(post_id)
//         const response = await fetch(`/api/post/${post_id}`, {
//             method: "PUT",
//             body: JSON.stringify({ post_title, text }),   
//             headers: { "Content-Type": "application/json" },
//         });
//         if (response.ok) {
//             window.location.reload();
//         } else {
//             alert(response.statusText);
//         }
//     }

//     document.getElementById('save-comment').addEventListener('click', saveCommentHandler)
// };    
    
//     const toggleEditComment = document.querySelectorAll('.edit-post-button');
//     if (toggleEditComment) {
//         toggleEditComment.forEach((button) => {
//             button.addEventListener("click", toggleEditCommentHandler);
//         });
// };