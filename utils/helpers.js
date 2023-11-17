module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    is_current_user: (user_id, current_user_id) => {
        return user_id === current_user_id;
    },
    is_following: (followed_id) => {
        return !followed_id;
    },
}

