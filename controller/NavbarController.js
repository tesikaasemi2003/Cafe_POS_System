// ------------------------ Show Logged-In User in Top Bar -------------------------
const loadNavbarUser = (username) => {
    const initials = username.substring(0, 2).toUpperCase();
    $('#tb-avatar').text(initials);
    $('#tb-uname').text(username);
};