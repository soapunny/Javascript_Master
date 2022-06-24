const quotes = [
{
    quote: "직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다.",
    author: "엘버트 허버드"
},
{
    quote: "성공의 비결은 단 한 가지, 잘할 수 있는 일에 광적으로 집중하는 것이다.",
    author: "톰 모나건"
},
{
    quote: "평생 살 것처럼 꿈을 꾸어라. 그리고 내일 죽을 것처럼 오늘을 살아라.",
    author: "제임스 딘"
},
{
    quote: "인생에 뜻을 세우는데 있어 늦은 때라곤 없다.",
    author: "볼드윈"
},
{
    quote: "작은 기회로 부터 종종 위대한 업적이 시작된다.",
    author: "데모스테네스"
}
];
//Math: random()/ceil()/round()/floor()
const quote = document.querySelectorAll("#quote span");
const randomIndex = Math.floor(Math.random() * quotes.length);

quote[0].innerText = quotes[randomIndex]['quote'];
quote[1].innerText = "-"+quotes[randomIndex]['author'];


//==========================Background img============================
const images = ["background1.jpg", "background2.jpg", "background3.jpg"];
const imgRandomIdx = Math.floor(Math.random()*images.length);

//create an element
const imgElement = document.createElement("img");
imgElement.setAttribute("class", "bgImg");
imgElement.src = "/img/" + images[imgRandomIdx];
imgElement.width = screen.width/2;
//imgElement.height = screen.height;

//add it in the body
document.querySelector("#imageFrame").appendChild(imgElement);

//==========================End Background img========================

//==============================TODO List=============================
const addListForm = document.querySelector("#addListForm");
const listContent = document.querySelector("#listContent");
const todoList = document.querySelector("#todoList");
let todoDatas = [];
const DATA_KEY = "savedList";

function saveData(){
    this.localStorage.setItem(DATA_KEY, JSON.stringify(todoDatas));
    console.log(localStorage);
};

function AddListItem(newTodoObject){
    const listItem = document.createElement("li");
    listItem.innerText = newTodoObject.value;
    listItem.setAttribute("id", "todoListItem");

    const listX = document.createElement("span");
    listX.innerText = " X";
    listX.classList.add("cancelBtn");
    listX.classList.add("hidden");

    listItem.addEventListener("mouseenter", function(event){
        event.preventDefault();
        listX.classList.remove("hidden");
    });
    listItem.addEventListener("mouseleave", function(event){
        event.preventDefault();
        listX.classList.add("hidden");
    });
    listX.addEventListener("click", function(event){
        event.preventDefault();
        todoList.removeChild(listItem);
        deleteData(newTodoObject.id);
    });

    listItem.appendChild(listX);
    todoList.appendChild(listItem);
    listContent.value = "";
    todoDatas.push(newTodoObject);
    
    saveData();
}

function deleteData(id){
    if(todoDatas.length <= 1){
        todoDatas.pop();
        localStorage.clear();
        return;
    }

    todoDatas = todoDatas.filter((element) => {return element.id !== id}); // ********* Make a new list that satisfy the condition.
    saveData();
}

window.addEventListener("load", function(){
    const savedData = localStorage.getItem(DATA_KEY);
    if(!savedData || savedData.length == 0) return;
    
    const parsedData = JSON.parse(savedData);
    parsedData.forEach(element => AddListItem(element) );
    console.log(localStorage);
});

addListForm.addEventListener("submit", function addList(event){
    event.preventDefault();
    const newTodoObject = {
        id: Date.now(),
        value: listContent.value
    }
    AddListItem(newTodoObject);
});
//==============================End TODO List=========================