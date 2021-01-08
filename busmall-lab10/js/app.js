'use strict';

// =========== GLOBAL VARIABLES

var ctx = document.getElementById('myChart').getContext('2d');
var totalClicks = 0;
var maxClicks = 25; // would like to have made this dynamic
var maxPhotosOnScreen = 3; // would like to have made this dynamic
var jsonProductsRetrieved = localStorage.getItem('storedProducts'); //loading up the file from local storage by the name of 'storedProducts'.
var productObjectsfromJson = JSON.parse(jsonProductsRetrieved); // properly turning them into objects (but not objects)
Product.all = [];

var onScreenRandoms = []; // used for staging photos to screen


// =========== FUNCTIONS

function Product (caption, productPhoto) {
  this.caption = caption;
  this.productPhoto = productPhoto;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
  Product.all.push(this);
}

function labelsForChart(){ // simple array creator chart.js
  var productLabels = [];
  for(var i = 0; i < Product.all.length; i++) {
    productLabels.push(Product.all[i].caption);
  }
  return productLabels;
}

function clicksForChart(){ // simple array creator for chart.js
  var productClicks = [];
  for(var i = 0; i < Product.all.length; i++) {
    productClicks.push(Product.all[i].timesClicked);
  }
  return productClicks;
}

function onScreenCount(){ // to track how many times a single photo showed up on screen
  var onScreenClicks = [];
  for(var i = 0; i < Product.all.length; i++) {
    onScreenClicks.push(Product.all[i].timesDisplayed);
  }
  return onScreenClicks;
}

function pickRandom() { //random number picker
  var min = 0; //unnnecesary, but left in for mind jogging, can be made dynamic at a later time.
  var max = Product.all.length;
  var randomProductSelection = Math.floor(Math.random() * (max - min) + min);
  return randomProductSelection;
}

function randomProductArrayCreation(){ //getting photos queued up for screen.
  var previousOnScreen = onScreenRandoms; // previousOnScreen gets the photos from the last onscreen array
  var prepForScreen = []; // staging array, always fresh every time
  for (var i = 0; i < maxPhotosOnScreen; i++){
    var forScreen = pickRandom(); // finding a random number...
    while (forScreen === onScreenRandoms[0] || // a hardcoded mess of checks, and if any return as equal, it finds a new number.
    forScreen === previousOnScreen[1] ||
    forScreen === previousOnScreen[2] ||
    forScreen === prepForScreen[0] ||
    forScreen === prepForScreen[1]) {
      forScreen = pickRandom();
    }
    prepForScreen.push(forScreen); //after being checked against the above, the random # for screen is pushed into the prepforSreen array.
  }
  onScreenRandoms = prepForScreen; // onScreenRandoms takes the array from prepForScreen.
}


function productsToPage(){

  randomProductArrayCreation(); // it was my goal to make this all dynamic, but the randomizer kills that goal.

  var randomProductOne = onScreenRandoms[0]; // each pull from the array, grab that index
  var randomProductTwo = onScreenRandoms[1];
  var randomProductThree = onScreenRandoms[2];
  // }

  var initLeftImg = document.getElementById('imgOneSource'); //find the the respective targets
  var initLeftCap = document.getElementById('imgOneTitle');

  var initMidImg = document.getElementById('imgTwoSource');
  var initMidCap = document.getElementById('imgTwoTitle');

  var initRightImg = document.getElementById('imgThreeSource');
  var initRightCap = document.getElementById('imgThreeTitle');

  initLeftImg.src = Product.all[randomProductOne].productPhoto; // follows the array to the product and grabs the img from src
  initLeftCap.textContent = Product.all[randomProductOne].caption; // grabs caption
  Product.all[randomProductOne].timesDisplayed++; // ticks up the time the photo was displayed regardless of being chosen.

  initMidImg.src = Product.all[randomProductTwo].productPhoto;
  initMidCap.textContent = Product.all[randomProductTwo].caption;
  Product.all[randomProductTwo].timesDisplayed++;

  initRightImg.src = Product.all[randomProductThree].productPhoto;
  initRightCap.textContent = Product.all[randomProductThree].caption;
  Product.all[randomProductThree].timesDisplayed++;
}

// =========== CODE

// really wish I could've just made this all dynamic.

new Product('bag','img/bag.jpg');
new Product('pen','img/pen.jpg');
new Product('dragon','img/dragon.jpg');
new Product('banana','img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots','img/boots.jpg');
new Product('breakfast','img/breakfast.jpg');
new Product('bubblegum','img/bubblegum.jpg');
new Product('chair','img/chair.jpg');
new Product('cthulhu','img/cthulhu.jpg');
new Product('dog-duck','img/dog-duck.jpg');
new Product('pet-sweep','img/pet-sweep.jpg');
new Product('Scissors','img/scissors.jpg');
new Product('shark','img/shark.jpg');
new Product('sweep','img/sweep.png');
new Product('tauntaun','img/tauntaun.jpg');
new Product('unicorn','img/unicorn.jpg');
new Product('usb','img/usb.gif');
new Product('water-can','img/water-can.jpg');
new Product('wine-glass','img/wine-glass.jpg');

if (productObjectsfromJson !== null) { // checking if local storage has results already
  Product.all = productObjectsfromJson;
}

productsToPage(); //renders the page

var photoToClick = document.getElementById('selectorBox'); // finds the target

photoToClick.addEventListener('click', whenProductClicked); //adds an event listener, a click.

function whenProductClicked(){ // then "when it's clicked"...
  if(event.target.tagName === 'IMG'){
    totalClicks++;
    if(totalClicks === maxClicks){
      photoToClick.removeEventListener('click',whenProductClicked);
      whenMaxClicksReached(); // a whole other subroutine below.
    }
  } else { // when you don't click an element with the tagname of IMG.
    alert('pick an image');
  }
  var targetPhoto = event.target.getAttribute('src');
  for (var i = 0; i < Product.all.length; i++) {
    if (Product.all[i].productPhoto === targetPhoto) {
      Product.all[i].timesClicked++;
    }
  }
  productsToPage();

}
// TODO: Find all pieces of chart that is referenced and plug it in.
// TODO: replace the labels
// replace the data


function whenMaxClicksReached(){ //when clicks equals max clicks in this case.
  var removePhotos = document.getElementById('selectorBox');
  removePhotos.remove();

  var productstoString = JSON.stringify(Product.all); // at the end of the clicks, loads the array of Products.all into a stringified JSON.
  localStorage.setItem('storedProducts',productstoString);
  console.log(localStorage);

  var theResultsHeader = document.getElementById('results'); //creating a space for a header, these 4 lines
  var resultsHeaderLocation = document.createElement('h3');
  resultsHeaderLocation.textContent = 'Here are your results';
  theResultsHeader.appendChild(resultsHeaderLocation);

  var itemResults = document.getElementById('clickResults'); // giving a by item rundown of times clicked and times on screen.
  for (var ii = 0; ii < Product.all.length; ii++){
    var eachItemResults = document.createElement('p');
    eachItemResults.textContent = 'The ' + Product.all[ii].caption + ' received ' + Product.all[ii].timesClicked + ' clicks out of ' + Product.all[ii].timesDisplayed + ' times displayed.';
    itemResults.appendChild(eachItemResults);

    var myChart = new Chart(ctx, { // a chart showing the results in chart form.
      type: 'bar',
      data: {
        labels: labelsForChart(),
        datasets: [{
          label: 'Times Clicked',
          data: clicksForChart(),
          backgroundColor: //[
            'rgba(155, 199, 132, 1)'
          ,
          borderColor:
            'rgba(255, 99, 132, 1)'
          ,
          borderWidth: 1
        },
        {
          label: 'Time Onscreen',
          data: onScreenCount(),
          backgroundColor:
            'rgba(1, 200, 200, 0.2)',
          borderColor:
            'rgba(1, 200, 200, 1)',
          borderWidth: 1
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
