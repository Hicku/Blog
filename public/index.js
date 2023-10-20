const newPostHanlder = async (e) => {
    e.preventDefault();
    const post_title = document.getElementById("new-post-title").value.trim();
    const text = document.getElementById("new-post-content").value.trim();

    try {
        const res = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({ post_title, text }),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            window.location.replace('/')
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.error("An error occurred during new post:", error);
        alert("New post failed. Please try again.");
    };
};

const newPostButton = document.getElementById("new-post-button");

if (newPostButton) {
    newPostButton.addEventListener("click", newPostHanlder);
}

// Function for handling the comments

const newCommentHandler = async (e) => {
    e.preventDefault();
    const post_id = e.target.closest(".post").dataset.id;
    const comment_text = document.getElementById("comment-text").value.trim();
    try {
        const res = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({ comment_text, post_id}),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            window.location.reload();
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.error("An error occurred during new comment:", error);
        alert("New comment failed. Please try again.");
    };
};


const newCommentButton = document.getElementById("comment-button");
if(newCommentButton){
    newCommentButton.addEventListener("click", newCommentHandler);
}
