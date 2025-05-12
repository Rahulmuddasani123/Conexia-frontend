// utils/isTokenExpired.js
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // decode payload
    const exp = decoded.exp; // expiration time in seconds
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

    return exp < currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return true;
  }
};
