/*Login form validation */
let user = document.getElementById("loggedin");
let loginform = document.getElementById("logindiv");
let loginbtn = document.getElementById("loginbtn");

let unameinput = document.getElementById("uname");
let unamevalue = unameinput.value;

function loginCheck(){
    console.log("Called logincheck");
    if(unamevalue.match(/[A-Za-z0-9.]*\@[a-z]*/)!=null){
        unameinput.style.backgroundColor = "green";
        console.log("success email");
        loginform.style.display ="none";
        bookingform.style.display = "block";
        user.innerHTML = "Logged in user: " + unamevalue;
      }else{
        unameinput.style.backgroundColor = "red";
        console.log("fail email");
      }
}

/*Book form*/
let bookingform = document.getElementById("bookform");
let distanceSlide = document.getElementById("distance");
let distanceOutput = document.getElementById("distanceOutput");
let walkerNamein = document.getElementById("wname");
let walkerNameinValue = walkerNamein.value;
bookingform.style.display = "none";

function nameCheck(){
  console.log("Called nameCheck");
  if(walkerNameinValue.match(/[A-Za-z]*/)!=null){
    walkerNamein.style.backgroundColor = "green";
      console.log("correct name");
    }else{
      walkerNamein.style.backgroundColor = "red";
      console.log("bad name");
    }
}

function slideShowValue(){
  distanceOutput.value = distanceSlide.value;
}
