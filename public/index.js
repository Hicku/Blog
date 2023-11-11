const postHandler = async (e) => {
    e.preventDefault();
    const post_title = document.getElementById("new-post-title").value.trim();
    const text = document.getElementById("new-post-content").value.trim();

    try {
            const postRes = await fetch("/api/post", {
                method: "POST",
                body: JSON.stringify({ post_title, text }),
                headers: { "Content-Type": "application/json" },
            });

            if (postRes.ok) {
                window.location.reload();
                }
    } catch (error) {
        console.error("An error occurred during post handling:", error);
        alert("Post failed. Please try again.");
    }
};

// const handlePostAndTag = async (e) => {
//     e.preventDefault();
//     const post_title = document.getElementById("new-post-title").value.trim();
//     const text = document.getElementById("new-post-content").value.trim();
//     const tag_name = document.querySelector(".tag-input").value.trim();

//     try {
//         // Check if the tag already exists
//         const tagRes = await fetch(`/api/tag/${tag_name}`, {
//             method: "GET",
//         });

//         if (tagRes.ok) {
//             const tagData = await tagRes.json();

//             if (tagData && tagData.id) {
//                 // Tag exists, use its data to create post_tag
//                 const postRes = await fetch("/api/post", {
//                     method: "POST",
//                     body: JSON.stringify({ post_title, text }),
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 // Create post tag
//                 if (postRes.ok) {
//                     const postData = await postRes.json();
//                     const tag_id = tagData.id;
//                     const post_id = postData.id;
//                     const postTagRes = await fetch("/api/post_tag/", {
//                         method: "POST",
//                         body: JSON.stringify({ tag_id, post_id }),
//                         headers: { "Content-Type": "application/json" },
//                     });

//                     if (postTagRes.ok) {
//                         window.location.reload();
//                     }
//                 }
//             } else {
//                 // Tag doesn't exist, create a new tag
//                 const newTagRes = await fetch("/api/tag/", {
//                     method: "POST",
//                     body: JSON.stringify({ tag_name }),
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 if (newTagRes.ok) {
//                     // New tag is created, use data to create post_tag
//                     const tagRes2 = await fetch(`/api/tag/${tag_name}`, {
//                         method: "GET",
//                     });

//                     // Create post

//                     if (tagRes2.ok) {
//                         const newTagData = await tagRes2.json();
//                         console.log(newTagData);
//                         const tag_id = newTagData.id;
//                         const postRes = await fetch("/api/post", {
//                             method: "POST",
//                             body: JSON.stringify({ post_title, text }),
//                             headers: { "Content-Type": "application/json" },
//                         });
                        
//                         // Create post tag

//                         if (postRes.ok) {
//                             const postData = await postRes.json();
//                             console.log(postData);
//                             console.log(`tagId: ${tag_id}`)
//                             const post_id = postData.id;
//                             const postTagRes = await fetch("/api/post_tag/", {
//                                 method: "POST",
//                                 body: JSON.stringify({ tag_id, post_id }),
//                                 headers: { "Content-Type": "application/json" },
//                             });
    
//                             if (postTagRes.ok) {
//                                 window.location.reload();
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     } catch (error) {
//         console.error("An error occurred during post and tag handling:", error);
//         alert("Post and tag creation failed. Please try again.");
//     }
// };

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
        if (likesCount !== null) {
            const likesCountElement = postElement.querySelector(".likes-count");
            likesCountElement.textContent = likesCount;
        };
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

//Toggle comments handler

document.getElementById('toggle-comments').addEventListener('click', function() {
    var commentsContainer = document.getElementById('comments-container');
    if (commentsContainer.style.display === 'none' || commentsContainer.style.display === '') {
        commentsContainer.style.display = 'block';
    } else {
        commentsContainer.style.display = 'none';
    }
});

