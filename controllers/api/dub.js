// Delete follow handler

// const deleteFollowHandler = async (e) => {
//     e.preventDefault();
//     console.log("button clicked")
//     const postElement = e.target.closest(".post");
//     const post_id = postElement.getAttribute("data-post-id");
//     console.log(post_id)

//     const response = await fetch(`/api/post/${post_id}`, { method: "DELETE" });
    
//     if (response.ok) {
//         window.location.reload();
//     } else {
//         alert(response.statusText);
//     }
// };

// const followingButton = document.querySelector(".following-button");
// if (followingButton) {
//     followingButton.addEventListener("click", deleteFollowHandler);
// }


// const followHandler = async (e) => {
//     e.preventDefault();
//     const followButtonElement = e.target.closest(".follow-button-element");
//     const follower_id = followButtonElement.getAttribute("data-follower-id");
//     const followee_id = followButtonElement.getAttribute("data-followee-id");
//     console.log(`FOLLOW ID: ${follower_id}`, `FOLLOWee ID: ${followee_id}`, "follow button clicked")
    
//     try {
//         const res = await fetch("/api/follow", {
//             method: "POST",
//             body: JSON.stringify({ follower_id, followee_id }),
//             headers: { "Content-Type": "application/json" },
//         });
    
//         if (res.ok) {
//             window.location.reload();
//         } else {
//             console.error("Request not successful");
//         }
//     } catch (err) {
//         console.error("An error occurred during follow request", err);
//     } 
// };



