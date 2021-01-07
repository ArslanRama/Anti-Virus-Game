// get html elements
const container = document.querySelector("#container");
const injection = document.querySelector("#injection");
const pointsDiv = document.querySelector("#pointsDiv");


// add mousemove event listener to control the injection position.
container.addEventListener("mousemove", (e) => {
  injection.style.left = (e.clientX -12.5) + "px";
});

// create an array to save corona objects
const coronaArr = []

setInterval(()=>{
  //get container width
  let containerWidth = container.offsetWidth;
  // create coorona div element
  const coronaDiv = document.createElement('div');
  // set class for corona div
  coronaDiv.classList.add('corona')
  // set the left position for the div randomly
  let coronaLeft = Math.floor(Math.random()* containerWidth) + 1;
  coronaDiv.style.left=coronaLeft+'px'

  // add corona div to container
  container.append(coronaDiv)

  // create corona object
  let coronaObj ={
    coronaElement: coronaDiv,
    top:0,
    left:coronaLeft
  }
  // add the coronaObj to coronaArr
  coronaArr.push(coronaObj)

}, 1000)

// create interval to move coronaDivs down by increasing the top property on the style
setInterval(()=>{

  // get height of the container
  let containerHeight = container.offsetHeight
  
  // loop through coronaArr to change the tip of coronaElements
  coronaArr.forEach((element, index)=>{
    // check the top of corona div is greater than the container's height so we need to delete the coronaDiv and coronaElement
    if(element.top > containerHeight){
      // delete coronaElement from html DOM
      container.removeChild(element.coronaElement);
      // delete the element from the array
      coronaArr.splice(index, 1);
    } else {
      element.top += 10;
      element.coronaElement.style.top = element.top + 'px';
    }
   
  })

}, 50)

// create clik event listener for the container to create the bullet
container.addEventListener("click", e => {
  // create bullet html element
  const bulletDiv = document.createElement('div');
  // set class to bullet div
  bulletDiv.classList.add('bullet');
  // set left position to the bulletDiv
  bulletDiv.style.left = e.clientX + 'px';
  // add bulletDiv to the container
  container.append(bulletDiv);
  // create set interval to make the bullets move up
  

  
});


