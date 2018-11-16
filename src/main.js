/*Login*/
let loginform = document.getElementById("logindiv");
let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", check_email);

let user = document.getElementById("loggedin");

function check_stored_user(){
  if(localStorage.getItem('user') != null){
    loginform.style.display = "none";
    bookingform.style.display = "block";
  }
  else{
    console.log("user not loged in before");
  }
}

function check_email() {
  let unameinput = document.getElementById("uname");
  let unamevalue = unameinput.value;
  let error = document.getElementById('error');

  if (unamevalue.match(/[A-Za-z0-9.]+@/) != null) {
    loginform.style.display = "none";
    bookingform.style.display = "block";
    user.innerHTML = "Logged in user: " + remove_char_from_string(unamevalue, '@');
    store_logedin_user(unamevalue);
    Bookings(unamevalue);
  } else {
    unameinput.style.borderColor = "red";
    error.innerHTML = 'You did not send a valid email, please check and try again :)';
  }
}

function store_logedin_user(activeUser) {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("user", activeUser);
    console.log("web storage: ",localStorage.getItem('user'));
  } else {
    alert("Web storage is not supported by your browser! Login will not be saved");
  }
}

/*Logout */
let logoutBtn = document.getElementById('logoutbtn');



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

function Bookwalker() {
  let bookedWalker = document.getElementById('walkerName').value;
  let bookedWalkers = document.getElementById("bookedWalkers");

  bookedWalkers.innerHTML += "<li>" + bookedWalker + "</li>";
}

let distanceSlide = document.getElementById("distance");
let distanceOutput = document.getElementById("distanceOutput");
function slideShowValue(){
  distanceOutput.value = distanceSlide.value;
}

function remove_char_from_string(text, character) {
  text = text.replace(character, '');
  return text;
}

