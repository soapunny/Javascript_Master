

const signInFrame = document.querySelector("#signInFrame");
const mainFrame = document.querySelector('#mainFrame');
const signInForm = document.querySelector("#signInForm");
const signIn = document.querySelector(".signIn");
const inputTags = signIn.querySelectorAll("input");
const weatherTag = mainFrame.querySelector("#weather");
const backgroundList = ["backgroundImage1","backgroundImage2","backgroundImage3"];
const SESSION_KEY = "userInfo";
const userInfo = {
    EMAIL: "abc@gmail.com",
    PASSWORD: "1234",
    USER_NAME: "Soap"
}
let todoList = [];
const TODO_KEY = "todoList";

function round(num, decimalPlace){
    const divisor = Math.pow(10, decimalPlace);
    return Math.round((num+Number.EPSILON) * divisor) / divisor;
}

function getRandom(start, end){
    return Math.floor(Math.random()*(end-start)) + start;
}

function toggleSignInMainFrame(targetFrame){
    if(targetFrame === signInFrame){
        signInFrame.classList.add("signInFrame");
        signInFrame.classList.remove("hidden");
        mainFrame.classList.add('hidden');
        mainFrame.classList.remove('mainFrame');

    }else if(targetFrame === mainFrame){
        signInFrame.classList.add("hidden");
        signInFrame.classList.remove("signInFrame");
        mainFrame.classList.add('mainFrame');
        mainFrame.classList.remove('hidden');
    }
}

function displayWeatherInfo(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const API_KEY = "4da30c7aaa9b293a0d2949b4b05b12e4";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

    const displayWeather = fetch(url).then(request => request.json()).then(data => {
        const temperature = `${round(data.main['temp_min'], 1)}'F / ${round(data.main['temp_max'], 1)}'F`;
        const location = `${data.name}, ${data.sys.country}`;
        const iconcode = data.weather[0].icon;
        const iconSrc = "http://openweathermap.org/img/w/" + iconcode + ".png";
        
        console.log(iconSrc);
        const imgTag = document.createElement('img');
        imgTag.setAttribute('src', iconSrc);
        document.querySelector('#weatherIcon').appendChild(imgTag);
        weatherTag.innerText = `${temperature} ${location}`;
    });

}

function getWeatherInfo(){
    navigator.geolocation.getCurrentPosition(displayWeatherInfo, ()=>{
        alert("Allow your location!");
    });
}

function loadTodoList(){
    //load todo
    const rawTodo = localStorage.getItem(TODO_KEY);
    const parsedTodo = JSON.parse(rawTodo);
    for(let i=0;i<parsedTodo.length;i++){
        todoList.push(parsedTodo[i]);
        createTodoItem(parsedTodo[i]);
    }
}

function clearTodoListTag(){
    while(todoListTag.hasChildNodes){
        todoListTag.removeChild(todoListTag.firstChild);
    }
}

function greetUser(){
    const sessionInfo = sessionStorage.getItem(SESSION_KEY);
    const parsedSessionInfo = JSON.parse(sessionInfo);
    const greeting = document.querySelector("#greeting");
    greeting.innerText = `Hi, ${parsedSessionInfo.USER_NAME}! Check your TODO list.`;
    greeting.classList.add("title");
}

//===========================Login Frame===================================


document.body.classList.add(backgroundList[getRandom(0, 3)]);

signIn.classList.add("borderAll");
signIn.querySelector(" :first-child").classList.add("borderBottom");
signIn.querySelector(" :nth-child(4)").classList.add("borderBottom");

for(let i=0;i<inputTags.length;i++){
    inputTags[i].classList.add("borderAll");
}

window.addEventListener("load", (event) =>{
    event.preventDefault();
    const sessionInfo = sessionStorage.getItem(SESSION_KEY);
    if(!sessionInfo) return;

    toggleSignInMainFrame(mainFrame);
    greetUser();
    getWeatherInfo();

    //TODO list
    loadTodoList();
});

signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = signIn.querySelector(" :last-child .comment");
    comment.innerText = "";

    if(inputTags[0].value === userInfo.EMAIL && inputTags[1].value === userInfo.PASSWORD){
        alert("login success");
        toggleSignInMainFrame(mainFrame);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(userInfo));
        greetUser();
        //TODO list
        loadTodoList();
    }else{
        comment.innerText = "wrong account info!";
    }
});

//========================End Login Frame===================================


//==========================Main Frame=====================================
const signOut = document.querySelector('#signOut');
const todoForm = document.querySelector('#todoForm');
const todoInput = todoForm.querySelector('#todoInput');
const todoListTag = document.querySelector('#todoList');

signOut.addEventListener('click', (event)=>{
    event.preventDefault();
    toggleSignInMainFrame(signInFrame);
    sessionStorage.clear();
    todoList = [];
    clearTodoListTag();
});

function deleteListItemFromStorage(key){
    todoList = todoList.filter((todoDto) => {
        return todoDto.key !== key;
    });
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
}

function createTodoItem(newTodoDto){
    const li = document.createElement('li');
    const deleteTag = document.createElement('a');
    deleteTag.classList.add('deleteTag');
    deleteTag.classList.add('hidden');
    deleteTag.innerText = "X";

    li.addEventListener("mouseenter", (event) => {
        deleteTag.classList.remove('hidden');
    });
    li.addEventListener("mouseleave", (event) => {
        deleteTag.classList.add('hidden');
    });
    deleteTag.addEventListener("click", (event) =>{
        todoListTag.removeChild(li);
        deleteListItemFromStorage(newTodoDto.key);
    });
    li.innerText = `-${newTodoDto.value}`;
    todoListTag.appendChild(li);
    li.appendChild(deleteTag);
}

todoForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const newTodoDto = {
        key: Date.now(),
        value: todoInput.value
    }

    createTodoItem(newTodoDto);
    todoInput.value = "";
    todoList.push(newTodoDto);
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
    
})


//========================End Main Frame===================================