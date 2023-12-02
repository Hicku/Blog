// New post handler

const postHandler = async (e) => {
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
                window.location.reload();
                }
    } catch (error) {
        console.error("An error occurred during post handling:", error);
        alert("Post failed. Please try again.");
    }
};

// Toggler new post handler

const toggleNewPostHandler = async (e) => { 
    const button = e.currentTarget;
    const newPostContainer = button.parentNode.nextElementSibling;

    if (newPostContainer.style.display === 'none' || newPostContainer.style.display === '') {
        newPostContainer.style.display = 'block';
        button.textContent = "Hide"
    } else {
        newPostContainer.style.display = 'none';
        button.textContent = "New post"
    }
};

const toggleNewPost = document.querySelectorAll('.toggle-new-post');
if (toggleNewPost) {
    toggleNewPost.forEach((button) => {
        button.addEventListener("click", toggleNewPostHandler);
    });
};

const newPostButton = document.getElementById("new-post-button");

if (newPostButton) {
    newPostButton.addEventListener("click", postHandler);
}

// New comment handler

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

// Edit comment handler

const toggleEditCommentHandler = async (e) => {
    e.preventDefault();
    console.log("button clicked")

    
    const commentElement = e.target.closest(".comment");
    const comment_id = commentElement.getAttribute("data-comment-id");

    const currentBody = commentElement.querySelector('.comment-text');
    const contentUpdate = document.createElement("textarea");
    const saveButton = document.createElement("button")
    const updateButton = commentElement.querySelector('.edit-comment-button')
    
    contentUpdate.value = currentBody.textContent
    contentUpdate.setAttribute("class", "content-update-comment")

    currentBody.replaceWith(contentUpdate)
    updateButton.replaceWith(saveButton)
    saveButton.className = "save-comment"
    saveButton.textContent = "Save"

    const saveCommentHandler = async (event) => {
        event.preventDefault();
        const comment_text = document.querySelector('.content-update-comment').value;
        console.log(`hello: ${comment_id}`)
        const res = await fetch(`/api/comment/${comment_id}`, {
            method: "PUT",
            body: JSON.stringify({ comment_text }),   
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            window.location.reload();
        } else {
            alert(res.statusText);
        }
    }

    const saveCommentButton = document.querySelectorAll('.save-comment');
    if(saveCommentButton) {
        saveCommentButton.forEach((button) => {
            button.addEventListener("click", saveCommentHandler);
        });
    };
};    
    
    const toggleEditComment = document.querySelectorAll('.edit-comment-button');
    if (toggleEditComment) {
        toggleEditComment.forEach((button) => {
            button.addEventListener("click", toggleEditCommentHandler);
        });
};

// delete comment handler
const deleteCommentHandler = async (e) => {
    e.preventDefault();
    const commentElement = e.target.closest(".comment");
    const comment_id = commentElement.getAttribute("data-comment-id");
    console.log(comment_id)

    const res = await fetch(`/api/comment/${comment_id}`, { method: "DELETE" });
    
    if (res.ok) {
        window.location.reload();
    } else {
        alert(res.statusText);
    }
};

const deleteCommentButton = document.querySelectorAll('.delete-comment-button');
if (deleteCommentButton) {
    deleteCommentButton.forEach((button) => {
        button.addEventListener("click", deleteCommentHandler);
    });
};

// Likes handler

const likeHandler = async (e) => {
    e.preventDefault();
    const postElement = e.target.closest(".post");
    const post_id = postElement.getAttribute("data-post-id");

    try {
        const res = await fetch("/api/likes", {
            method: "POST",
            body: JSON.stringify({ post_id }),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            const responseData = await res.json();
            const updatedLikesCount = responseData.likesCount;

            const likesCountKey = `likesCount_${post_id}`;
            localStorage.setItem(likesCountKey, updatedLikesCount);

            const likesCountElement = postElement.querySelector(".likes-count");
            likesCountElement.textContent = localStorage.getItem(likesCountKey)
        } else {
            alert(res.statusText);
        }
    } catch (error) {
        console.error("An error occurred during liking:", error);
    };
};

const updateLikesCount = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((button) => {
        const postElement = button.closest(".post");
        const post_id = postElement.getAttribute("data-post-id");
        const likesCountKey = `likesCount_${post_id}`;
        const likesCount = localStorage.getItem(likesCountKey);

        const likesCountElement = postElement.querySelector(".likes-count");
        likesCountElement.textContent = likesCount !== null ? likesCount : "0";
    });
};

updateLikesCount();

const likeButtons = document.querySelectorAll(".like-button");
likeButtons.forEach((button) => {
    button.addEventListener("click", likeHandler);
});


// Follow Handler 

const followHandler = async (e) => {
    e.preventDefault();
    const followButtonElement = e.target.closest(".follow-button-element");
    const follower_id = followButtonElement.getAttribute("data-follower-id");
    const followee_id = followButtonElement.getAttribute("data-followee-id");
    console.log(`FOLLOW ID: ${follower_id}`, `FOLLOWee ID: ${followee_id}`, "follow button clicked")
    
    try {
        const res = await fetch("/api/follow", {
            method: "POST",
            body: JSON.stringify({ follower_id, followee_id }),
            headers: { "Content-Type": "application/json" },
        });
    
        if (res.ok) {
            window.location.reload();
        } else {
            console.error("Request not successful");
        }
    } catch (err) {
        console.error("An error occurred during follow request", err);
    } 
};

const followButton = document.querySelector(".follow-button");
if (followButton) {
    followButton.addEventListener("click", followHandler);
}

const followButtons = document.querySelectorAll(".follow-button");
if(followButtons) {
    followButtons.forEach((button) => {
    button.addEventListener("click", followHandler);
    });
}

// Delete follow handler

const deleteFollowHandler = async (e) => {
    e.preventDefault();
    console.log("button clicked")
    const followButtonElement = e.target.closest(".follow-button-element");
    const follower_id = followButtonElement.getAttribute("data-follower-id");
    const followee_id = followButtonElement.getAttribute("data-followee-id");

    try {
        const res = await fetch("/api/follow/delete", {
            method: "DELETE",
            body: JSON.stringify({ follower_id, followee_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            window.location.reload();
        } else {
            alert(res.statusText);
        }

    } catch (err) {
        console.error("An error occurred during follow request", err);
    }
};

const followingButton = document.querySelector(".following-button");
if (followingButton) {
    followingButton.addEventListener("click", deleteFollowHandler);
}



// Search Handler

const searchHandler = async (e) => {
    e.preventDefault();
    const searchInput = document.querySelector(".search-input").value.trim();
    try {
        const res = await fetch(`/api/search/${searchInput}`, {
            method: "GET",
        });

        if (res.ok) {
            const userData = await res.json();
            if (userData.id) {
                window.location.href = `/profile/${userData.id}`;
            } else {
                console.log("User not found");
            }
        } else {
            console.error("Request not successful");
        }
    } catch (error) {
        console.error("An error occurred during search:", error);
    }
};

const searchButton = document.querySelector(".search-button") 
if (searchButton) {
    searchButton.addEventListener("click", searchHandler);
}

// Toggle edit post handler

const toggleEditPostHandler = async (e) => {
    e.preventDefault();
    const postElement = e.target.closest(".post");
    const post_id = postElement.getAttribute("data-post-id");
    

    const currentTitle = postElement.querySelector('.post-title');
    const currentBody = postElement.querySelector('.post-text');
    const titleUpdate = document.createElement("input");
    const contentUpdate = document.createElement("textarea");
    const saveButton = document.createElement("button")
    const updateButton = postElement.querySelector('.edit-post-button')
    
    titleUpdate.value = currentTitle.textContent
    contentUpdate.value = currentBody.textContent
    titleUpdate.setAttribute("id", "titleUpdate")
    contentUpdate.setAttribute("id", "contentUpdate")

    currentTitle.replaceWith(titleUpdate)
    currentBody.replaceWith(contentUpdate)
    updateButton.replaceWith(saveButton)
    saveButton.id = "save"
    saveButton.textContent = "Save"

    const saveHandler = async (event) => {
        event.preventDefault();
        const post_title = document.getElementById('titleUpdate').value;
        const text = document.getElementById('contentUpdate').value;
        const res = await fetch(`/api/post/${post_id}`, {
            method: "PUT",
            body: JSON.stringify({ post_title, text }),   
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            window.location.reload();
        } else {
            alert(res.statusText);
        }
    }

    document.getElementById('save').addEventListener('click', saveHandler)
};    
    
    const toggleEditPost = document.querySelectorAll('.edit-post-button');
    if (toggleEditPost) {
        toggleEditPost.forEach((button) => {
            button.addEventListener("click", toggleEditPostHandler);
        });
};

//Toggle comments handler

const toggleCommentsHandler = async (e) => { 
    const button = e.currentTarget;
    const commentContainer = button.parentNode.nextElementSibling;

    if (commentContainer.style.display === 'none' || commentContainer.style.display === '') {
        commentContainer.style.display = 'block';
    } else {
        commentContainer.style.display = 'none';
    }
};

const toggleComments = document.querySelectorAll('.toggle-comments');
if (toggleComments) {
    toggleComments.forEach((button) => {
        button.addEventListener("click", toggleCommentsHandler);
    });
};


// Delete post handler

const deleteHandler = async (e) => {
    e.preventDefault();
    console.log("button clicked")
    const postElement = e.target.closest(".post");
    const post_id = postElement.getAttribute("data-post-id");
    console.log(post_id)

    const res = await fetch(`/api/post/${post_id}`, { method: "DELETE" });
    
    if (res.ok) {
        window.location.reload();
    } else {
        alert(res.statusText);
    }
};

const deleteButton = document.querySelectorAll('.delete-post-button');
if (deleteButton) {
    deleteButton.forEach((button) => {
        button.addEventListener("click", deleteHandler);
    });
};

// Follow modals handler

const followModalHandler = (e) => {
    e.preventDefault();
    const modal = document.querySelector('.follower-modal');
    modal.style.display = "block";
};

const toggleFollowerModal = document.querySelector('.follows-count');
if (toggleFollowerModal) {
    toggleFollowerModal.addEventListener('click', followModalHandler);
};

const closeModalHandler = (e) => {
    e.preventDefault();
    const modal = document.querySelector('.follower-modal');
    modal.style.display = "none";
};


const closeFollowerModal = document.querySelector('.follower-close-button');
if (closeFollowerModal) {
    closeFollowerModal.addEventListener('click', closeModalHandler);
};

const modal = document.querySelector('.follower-modal');

const closeOutsideModalHandler = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};

document.addEventListener('click', closeOutsideModalHandler);

// Following modals handler

const followingModalHandler = async (e) => {
    e.preventDefault();
    const followingModal = document.querySelector('.following-modal');
    followingModal.style.display = "block";
};

const toggleFollowingModal = document.querySelector('.following-count');
if (toggleFollowingModal) {
    toggleFollowingModal.addEventListener('click', followingModalHandler);
};




const closeFollowingModalHandler = async (e) => {
    e.preventDefault();
    const followingModal = document.querySelector('.following-modal');
    followingModal.style.display = "none";
};

const closeFollowingModal = document.querySelector('.following-close-button');
if (closeFollowingModal) {
    closeFollowingModal.addEventListener('click', closeFollowingModalHandler);
};

const followingModal = document.querySelector('.following-modal');

const closeOutsideFollowingModalHandler = async (e) => {
    window.onclick = function(e) {
        if (e.target == followingModal) {
            followingModal.style.display = "none";
        }
    }
}

closeOutsideFollowingModalHandler();

// hamburger menu handler

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".flexbox-items-navbar-right");

hamburger.addEventListener("click", () => {
    console.log("clicked");
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});
