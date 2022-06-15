var toggleSignUp = true;
function validatePassword(s){
    var small=false, big=false, num=false;
    for(var i=0;i<s.length;i++){
        if(s.charAt(i)>='a' && s.charAt(i)<='z') small=true;
        if(s.charAt(i)>='A' && s.charAt(i)<='Z') big=true;
        if(s.charAt(i)>='0' && s.charAt(i)<='9') num=true;
    }
    return small && big && num;
}

function validate(){
    var userName = document.getElementById("signupUsername");
    var password = document.getElementById("signupPassword");
    var confirmPassword = document.getElementById("signupConfirmPassword");
    if(password.value.length < 8) {
        alert("Password should be minimum 8 characters length");
        return;
    } else if(!validatePassword(password.value)){
        alert("Password should contain atleast one upper, lowercase letter and number");
        return;
    } else if(!password.value.match(confirmPassword.value)){
        alert("Both passwords are not the same");
        return;
    } else {
        sendSignup()
    }
}

function toggle() {
    console.log(toggleSignUp)
    toggleSignUp = !toggleSignUp 
    if(toggleSignUp) document.querySelector(".signup").classList.add("hidden");
    else document.querySelector(".signup").classList.remove("hidden");
}

function sendSignup() {
    var userName = document.getElementById("signupUsername");
    var password = document.getElementById("signupPassword");
    var data = new FormData();
    data.append("username", userName.value)
    data.append("password", password.value)
    console.log(data);
    fetch("/signup",  {
        method: "POST",
        body: data
      })
      .then((result) => {
        if (result.status != 200) { throw new Error("Bad Server Response"); }
        return result.json();
      }).then((res)=>{
            console.log(res);
      })
     
}

function sendLogin() {
    console.log("Login...");
    var userName = document.getElementById("loginUsername");
    var password = document.getElementById("loginPassword");
    console.log(userName.value, password.value);
    var data = new FormData();
    data.append("username", userName.value)
    data.append("password", password.value)
    console.log(data);
    fetch("/login",  {
        method: "POST",
        body: data
      })
      .then((result) => {
        return result.json();
      }).then((res)=>{
            console.log(res.status)
            if(res.status == 404) alert("Invalid Credentials!!!")
            console.log(res);
      })
     
}

function validateAdmin() {
    var username = document.querySelector("#adminUsername").value
    var password = document.querySelector("#adminPassword").value
    console.log(username, password);
    if(username !== "admin" || password !== "Admin123")
        alert("Invalid Credentials!!!")
    else window.location = window.location.origin + "/admin"
}

document.querySelector(".adminLoginBtn").addEventListener("click", (e)=> {
    e.target.classList.add("hidden");
    document.querySelector(".adminLogin").classList.remove("hidden");
})

document.querySelector(".userLoginBtn").addEventListener("click", (e)=> {
    e.target.classList.add("hidden");
    document.querySelector(".userLogin").classList.remove("hidden");
})