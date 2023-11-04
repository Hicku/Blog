const isCurrentUser = function (currentUserId, profileUserId) {
    return currentUserId === profileUserId;
};

module.exports = { isCurrentUser } 