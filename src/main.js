/*GLOBAL HTML REFERENCE VARIABLES */
let unameinput = document.getElementById("uname");
let loginbtn = document.getElementById("loginbtn");
let BookBtn = document.getElementById('Bookbtn');
let distanceSlide = document.getElementById("distance");
let distanceOutput = document.getElementById("distanceOutput");
let panel = document.getElementById('panel');
let UserIcon = document.getElementById('usr');
let SearchBtn = document.getElementById('searchbtn');

$("#datefrom").datepicker({
  dateFormat: "yy-mm-dd",
  minDate : 0,
});
$("#dateto").datepicker({
  dateFormat: "yy-mm-dd",
  minDate : 0,
});
/*
 * GLOBAL VARIABLES:
 * USERNAME - hold the account name of a user that exists in the database
 * unamevalue - holds the inputed username from login input
 */
let USERNAME = '';
let unamevalue = '';


/*Adding event liisteners */
loginbtn.addEventListener("click", get_user_from_db);
UserIcon.addEventListener("mouseover", Show_panel);
UserIcon.addEventListener("mouseout", Hide_panel);
SearchBtn.addEventListener('click', search_resource_in_db);
BookBtn.addEventListener('click',BookWalker);

/*Error handeling */
function status_msg(err, jqXHR, textStatus, errorThrown) {
  let errorElem = document.getElementById('error');
  //unameinput.style.borderColor = "red";
  errorElem.innerHTML = err;
  //console.log(jqXHR);
  //status_msg("Please fill out form");
  //alert("AJAX Error:\n"+errorThrown);
}

/*
Content handler - for switching between different content on webpage by hiding/showing div-elements 
Parameters:
-type: string
-content: html id of content to show
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

/*Checks if user is stored in localstorage, 
will automaticly login user if user exists in storage 
*/
function check_stored_user() {
  if (localStorage.getItem('user') != null) {
    content_handler('userpage');
    active_user(localStorage.getItem('user'));
    USERNAME = localStorage.getItem('user');
    get_resources_booked_by_customer();
  }
  else {
    content_handler('logindiv');
    //console.log("no user logged in");
  }
}

/*Stores loged in user in localstorage */
function store_logedin_user(activeUser) {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("user", activeUser);
    //console.log("web storage: ", localStorage.getItem('user'));
  } else {
    status_msg("Web storage is not supported by your browser! Login will not be saved");
  }
}

/*Logout and remove user from localstorage*/
function logout() {
  localStorage.removeItem('user');
  content_handler('logindiv');
}

/*Function for showin a welcome message for active user */
function active_user(activeUser) {
  let welcomemsg = 'Welcome back! ' + activeUser;
  let WelcomeElem = document.getElementById('welcomemsg');
  let ActiveUser = document.getElementById('activeuser');
  ActiveUser.innerHTML = "logedin user: " + activeUser;
  WelcomeElem.innerHTML = welcomemsg;
}


//Function to be able to book a walker
function BookWalker() {
  let WalkerName = document.getElementById('walkerName');
  let WalkDistance = document.getElementById('distance').value;

    let datefrom = $("#datefrom").datepicker("getDate");
    let dateto = $("#dateto").datepicker("getDate");

    let goodDate = check_date(dateto,datefrom);
    //console.log("gooddate: ", goodDate);


  let choice_one = document.getElementById('c1');
  let choice_one_value;
  let choice_two = document.getElementById('c2');
  let choice_two_value;
  let choice_three = document.getElementById('c3');
  let choice_three_value;
  let Choice;
  //let Choice;

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


 if(goodDate && Choice != null){
  book_resource(dateto,datefrom,Choice);
  BookBtn.style.color = "green";
 }

}

function check_date(dateto,datefrom){
  if(datefrom != null || dateto != null){
    if(datefrom > dateto){
      console.log("this is not ok");
      return false;
    }else{
      console.log('datefrom', datefrom);
      console.log('dateto', dateto);
      return true;
    }
  }else{
    console.log("please enter value");
    return false;
  }
}

function slideShowValue() {
  distanceOutput.value = distanceSlide.value;
}

/*Function for removing characters from string */
/*
function remove_char_from_string(text, character) {
  text = text.replace(character, '');
  return text;
}*/


panel.style.display = 'none';

function Show_panel() {
  //console.log("hovering");
  let y_pos = 35;
  panel.style.display = 'block';
  panel.style.top = y_pos + 'px';
}

function Hide_panel() {
  //console.log("Not hovering");
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

/*Signup new user */
/**
 * TODO: Fix validation
 */
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
    status_msg("First name was not input correctly");
  }
  if (Fname.match(/[A-Öa-ö]/) != null) {
    console.log("fname ok:", Fname);
  } else {
    status_msg("First name was not input correctly");
  }
  if (Lname.match(/[A-Öa-ö]/) != null) {
    console.log("lname ok:", Lname);
  } else {
    status_msg("Last name was not input correctly");
  }
  if (Adress.match(/[A-Öa-Ö]+\s+\d.+\d.+[A-Öa-ö]/) != null) {
    console.log("Adress ok:", Adress);
  } else {
    status_msg("Not a valid adress");
  }
  if (Cellphone.match(/[0-9]+.*/) != null) {
    console.log("Cellphone ok:", Cellphone);
  } else {
    status_msg("Not a correct cellphone number");
  }
  if (Email.indexOf("@") == -1) {
    status_msg("Missing @");
  } else {
    console.log("Email ok", Email)
  }

  add_new_customer_to_db(UserName, Fname, Lname, Adress, Cellphone, Email);
}

/*Inserts new user to DB if all fields was successfully validated */
function add_new_customer_to_db(username, fname, lname, adress, cellphone, email) {
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
    success: customer_added_to_db,
    error: status_msg
  });
}

/*Login*/
function get_user_from_db() {
  unamevalue = unameinput.value;
  if (unamevalue.match(/[A-Öa-ö]/) != null) {
    $.ajax({
      type: 'POST',
      url: 'src/API/booking/getcustomer_XML.php',
      data: {
        customerID: encodeURIComponent(unamevalue),
      },
      success: returned_user_from_db,
      error: status_msg
    });
  } else {
    status_msg("User with that name does not exist or no user inputed");
  }
}


/*Book resource*/
function book_resource(dateto,datefrom,choice) {
  let custID = USERNAME;
  console.log(dateto,datefrom,choice,custID);
  
  $.ajax({
    type: 'POST',
    url: 'src/API/booking/makebooking_XML.php',
    data: {
      resourceID: encodeURIComponent(choice),
      date: encodeURIComponent(dateto),
      dateto: encodeURIComponent(datefrom),
      customerID: encodeURIComponent(custID)
    },
    success: book_resource_success,
    error: status_msg
  });
}


/*Book resource*/
function get_resources_booked_by_customer() {
  let applikation = 'walkbook';
  let customer = USERNAME;
  
  $.ajax({
    type: 'POST',
    url: 'src/API/booking/getcustomerbookings_XML.php',
    data: {
      type: applikation,
      customerID: customer,
    },
    success: booked_resources_by_user,
    error: status_msg
  });
}



/*Search for resource in db */
function search_resource_in_db() {
  let SearchWalker = document.getElementById('SearchWalker').value;

  let resType = 'walkbook';

  if (SearchWalker.match(/[A-Öa-ö]/) != null) {
  $.ajax({
    type: 'POST',
    url: 'src/API/booking/getresources_XML.php',
    data: { //resID : encodeURIComponent(resID),
      //name: encodeURIComponent(searchvalue),
      //location:  encodeURIComponent(reslocation),
      company: encodeURIComponent(SearchWalker),
      //fulltext: encodeURIComponent(resfulltext),
      type: encodeURIComponent(resType)
    },
    success: returned_resources_from_db,
    error: status_msg
  });
  } else {
    status_msg("Not valid input");
  }
}


/*AJAX SUCCESS FUNCTIONS */
/*returns ok if a new user was insetrted to DB correctly, add message to show taht customer was added correctly */
function customer_added_to_db() {
  status_msg("User successfully added!");
  //console.log('signed up!');
  //console.log(returnedData);
}


function book_resource_success(returnedData) {
  status_msg("Booked resource");
 console.log("Booked: ",returnedData);
}

/*Returns and prints all bookings made by loggedin user */
function booked_resources_by_user(returnedData){
  let bookedgByUser = document.getElementById("cart");
  var resultset = returnedData.childNodes[0];
  for (let i = 0; i < resultset.childNodes.length; i++) {
    var bokings = resultset.childNodes.item(i);
    if (bokings.nodeName == "booking") {
      var booked = resultset.childNodes.item(i);
      bookedgByUser.innerHTML += "<li>" + booked.attributes['company'].nodeValue  + "</li>";
    }
  }
}

/*Loop returned data for userid and login user if user exist in database*/
function returned_user_from_db(returnedData) {
  var resultset = returnedData.childNodes[0];
  for (let i = 0; i < resultset.childNodes.length; i++) {
    var customer = resultset.childNodes.item(i);
    if (customer.nodeName === "customer") {
      USERNAME = customer.attributes['id'].nodeValue;
      console.log(USERNAME);
      if (USERNAME === unamevalue) {
        //console.log('username: ', USERNAME);
        store_logedin_user(unamevalue);
        active_user(unamevalue);
        content_handler('userpage');
      }
    }
  }
}

/*Loop through returned resources retrieved from DB and calls funktion to list them on page */
function returned_resources_from_db(returnedData) {
  var resultset = returnedData.childNodes[0];
  for (i = 0; i < resultset.childNodes.length; i++) {
    if (resultset.childNodes.item(i).nodeName == "resource") {
      var resource = resultset.childNodes.item(i);
      list_resource_from_db(resource);
    } else{
      console.log("No resource found");
    }
  }
}

function list_resource_from_db(resource){
  let SearchResList = document.getElementById('SearchResList');
  
  SearchResList.innerHTML += "<li>" + resource.attributes['name'].nodeValue +
  " walks with:" + resource.attributes['company'].nodeValue + "</li>";
}