/**
 * TODO:
 * Function som hanterar att visa/inte visa "pages"
 * Do form validation with Jquery for booking form
 * add keypress event
 * */

/*Error handeling */
function errors(err){
  let errorElem = document.getElementById('error');
  //unameinput.style.borderColor = "red";
  errorElem.innerHTML = err;
}

/*
Content handler - for switching between different content on webpage by hiding/showing div-elements 
Parameters:
-type: string
-content: name of content to show
*/
function content_handler(content){
  let loginform = document.getElementById("logindiv");
  let UserPage = document.getElementById("userpage");
  let LogOutBtn = document.getElementById("logoutBtn");
  //console.log('content: ', content);

  LogOutBtn.addEventListener('click', logout);
  
  if(content === 'logindiv'){
    loginform.style.display = "block";
    UserPage.style.display = "none";
    LogOutBtn.style.display = 'none';
  
  }else if(content === 'userpage'){
  document.getElementById('signUpdiv').style.display = 'none';
  loginform.style.display = "none";
  UserPage.style.display = "block";
  LogOutBtn.style.display = 'block';
  }
}

/*Login*/

let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", check_creds);

function check_stored_user() {
  if (localStorage.getItem('user') != null) {
    content_handler('userpage');
  }
  else {
    content_handler('logindiv');
    console.log("no user logged in");
  }
}

function check_creds() {
  let unameinput = document.getElementById("uname");
  let unamevalue = unameinput.value;

  if (unamevalue.match(/[A-Za-z]/) != null) {
    store_logedin_user(unamevalue);
    welcome_message(unamevalue);
    content_handler('userpage');
  } else {
    errors("Something went wrong! try again");
  }
}

function store_logedin_user(activeUser) {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("user", activeUser);
    //console.log("web storage: ", localStorage.getItem('user'));
  } else {
    errors("Web storage is not supported by your browser! Login will not be saved");
  }
}

/*Logout */
function logout() {

  localStorage.removeItem('user');
  content_handler('logindiv');
}

/*Function for showin a welcome message for active user */
function welcome_message(activeUser) {
  let welcomeMsg = document.getElementById('welcomemsg');
  welcomeMsg.innerHTML = "Welcome " + activeUser;
}

/*Book form*/
let BookWalker = document.getElementById('Book');
BookWalker.addEventListener('click', Bookwalker);

//Function to be able to book a walker
function Bookwalker() {
  let WalkerName = document.getElementById('walkerName');
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

  //if (WalkerName.value != '' && WalkDistance != '' && choice_one_value != '' || choice_two_value != '' || choice_three_value != '') {
    cart.innerHTML += "<li>" + WalkerName.value + "</li>";
    error.innerHTML = '';
    BookWalker.style.borderBottomColor = "green";
  //} else {
    //console.log(bookedWalker.value);
    //BookWalker.style.borderColor = "red";
    //error.innerHTML = 'You did not enter correct information to book a walker';
  //}
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

/*JQUERY*/

/*Sign up*/
$('#signUpdiv').css("display",'none');

$("#signUpBtn").click(function(e) {
  document.getElementById('signUpdiv').style.display = 'block';
});

$("#cancel").click(function(e) {
  $('#signUpdiv').detach();
});

$("#loginbtn").keyup(function(e){
  let EnterKey = e.which;
  if(EnterKey === 13){
  alert("hey!");
  }
});

$("#signup").click(function(e) {
  sign_up_validation();
});

function sign_up_validation(){
  let Fname = $('#fname').val();
  let Lname = $('#lname').val();
  let Adress = $('#adress').val();
  let Cellphone = $('#cellphonenr').val();

  
  if (Fname.match(/[A-Za-z]/) != null) {
    errors("all good");
  } else {
    errors("Form was not completed correctly, try again!");
  }
  if (Lname.match(/[A-Za-z]/) != null) {
    errors("all good");
  } else {
    errors("Form was not completed correctly, try again!");
  }
  if (Adress.match(/[A-Za-z0-9åäö ]/) != null) {
    errors("all good");
  } else {
    errors("adress not good");
  }
  if (Fname.match(/[A-Za-z]/) != null) {
    errors("all good");
  } else {
    errors("Form was not completed correctly, try again!");
  }
}
