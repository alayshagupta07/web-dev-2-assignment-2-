const apiKey = "0cc6836bddf6b63be390c01414e5173d";

const logBox = document.getElementById("logBox");

function log(message){
console.log(message);
logBox.textContent += message + "\n";
}


function searchWeather(){

const city = document.getElementById("cityInput").value;

if(city === ""){
alert("Enter city name");
return;
}

getWeather(city);

saveHistory(city);
}


async function getWeather(city){

log("Sync: Start");
log("Async: Start fetching");

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

log("Promise resolved");

const data = await response.json();

log("Data received");


document.getElementById("city").innerText = data.name;
document.getElementById("temp").innerText = data.main.temp + " °C";
document.getElementById("weather").innerText = data.weather[0].main;
document.getElementById("humidity").innerText = data.main.humidity + " %";
document.getElementById("wind").innerText = data.wind.speed + " m/s";

}
catch(error){

log("Error occurred");

alert("City not found or network error");

}

}


function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities",JSON.stringify(history));
}

loadHistory();
}


function loadHistory(){

const historyDiv = document.getElementById("history");

historyDiv.innerHTML="";

let history = JSON.parse(localStorage.getItem("cities")) || [];

history.forEach(city => {

let btn = document.createElement("button");

btn.innerText = city;

btn.style.margin="3px";

btn.onclick = () => getWeather(city);

historyDiv.appendChild(btn);

});

}


window.onload = function(){

log("Page loaded");

loadHistory();

}