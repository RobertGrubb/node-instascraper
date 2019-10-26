const fetch = require('isomorphic-fetch')

// Setup defualt headers for requests
const defaultHeaders = {
    'x-ig-capabilities': '3w==',
    'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
    host: 'i.instagram.com'
}

// Get the headers
const getHeaders = (headers, sessionid, userid) => {
    return Object.assign(headers, {
        cookie: `sessionid=${sessionid}; ds_user_id=${userid}`
    })
}

const generateError = (code, message) => {
    return {
        error: code,
        message: message
    };
}

// Grab a user by their username
exports.getUserByUsername = username => (
    fetch(`https://www.instagram.com/${username}/?__a=1`)
        .then((res) => {
            return res.json().then((data) => {
                if (!data.graphql) {
                    return generateError(404, 'User not found');
                }

                if (!data.graphql.user) {
                    return generateError(404, 'User not found');
                }

                return data.graphql.user;
            })
        })
)

// Get user info by id
exports.getUserById = ({
    id,
    sessionid,
    userid,
    headers = defaultHeaders
}) => (
    fetch(`https://i.instagram.com/api/v1/users/${id}/info/`, {
        headers: getHeaders(headers, sessionid, userid)
    })
    .then(res => res.json())
)

// Get media by its code
exports.getMediaByCode = code => (
    fetch(`https://www.instagram.com/p/${code}/?__a=1`)
        .then(res => res.json())
)

// Get storys for a user
exports.getMediaComments = ({
    id,
    sessionid,
    userid,
    headers = defaultHeaders
}) => (
    fetch(`https://i.instagram.com/api/v1/media/${id}/comments/`, {
        headers: getHeaders(headers, sessionid, userid)
    })
        .then(res => res.json())
)

// Get storys for a user
exports.getStories = ({
    id,
    sessionid,
    userid,
    headers = defaultHeaders
}) => (
    fetch(`https://i.instagram.com/api/v1/feed/user/${id}/reel_media/`, {
        headers: getHeaders(headers, sessionid, userid)
    })
        .then(res => res.json())
)

// Get a story feed for a user.
exports.getStoriesFeed = ({
    sessionid,
    userid,
    headers = defaultHeaders
}) => (
    fetch(`https://i.instagram.com/api/v1/feed/reels_tray/`, {
        headers: getHeaders(headers, sessionid, userid)
    })
    .then(res => res.json())
)
