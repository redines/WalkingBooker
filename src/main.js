/**
 * TODO:
 * Function som hanterar att visa/inte visa "pages"
 * Do form validation with Jquery for booking form
 * */

/*Error handeling */
let error = document.getElementById('error');

/*Login*/
let loginform = document.getElementById("logindiv");
let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", check_email);


let user = document.getElementById("loggedin");

function check_stored_user() {
  if (localStorage.getItem('user') != null) {
    loginform.style.display = "none";
    bookingform.style.display = "block";
    bookings.style.display = 'block';
  }
  else {
    console.log("user not loged in before");
  }
}
/*Sign up*/
let SignUpBtn = document.getElementById('signup');
document.getElementById('signUpPage').style.display = 'none';
SignUpBtn.addEventListener('click',sign_up);
function sign_up(){
document.getElementById('signUpPage').style.display = 'block';
}

function check_email() {
  let unameinput = document.getElementById("uname");
  let unamevalue = unameinput.value;

  if (unamevalue.match(/[A-Za-z0-9.]+@/) != null) {
    loginform.style.display = "none";
    bookingform.style.display = "block";
    user.innerHTML = "Logged in user: " + remove_char_from_string(unamevalue, '@');
    store_logedin_user(unamevalue);
    Bookings(unamevalue);
    error.innerHTML = '';
  } else {
    unameinput.style.borderColor = "red";
    error.innerHTML = 'You did not send a valid email, please check and try again :)';
  }
}

function store_logedin_user(activeUser) {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("user", activeUser);
    console.log("web storage: ", localStorage.getItem('user'));
  } else {
    alert("Web storage is not supported by your browser! Login will not be saved");
  }
}

/*Logout */
let logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', logout);

function logout() {
  loginform.style.display = "block";
  bookingform.style.display = "none";
  localStorage.removeItem('user');
}

/*Booked walkers list */
let bookings = document.getElementById("bookings");
bookings.style.display = 'none';



function Bookings(activeUser) {
  let welcomeMsg = document.getElementById('welcomemsg');
  welcomeMsg.innerHTML = "Welcome " + remove_char_from_string(activeUser, '@');
  bookings.style.display = 'block';
}

/*Book form*/
let bookingform = document.getElementById("bookform");
bookingform.style.display = "none";


let BookWalker = document.getElementById('Book');
BookWalker.addEventListener('click', Bookwalker);

//Function to be able to book a walker
function Bookwalker() {
  let WalkerName = document.getElementById('walkerName').value;
  let WalkDistance = document.getElementById('distance').value;
  let choice_one = document.getElementById('c1');
  let choice_one_value;
  let choice_two = document.getElementById('c2');
  let choice_two_value;
  let choice_three = document.getElementById('c3');
  let choice_three_value;
  let cart = document.getElementById("cart");

  if (choice_one.checked) {
    choice_one_value = choice_one.value;
    console.log("choice: ", choice_one_value);
  } else if (choice_two.checked) {
    choice_two_value = choice_two.value;
    console.log("choice: ", choice_two_value);
  } else if (choice_three.checked) {
    choice_three_value = choice_three.value;
    console.log("choice: ", choice_three_value);
  }

  if (WalkerName.value != '' && WalkDistance != '' && choice_one_value != '' || choice_two_value != '' || choice_three_value != '') {
    cart.innerHTML += "<li>" + WalkerName.value + "</li>";
    error.innerHTML = '';
    BookWalker.style.borderBottomColor = "green";
  } else {
    //console.log(bookedWalker.value);
    BookWalker.style.borderColor = "red";
    error.innerHTML = 'You did not enter correct information to book a walker';
  }
}

/*Distance slider */
let distanceSlide = document.getElementById("distance");
let distanceOutput = document.getElementById("distanceOutput");

function slideShowValue() {
  distanceOutput.value = distanceSlide.value;
}

/*Function for removing characters from string */
function remove_char_from_string(text, character) {
  text = text.replace(character, '');
  return text;
}
