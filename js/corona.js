// get html elements
const container = document.querySelector("#container");
const injection = document.querySelector("#injection");
const pointsDiv = document.querySelector("#pointsDiv");


// add mousemove event listener to control the injection position.
container.addEventListener("mousemove", (e) => {
  injection.style.left = (e.clientX -12.5) + "px";
});

// create an array to save corona objects
const coronaArr = [];

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

      // call explode function to detect if the bulletDiv touch the coronaDiv

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

  // set the start bottom for the bulletDiv
  let bottom = 100;

  // get container height
  let containerHeight = container.offsetHeight;
  // create set interval to make the bullets move up
  const interval = setInterval(()=>{
    // check the bullet is outside the container so we need to delete the bullet div and kill the interval. 
    if (bottom > containerHeight) {
    clearInterval(interval);
    container.removeChild(bulletDiv);
  } else {
    bottom += 25;
    bulletDiv.style.bottom = bottom + 'px';
    // call explode function to detect if bulletDiv touches a coronaDiv
    explode(bulletDiv, interval);
  }
  },50)

})

// explode function to detect if bulletDiv touch a coronaDiv
function explode(bulletElement, interval){
  // loop through coronaArr
  coronaArr.forEach((corona, index)=>{
    // check if coronaElement is in the same area as bulletElement
    if(is_colliding(bulletElement, corona.coronaElement)){
      clearInterval(interval);
      container.removeChild(bulletElement);
      coronaArr.splice(index, 1);
      container.removeChild(corona.coronaElement);
    } 
     
  })
}

let is_colliding = function( $div1, $div2 ) {
  // Div 1 data
  //var d1_offset             = $div1.offset();
  let d1_height             = $div1.offsetHeight;
  var d1_width              = $div1.offsetWidth;
  let d1_distance_from_top  = $div1.offsettop + d1_height;
  let d1_distance_from_left = $div1.offsetLeft + d1_width;
  // Div 2 data
  //var d2_offset             = $div2.offset();
  let d2_height             = $div2.offsetHeight;
  let d2_width              = $div2.offsetWidth;
  let d2_distance_from_top  = $div2.offsetTop + d2_height;
  let d2_distance_from_left = $div2.offsetLeft + d2_width;
  let not_colliding = ( d1_distance_from_top < $div2.offsetTop || $div1.offsetTop > d2_distance_from_top || d1_distance_from_left < $div2.offsetLeft || $div1.offsetLeft > d2_distance_from_left );
  // Return whether it IS colliding
  return ! not_colliding;
};