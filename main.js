$(document).ready(function() {
    $('#submit').on('click', function(e) {
        e.preventDefault();
        let isValid = true;

        $('.error-container').empty();
        $('input').css('border-color', 'rgb(183, 179, 179)');

        if (!$('#firstName').val().trim()) {
            $('#firstName').siblings('.error-container').css('display', 'block').text('First name is required');
            $('#firstName').css('border-color', 'red');
            isValid = false;
        }

        if (!$('#lastName').val().trim()) {
            $('#lastName').siblings('.error-container').css('display', 'block').text('Last name is required');
            $('#lastName').css('border-color', 'red');
            isValid = false;
        }

        if (!$('#username').val().trim()) {
            $('#username').next('.error-container').css('display', 'block').text('Username is required');
            $('#username').css('border-color', 'red');
            isValid = false;
        }

        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            $('#email').next('.error-container').css('display', 'block').text('Email is required');
            $('#email').css('border-color', 'red');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#email').next('.error-container').css('display', 'block').text('Please enter a valid email');
            $('#email').css('border-color', 'red');
            isValid = false;
        }

        const password = $('#password').val();
        if (!password) {
            $('#password').next('.error-container').css('display', 'block').text('Password is required');
            $('#password').css('border-color', 'red');
            isValid = false;
        } else if (password.length < 8) {
            $('#password').next('.error-container').css('display', 'block').text('Password must be at least 8 characters');
            $('#password').css('border-color', 'red');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                username: $('#username').val(),
                email: $('#email').val(),
                phone: $('#telephone').val(),
                password: $('#password').val(),
                bio: $('#bio').val()
            };


            const popup = $('<div>', {
                class: 'popup-overlay',
                css: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }
            });

            const popupContent = $('<div>', {
                class: 'popup-content',
                css: {
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    maxWidth: '500px',
                    width: '90%'
                }
            });

            const closeButton = $('<button>', {
                text: '×',
                css: {
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    border: 'none',
                    background: 'none',
                    fontSize: '20px',
                    cursor: 'pointer'
                },
                click: function() {
                    popup.remove();
                }
            });

            const content = $('<div>').append(
                $('<h2>', { text: 'Form Submitted Successfully!', css: { marginBottom: '15px' } }),
                $('<p>', { text: `First Name: ${formData.firstName}` }),
                $('<p>', { text: `Last Name: ${formData.lastName}` }),
                $('<p>', { text: `Username: ${formData.username}` }),
                $('<p>', { text: `Email: ${formData.email}` }),
                $('<p>', { text: `Phone: ${formData.phone}` }),
                $('<p>', { text: `Password: ${formData.password}`}),
                $('<p>', { text: `Bio: ${formData.bio}` })
            );

            popupContent.append(closeButton, content);
            popup.append(popupContent);
            $('body').append(popup);

            // Close popup when clicking outside
            popup.click(function(e) {
                if (e.target === this) {
                    popup.remove();
                }
            });
            $('#firstName').val('')
            $('#lastName').val('')
            $('#username').val('')
            $('#email').val('')
            $('#telephone').val('')
            $('#password').val('')
            $('#bio').val('')
        }

    });

    // Clear errors on focus
    $('input').focus(function() {
        $(this).css('border-color', 'rgb(183, 179, 179)');
        $(this).siblings('.error-container').empty();
    });
});