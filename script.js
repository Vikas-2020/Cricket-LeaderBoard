const leaderboardDiv = document.querySelector(".leaderboard");
const form = document.querySelector("form");

let elements = Array.from(document.forms[0].elements);
elements.pop(); //we have not use of add button
let leaderBoard = [];

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const obj = {
        id : leaderBoard.length,
        fname: elements[0].value,
        lname : elements[1].value,
        country : elements[2].value,
        score : elements[3].value
    };

    leaderBoard.push(obj);
    console.log(leaderBoard);
    //clearing the form
    clearForm();
    //sorting the leaderboard
    sortLeaderBoard();
    //printing the DOM
    printLeaderBoard();
})

function clearForm(){
    elements.forEach((element) => element.value = "");
    elements[0].focus();
}

function sortLeaderBoard(){
    leaderBoard.sort((a,b) => b.score - a.score);
}

function deleteData(IdToDelete){
    leaderBoard = leaderBoard.filter((currentData) =>{
        return currentData.id !== IdToDelete;
    })
    sortLeaderBoard();
    printLeaderBoard();
}

function modifyScore(IdToModify, sign){
    let foundData = leaderBoard.find((current) =>{
        return current.id === IdToModify;
    });

    foundData.score = (sign === "+")?Number(foundData.score) + 5 : Number(foundData.score) -5;
    sortLeaderBoard();
    printLeaderBoard();
}

function printLeaderBoard(){
    leaderboardDiv.innerHTML = "";
    const fragment = document.createDocumentFragment();
    leaderBoard.forEach((obj) =>{
        const parent = document.createElement("div");
        const nameandDate = document.createElement("span");
        const name = document.createElement("p");
        const date = document.createElement("p");
        const country = document.createElement("p");
        const score = document.createElement("p");
        const actions = document.createElement("p");
        const del = document.createElement("span");
        const plus5 = document.createElement("span");
        const minus5 = document.createElement("span");

        parent.classList.add("parent");
        nameandDate.classList.add("name-date");
        actions.classList.add("actions");
        name.innerText = `${obj.fname} ${obj.lname}`;
        country.innerText = `${obj.country}`;
        score.innerText = `${obj.score}`;
        date.innerText = new Date().toLocaleDateString();

        date.style.fontSize = "13px";

        del.classList.add("fa-solid", "fa-trash");
        plus5.innerText = "+5";
        minus5.innerText = "-5";

        del.addEventListener("click", () => deleteData(obj.id));
        plus5.addEventListener("click", () => modifyScore(obj.id, "+"));
        minus5.addEventListener("click", () => modifyScore(obj.id, "-"));
        
        nameandDate.append(name,date);

        actions.append(del, plus5, minus5);
        
        parent.append(nameandDate, country, score, actions);
        fragment.append(parent);
    })
    leaderboardDiv.append(fragment);
}