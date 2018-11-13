/*Form validation */
let loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", loginCheck)

let unameinput = document.getElementById("uname");
let unamevalue = unameinput.value;

let pswdinput = document.getElementById("pswd");
let pswdvalue = pswdinput.value;

let regpat = "/[A-Za-z]*\@[a-z]*/";


function loginCheck(){
    console.log("Called logincheck");
    if(unamevalue.match(regpat)!=null){
        unameinput.style.backgroundColor = "#cfa";
        console.log("failed");
      }else{
        unameinput.style.backgroundColor = "#f57";
        console.log("succes");
      }
}

