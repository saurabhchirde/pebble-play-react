const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LOGIN_ENDPOINT = `${BASE_URL}/api/auth/login`;
export const SIGNUP_ENDPOINT = `${BASE_URL}/api/auth/signup`;

export const PLAYLISTS_ENDPOINT = `${BASE_URL}/api/user/playlists`;

export const WATCH_LATER_ENDPOINT = `${BASE_URL}/api/user/watchlater`;
export const LIKES_ENDPOINT = `${BASE_URL}/api/user/likes`;
export const LIKE_VIDEO_ENDPOINT = `${BASE_URL}/api/user/like`;

export const VIDEOS_ENDPOINT = `${BASE_URL}/api/videos`;
export const SINGLE_VIDEO_ENDPOINT = `${BASE_URL}/api/video`;
export const CATEGORIES_ENDPOINT = `${BASE_URL}/api/categories`;
export const HISTORY_ENDPOINT = `${BASE_URL}/api/user/history`;
