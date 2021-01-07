// get html elements
const container = document.querySelector("#container");
const injection = document.querySelector("#injection");
const pointsDiv = document.querySelector("#pointsDiv");

// add mousemove event listener to control the injection position.

container.addEventListener("mousemove", (e) => {
  injection.style.left = (e.clientX -12.5) + "px";
});

setInterval(()=>{

}, 500)