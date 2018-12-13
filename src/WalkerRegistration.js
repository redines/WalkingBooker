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
    if (TypeOfWalker == "pkmngo" && cost.match(/[0-9]+.*/) != null && WalkDistance.match(/[0-9]+.*/) != null && location.match(/[A-Öa-ö]/) != null) {
        register_as_walker(location, TypeOfWalker, cost, WalkDistance);
    } else if (TypeOfWalker == "friend" && cost.match(/[0-9]+.*/) != null && WalkDistance.match(/[0-9]+.*/) != null && location.match(/[A-Öa-ö]/) != null) {
        register_as_walker(location, TypeOfWalker, cost, WalkDistance);
    } else if (TypeOfWalker == "dog" && cost.match(/[0-9]+.*/) != null && WalkDistance.match(/[0-9]+.*/) != null && location.match(/[A-Öa-ö]/) != null) {
        register_as_walker(location, TypeOfWalker, cost, WalkDistance);
    } else {
        console.log(TypeOfWalker, location, cost, WalkDistance);
        status_msg("something went wrong, try refresh and refilling the form");
    }
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
    status_msg("Something went wrong or you are already registered!");
}