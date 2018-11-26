/**
 * TODO:
 * Add error handeling with smarter error codes
 * add keypress event
 * */


/**
 * GLOBAL VARIABLES:
 *  USERNAME - hold the account name of a user that exists in the database
 */

 let USERNAME = ''


/*Error handeling */
function errors(err) {
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
function content_handler(content) {
  let loginform = document.getElementById("logindiv");
  let UserPage = document.getElementById("userpage");
  let LogOutBtn = document.getElementById("logoutBtn");
  let Usr = document.getElementById("usr");
  //console.log('content: ', content);

  LogOutBtn.addEventListener('click', logout);

  if (content === 'logindiv') {
    loginform.style.display = "block";
    UserPage.style.display = "none";
    LogOutBtn.style.display = 'none';
    Usr.style.display = "none";

  } else if (content === 'userpage') {
    document.getElementById('signUpdiv').style.display = 'none';
    loginform.style.display = "none";
    UserPage.style.display = "block";
    LogOutBtn.style.display = 'block';
    Usr.style.display = "block";
  }
}

/*Login*/

let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", check_creds);

function check_stored_user() {
  if (localStorage.getItem('user') != null) {
    content_handler('userpage');
    active_user(localStorage.getItem('user'));
  }
  else {
    content_handler('logindiv');
    //console.log("no user logged in");
  }
}

function check_creds() {
  let unameinput = document.getElementById("uname");
  let unamevalue = unameinput.value;

  if (unamevalue.match(/[A-Öa-ö]/) != null) {
    get_user(unamevalue);
    console.log("db: ",USERNAME, "form: ", unamevalue);
    if(USERNAME === unamevalue){
      console.log('username: ',USERNAME);
    }
    //store_logedin_user(unamevalue);
    //active_user(unamevalue);
    //content_handler('userpage');
  } else {
    errors("Username is wrongly inputed");
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
function active_user(activeUser) {
  let ActiveUser = document.getElementById('activeuser');
  ActiveUser.innerHTML = "logedin user: " + activeUser;
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
  let Choice;

  if (choice_one.checked) {
    choice_one_value = choice_one.value;
    console.log("choice: ", choice_one_value);
    Choice = choice_one_value;
  } else if (choice_two.checked) {
    choice_two_value = choice_two.value;
    console.log("choice: ", choice_two_value);
    Choice = choice_two_value;
  } else if (choice_three.checked) {
    choice_three_value = choice_three.value;
    console.log("choice: ", choice_three_value);
    Choice = choice_three_value;
  }

  cart.innerHTML += "<li>" + WalkerName.value + " walk with:" + Choice + " for:" + WalkDistance + "km" + "</li>";
  error.innerHTML = '';
  BookWalker.style.borderBottomColor = "green";

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

let panel = document.getElementById('panel');
panel.style.display = 'none';
let UserIcon = document.getElementById('usr');
UserIcon.addEventListener("mouseover", Show_panel);
UserIcon.addEventListener("mouseout", Hide_panel);


function Show_panel() {
  console.log("hovering");
  let y_pos = 40;
  panel.style.display = 'block';
  panel.style.top = y_pos + 'px';
}

function Hide_panel() {
  console.log("Not hovering");
  panel.style.display = 'none';
}

/*JQUERY*/

/*Sign up*/
$('#signUpdiv').hide();

$("#signUpBtn").click(function (e) {
  $('#signUpdiv').show(1000);
});

$("#cancel").click(function (e) {
  $('#signUpdiv').hide(1000);
});

$("#bday").keyup(function (e) {
  let EnterKey = e.which;
  if (EnterKey === 13) {
    sign_up_validation();
  }
});

$("#signup").click(function (e) {
  sign_up_validation();
});


$("#bday").datepicker();

function sign_up_validation() {
  let Fname = $('#fname').val();
  let Lname = $('#lname').val();
  let Adress = $('#adress').val();
  let Cellphone = $('#cellphonenr').val();
  let Email = $('#email').val();
  let UserName = $('#usrname').val();


  if (UserName.match(/[A-Öa-ö]/) != null) {
    console.log("username ok:", UserName);
  } else {
    errors("First name was not input correctly");
  }
  if (Fname.match(/[A-Öa-ö]/) != null) {
    console.log("fname ok:", Fname);
  } else {
    errors("First name was not input correctly");
  }
  if (Lname.match(/[A-Öa-ö]/) != null) {
    console.log("lname ok:", Lname);
  } else {
    errors("Last name was not input correctly");
  }
  if (Adress.match(/[A-Öa-Ö]+\s+\d.+\d.+[A-Öa-ö]/) != null) {
    console.log("Adress ok:", Adress);
  } else {
    errors("Not a valid adress");
  }
  if (Cellphone.match(/[0-9]+.*/) != null) {
    console.log("Cellphone ok:", Cellphone);
  } else {
    errors("Not a correct cellphone number");
  }
  if (Email.indexOf("@") == -1) {
    errors("Missing @");
  } else {
    console.log("Email ok", Email)
  }

  add_new_customer(UserName, Fname, Lname, Adress, Cellphone, Email);
}

function add_new_customer(username, fname, lname, adress, cellphone, email) {
  $.ajax({
    type: 'POST',
    url: 'src/API/booking/makecustomer_XML.php',
    data: {
      ID: encodeURIComponent(username),
      firstname: encodeURIComponent(fname),
      lastname: encodeURIComponent(lname),
      email: encodeURIComponent(email),
      address: encodeURIComponent(adress),
      auxdata: encodeURIComponent(cellphone)
    },
    success: customer_added
  });
}

function customer_added(returnedData){

}

function get_user(uname) {
  $.ajax({
    type: 'POST',
    url: 'src/API/booking/getcustomer_XML.php',
    data: {
      customerID: encodeURIComponent(uname),
    },
    success: returned_user
  });
}

function returned_user(returnedData) {
  var resultset = returnedData.childNodes[0];
  for (let i = 0; i < resultset.childNodes.length; i++) {
    var customer = resultset.childNodes.item(i);
    if (customer.nodeName === "customer") {
      USERNAME = customer.attributes['id'].nodeValue;
      //console.log(USERNAME);
    }
  }
}