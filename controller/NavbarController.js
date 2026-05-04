// ========================= T&T Cafe POS - Navbar Controller =========================

const loadNavbarUser = (username) => {
    const initials = username.substring(0, 2).toUpperCase();
    $('#tb-avatar').text(initials);
    $('#tb-uname').text(username);
    $('#welcome-name').text(username);
};

// Sign Out — bound after DOM ready via index.html module
$(document).on('click', '#btn-signout', function () {
    Swal.fire({
        title: 'Sign Out?',
        text: 'You will be returned to the login screen.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e53e3e',
        cancelButtonColor:  '#3d2212',
        confirmButtonText: 'Yes, sign out'
    }).then(result => {
        if (result.isConfirmed) {
            $('#main-app').css('display', 'none');
            $('#login-page').fadeIn(300);
            $('#lu').val('');
            $('#lp').val('');
        }
    });
});

export { loadNavbarUser };