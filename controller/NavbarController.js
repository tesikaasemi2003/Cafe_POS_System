// ========================= T&T Cafe POS - Navbar Controller =========================
// Handles: top bar branding, user display, sign-out

// ------------------------ Show Logged-In User in Top Bar -------------------------
const loadNavbarUser = (username) => {
    const initials = username.substring(0, 2).toUpperCase();
    $('#tb-avatar').text(initials);
    $('#tb-uname').text(username);
};

// ------------------------ Sign Out Handler ----------------------------------------
$('#btn-signout').on('click', function () {
    Swal.fire({
        title: 'Sign Out?',
        text: 'You will be returned to the login screen.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e53e3e',
        cancelButtonColor: '#3d2212',
        confirmButtonText: 'Yes, sign out'
    }).then(result => {
        if (result.isConfirmed) {
            $('#main-app').css('display', 'none');
            $('#login-page').css('display', 'flex');
            $('#lu').val('');
            $('#lp').val('');
        }
    });
});

export { loadNavbarUser };
