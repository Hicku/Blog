const newPostHanlder = async (e) => {
    e.preventDefault();

    document.getElementById("new-post-title").value.trim();
    document.getElementById("new-post-text").value.trim();

    const res = await fetch("api/user/post", {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"}
    });
};







