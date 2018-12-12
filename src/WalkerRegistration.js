//console.log("walker reg script loaded!");
//console.log("Script can read:", USERNAME, "From mainjs");
let WalkDistance;
let RegBtn = document.getElementById("regbtn");
let BackBtn = document.getElementById("backbtn");

BackBtn.addEventListener("click", function () {
    content_handler("userpage");
});


RegBtn.addEventListener('click', function () {
    let location = document.getElementById('town').value;
    let cost = document.getElementById('cost').value;
    let TypeOfWalker = $("input[name='walkertype']:checked").val();

    console.log(TypeOfWalker, location, cost, WalkDistance);

    register_form_validation(location, TypeOfWalker, cost, WalkDistance);
});


let RegPageBtn = document.getElementById('regpage');
RegPageBtn.addEventListener('click', function () {
    content_handler('profile');
});

document.getElementById("slider").oninput = function () {
    slideShowValue()
};

function slideShowValue() {
    WalkDistance = document.getElementById('slider').value;
    document.getElementById("slidevalue").innerHTML = WalkDistance;
}

function register_form_validation(location, cost, ) {
    if (UserName == "" || Fname == "" || Lname == "" || Adress == "" || Cellphone == "" || Email == "") {
        status_msg("there are empty fields, all information need to be sent to make an account!");
    }
    else if (sign_up_validation(UserName, Fname, Lname, Adress, Cellphone, Email)) {
        add_new_customer_to_db(UserName, Fname, Lname, Adress, Cellphone, Email);
    }
}

/*Register logedin user as a walker */
function register_as_walker(location, TypeOfWalker, cost, size) {
    //console.log("trying to register");

    $.ajax({
        type: 'POST',
        url: 'src/API/booking/makeresource_XML.php',
        data: {
            ID: encodeURIComponent(USERNAME),
            name: encodeURIComponent(USERNAME),
            type: encodeURIComponent('walkbook'),
            company: encodeURIComponent(TypeOfWalker),
            location: encodeURIComponent(location),
            category: encodeURIComponent(TypeOfWalker),
            cost: encodeURIComponent(cost),
            size: encodeURIComponent(size)
        },
        success: registered_as_resource,
        error: registered_as_resource_error
    });
}

function registered_as_resource(returnedData) {
    status_msg("You are now registered as a walker!");
}

function registered_as_resource_error() {
    status_msg("Something went wrong, try again!");
}