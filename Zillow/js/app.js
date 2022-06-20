//=====================Util functions===================================
function GoHome(){
    location.href = "/html/index.html";
}
//=====================End Util functions===============================

//=====================login check======================================
//Get the email, password values
const loginEmail = localStorage.getItem("email");
const loginPassword = localStorage.getItem("password");

//Check the data is maching with DB information.
const confirmEmail = "abc@gmail.com";
const confirmPassword = "12341234";
const signIn = document.querySelector(".signIn");
const logout = document.querySelector(".logout");
if(sessionStorage.getItem("email") === confirmEmail){//has session
    signIn.classList.add("hidden");
    
    alert(`Hi, ${sessionStorage.getItem("email")}!`);

}else if(loginEmail === confirmEmail && loginPassword === confirmPassword){//login sucess
    //Give Session, role
    signIn.classList.add("hidden");
    sessionStorage.setItem("email", confirmEmail);
    localStorage.clear();

    alert("Login success");
}else if(loginEmail){//login failure
    logout.classList.add("hidden");
    alert("Wrong information plz check your email and password!");
    localStorage.clear();
}else{//common approach
    logout.classList.add("hidden");
}

logout.addEventListener("click", function Logout(){
    sessionStorage.clear();
    GoHome();
    alert("Logout!");
});
//=====================End Login Check======================================

//=====================CSS Effects==========================================
//querySelector only brings the first one from the matching tags.
//querySelectorAll brings every matching tags.
//Event: click, resize, copy, offline, online
const logo_img = document.querySelector(".topMenuSection div :first-child");
logo_img.addEventListener("click", GoHome);

const main_articles = document.querySelectorAll(".choosingWrapper article");
for(let i=0;i<main_articles.length;i++){
    main_articles[i].addEventListener("mouseenter", function enterLeave(){
        main_articles[i].classList.add("article_big");//Simplifier the code.
    });
    main_articles[i].addEventListener("mouseleave", function enterLeave(){
        main_articles[i].classList.remove("article_big");//Simplifier the code.
    });
}
//=====================End CSS Effects=======================================

//=====================Login Popup===========================================
const loginPopupWidth = screen.width/3.0;
const loginPopupStartX = (screen.width/2.0 - loginPopupWidth/2.0);
const options = "left = "+loginPopupStartX+", width = "+loginPopupWidth+", height = "+screen.height+", location = no";
const closeBtn = document.querySelector(".close");

function openLoginPopup(){
    document.querySelector(".loginPopup").classList.toggle("popup");
    document.body.classList.toggle("fixedScreen");
    document.querySelector(".signInMenu").classList.add("selectedMenu");
}
signIn.addEventListener("click", openLoginPopup);
closeBtn.addEventListener("click", openLoginPopup);
//=====================End Login Popup=======================================


//=====================Login Submit==========================================
const loginForm = document.querySelector("#loginForm");
const pwdInput = document.querySelector(".passwordInput");

function CheckValidation(event){
    if(event)
        event.preventDefault(); // prevent the event(submit here).
    const email = document.querySelector(".emailInput").value;
    const pwd = pwdInput.value;

    if(email.length < 8){
        alert("The email address is too short");
    }else if(pwd.length < 8){
        alert("The password is too short");
    }else{
        localStorage.setItem("email", email);
        localStorage.setItem("password", pwd);
        GoHome();
    }
}

loginForm.addEventListener("submit", CheckValidation);
//=====================End Login Submit=======================================