function myFunction() {
    let x = document.getElementById("myTopnav");
    if (x.className === "navbar-lists") {
        x.className += " responsive";
    } else {
        x.className = "navbar-lists";
    }
}
const scrollLinks = document.querySelectorAll('.navbar-link');
scrollLinks.forEach(link => {
    link.addEventListener('click',
         function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
            const targetElement = 
                  document.getElementById(targetId
                            .substring(1));
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error(`Element with id 
                            '${targetId.substring(1)}' 
                             not found.`);
            }
        } else {
            console.error('No href attribute found.');
        }
    });
});

$( document ).ready(function() {
    $("#reg-container").hide();
    $("#reg-link").click(function(){
        $("#reg-container").show();
        $("#login-container").hide();
    })

    $("#login-link").click(function(){
        $("#login-container").show();
        $("#reg-container").hide();
    })

    //tuk da se izvikat ajax zaqvki kum service-i, koito zapisvat v bazata danni xoxo

    // Handle user registration
    $("#regForm").submit(function(e) {
        e.preventDefault();  // Prevent default form submission

        // Collect the form data
        const fullName = $("#fullName").val();
        const email = $("#regEmail").val();
        const phone = $("#phone").val();
        const password = $("#regPassword").val();

        // Send the registration data to the backend using AJAX
        $.ajax({
            url: 'http://localhost:3000/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ fullName, email, phone, password }),
            success: function(response) {
                alert("Registration successful!");
                $("#reg-container").hide();
                $("#login-container").show();
            },
            error: function(xhr, status, error) {
                alert("Registration failed: " + xhr.responseJSON.error);
            }
        });
    });

    // Handle user login
    $("#logForm").submit(function(e) {
        e.preventDefault();  // Prevent default form submission

        // Collect the login form data
        const email = $("#logEmail").val();
        const password = $("#logPassword").val();

        console.log(email+" email \n");
        console.log(password);

        // Send the login data to the backend using AJAX
        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(response) {
                alert("Login successful!");
                console.log("JWT Token:", response.token);
                // Store the token in localStorage or sessionStorage
                localStorage.setItem("authToken", response.token);
            },
            error: function(xhr, status, error) {
                alert("Login failed: " + xhr.responseJSON.error);
            }
        });
    });
});
