/*Form validation */
let loginform = document.getElementById("logindiv");
let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", loginCheck)

let unameinput = document.getElementById("uname");
let unamevalue = unameinput.value;

/*Book form*/
let user = document.getElementById("loggedin");
let bookingform = document.getElementById("bookform");
bookingform.style.display = "none";


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

