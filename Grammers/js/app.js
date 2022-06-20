const greeting = "Hi! "; //constant
const issue = "There is an issue in line : ";
const dayList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let yourName = "Soap"; //variable

yourName = prompt("What is your name");
alert(greeting + yourName);
console.log(issue+5);

//list
dayList.push("Sun");
dayList.push("Mon");
dayList.pop();
document.write(addBr(dayList));
document.write(addBr(dayList[0]));
console.log(dayList);

//function
function addBr(str){
    return str + "<br>";
};


//object
const player = {
    name: "Soap",
    age: 28,
    points: 5,
    earnPoint(){
        this.points += 5;
        console.log("Current Points : "+this.points);
    }
};
player.lastName = "So";
player.earnPoint();
player.earnPoint();

console.log(addBr(player.lastName));

const calculator = {
    add: function(num1, num2){
        return num1 + num2;
    },
    minus: function(num1, num2){
        return num1 - num2
    },
    mutiply: function(num1, num2){
        return num1 * num2;
    },
    divide: function(num1, num2){
        return num1 / num2;
    }
};

console.log(calculator.add(1, 2));
console.log(calculator.minus(1, 2));
console.log(calculator.mutiply(1, 2));
console.log(calculator.divide(1, 2));


//conditionals
let age = 0;
while(true){
    age = prompt("How old are you?");
    age = parseInt(age);
    if(isNaN(age))
        alert("Type number instead!");
    else
        break;
}
console.log("age : "+age+", the type of age is : " + typeof age);
if(age < 21){
    alert("You are too young to drink!");
}else{
    alert("You can drink!");
}

age = "21";

// == only compares the value
if(age == "21"){
    alert("The value of variable \"age\" is "+ age);
}

// === compares type and value
if(age === 21){
    alert("Variable age is number type and the value is "+ age);
}


/*Data type
    undefined
    null
    boolean(false/true)
    integer(1, 100, ...)
    float(1.2, 50.35, ...)
    string("Hi", 'Hello')
    array(["mon", "tue", "wed"])
*/
