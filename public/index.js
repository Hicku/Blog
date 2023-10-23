
// New post handler
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
            window.location.replace('/dashboard')
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

// New comment hanlder

const newCommentHandler = async (e) => {
    e.preventDefault();
    const post_id = e.target.closest(".post").getAttribute("data-post-id");
    const comment_text = e.target.parentElement.querySelector("textarea").value.trim();
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


const commentButtons = document.querySelectorAll(".comment-button");

commentButtons.forEach((button) => {
    button.addEventListener("click", newCommentHandler);
});

const postElements = document.querySelectorAll(".post");
postElements.forEach((postElement) => {
const post_id = postElement.getAttribute("data-post-id");
const likesCountKey = `likesCount_${post_id}`;
if (!localStorage.getItem(likesCountKey)) {
    localStorage.setItem(likesCountKey, '0');
}
});

// Like handler
const likeHandler = async (e) => {
    e.preventDefault();
    const post_id = e.target.closest(".post").getAttribute("data-post-id");
    try {
        // Send the like request
        const res = await fetch("/api/likes", {
            method: "POST",
            body: JSON.stringify({ post_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            const likesCountKey = `likesCount_${post_id}`;
            const likesCount = parseInt(localStorage.getItem(likesCountKey)) || 0;
            localStorage.setItem(likesCountKey, (likesCount + 1).toString());
        } else {
            alert(res.statusText);
        }
    } catch (error) {
        console.error("An error occurred during liking:", error);
    }
}

const likeButtons = document.querySelectorAll(".like-button");


likeButtons.forEach((button) => {
    button.addEventListener("click", likeHandler);
});
