const clockElement = document.querySelector("#clock");
const dateElement = document.querySelector("#date");
const currentDate = new Date();

let currentMin = 0;
let currentSec = 0;
let month = currentDate.getMonth()+1;
let date = currentDate.getDate();
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
let min = currentDate.getMinutes();
let sec = currentDate.getSeconds();

function tictac(){

    sec++;
    if(sec >= 60){
        sec = 0;
        min++;
        if(min >= 60){
            min = 0;
            hour++;
            if(hour >= 24){
                date++;
                hour = 0;
            }
        }
    }
    dateElement.innerText = `${month}/${date}/${year}`;
    clock.innerText = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function formatIntoTwoDigits(number){
    if(number < 10)
        return `0${number}`;
    return number;
}// PadStart function instead

function getDate(){
    const today = new Date();
    const month = currentDate.getMonth()+1;
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();

    return `${month}/${date}/${year}`;
}

//PadStart(2, "0") -> change it into 2 digit String and add the "0" on the front.
//PadEnd(2, "0") -> add the "0" on the back.
function getTime(){
    const today = new Date();
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const min = currentDate.getMinutes().toString().padStart(2, "0");
    const sec = currentDate.getSeconds().toString().padStart(2, "0");

    return `${hour}:${min}:${sec}`;
}

setInterval(tictac, 1000);
//setTimeout