'use strict';

// GLOBAL VARIABLES

var allBranches = [];
var allBranchSum = 0;
var hourlyTotalsArray = [];
var eachDailyHour = ['6 AM','7 AM','8 AM','9 AM','10 AM','11 AM', '12 AM', '1 PM','2 PM', '3 PM', '4 PM', '5 PM','6 PM','7 PM'];

// FUNCTIONS ===========================================

function createTableHead() {
  var hourRow = document.getElementById('branchSalesData');
  var hourInPlace = document.createElement('th');
  hourInPlace.textContent = '';
  hourRow.appendChild(hourInPlace);
  for (var i = 0; i < eachDailyHour.length; i++) {
    hourInPlace = document.createElement('th');//                   define what fomatting is going there
    hourInPlace.textContent = eachDailyHour[i];//              define what content is going there
    hourRow.appendChild(hourInPlace);//
  }
  hourRow = document.getElementById('branchSalesData'); // where pizza will be delivered to
  hourInPlace = document.createElement('th'); // this is the pizza dough
  hourInPlace.textContent = 'Grand Totals'; // ingredients
  hourRow.appendChild(hourInPlace); // first element is referencing WHERE PIZZA GOES
}

SalmonBranch.prototype.cookiesBaked = function() {
  for (var i = 0; i < this.openDailyHours; i++) {
    var customersPerHour =  Math.floor(Math.random() * (Math.floor(this.maxCustomer)-Math.ceil(this.minCustomer) + 1)) + Math.ceil(this.minCustomer); // above code snippet for random number inclusive from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var hourlyCookies = this.averageCookiesSold * customersPerHour; // how many cookies are bought.
    this.cookiesPurchasedTotal += hourlyCookies; // how many cookies purchased in total.
    this.recordedCustomerSales.push(Math.floor(hourlyCookies));
  } // .push method web snippet https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
};

SalmonBranch.prototype.branchTotalSummed = function() {
  for (var i = 0; i< this.recordedCustomerSales.length; i++){
    this.dailyBranchSum += this.recordedCustomerSales[i];
  }
  return this.dailyBranchSum;
}; //  above code from https://www.quora.com/How-do-I-sum-the-numbers-in-my-array-in-JavaScript

SalmonBranch.prototype.dataToRow = function(){
// target
  var storeTable = document.getElementById('branchSalesData');
  var newTableRow = document.createElement('tr');
  var newTableHeader = document.createElement('td');
  newTableHeader.textContent = this.branchLocation;
  newTableRow.appendChild(newTableHeader);
  for (var i = 0; i < this.recordedCustomerSales.length; i++) {
    var saleDataElement = document.createElement('td');//                   define what fomatting is going there
    saleDataElement.textContent = this.recordedCustomerSales[i];//              define what content is going there
    newTableRow.appendChild(saleDataElement);//                      send it APPEND it!
  }
  storeTable.appendChild(newTableRow);
  saleDataElement = document.createElement('td');
  saleDataElement.textContent = this.dailyBranchSum;
  newTableRow.appendChild(saleDataElement);
};

function renderAllData () {
  for ( var ii = 0; ii < allBranches.length; ii++) {
    allBranches[ii].cookiesBaked();
    allBranches[ii].branchTotalSummed();
    allBranches[ii].dataToRow();
  }
}

function branchTally (){
  var hourlyTotal = 0;
  for (var i = 0; i < eachDailyHour.length; i++) {
    hourlyTotal = 0;
    for (var j = 0; j < allBranches.length; j++) {
      hourlyTotal += allBranches[j].recordedCustomerSales[i];
    }
    hourlyTotalsArray.push(hourlyTotal);
  }
}

function allBranchHoursSummed () {
  if (allBranchSum !== 0) {
    var table = document.getElementById('branchSalesData');
    table.deleteRow(allBranches.length-1);
  } else {
    // just passing through for the first loop
  }
  allBranchSum = 0;
  for (var i = 0; i < hourlyTotalsArray.length; i++){
    allBranchSum += hourlyTotalsArray[i];
  }
}

function printTotals(){
  var table = document.getElementById('branchSalesData'); // where we're going to deliver pizzas
  var totalRow = document.createElement('tr'); // this is what the pizza goes into for delivery
  var totalHeader = document.createElement('td'); // this is the pizza
  totalHeader.textContent = 'Totals: '; //
  totalRow.appendChild(totalHeader);
  for (var i = 0; i < hourlyTotalsArray.length; i++) {
    var totalBranchElement = document.createElement('td');
    totalBranchElement.textContent = hourlyTotalsArray[i];
    totalRow.appendChild(totalBranchElement);
  }
  totalBranchElement = document.createElement('td');
  totalBranchElement.textContent = allBranchSum;
  totalRow.appendChild(totalBranchElement);
  table.appendChild(totalRow);
}

// ================= The Objects ========================

function SalmonBranch(branchLocation, minCustomer, maxCustomer, averageCookiesSold, openingTime, closingTime) {
  this.branchLocation = branchLocation;

  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.cookiesPurchasedTotal = 0; // At the start of the day, no cookies have been purchased.
  this.averageCookiesSold = averageCookiesSold;
  this.openingTime = openingTime; // in 24 hour time
  this.closingTime = closingTime; // in 24 hour time
  this.dailyBranchSum = 0;
  this.recordedCustomerSales = [];
  this.openDailyHours = this.closingTime - this.openingTime;
  allBranches.push(this);
}

// ========= CODE TO RUN ========================

var tokyoBranch = new SalmonBranch('Tokyo', 3, 24, 1.2, 6, 20);
var dubaiBranch = new SalmonBranch('Dubai', 11, 38, 3.7, 6, 20);
var parisBranch = new SalmonBranch('Paris', 20, 38, 2.3, 6, 20);
var limaBranch = new SalmonBranch('Lima', 2, 16, 4.6, 6, 20);
var seattleBranch = new SalmonBranch('Seattle', 23, 65, 6.3, 6, 20);

createTableHead();

renderAllData();
branchTally();
allBranchHoursSummed();
printTotals();

var branchInput = document.getElementById('branchInput');
branchInput.addEventListener('submit', toTablefromEntry);
function toTablefromEntry(clickEntry){
  clickEntry.preventDefault(); // only applicable to forms

  var nameEntered = clickEntry.target.branchName.value;
  var minCustomerEntered = clickEntry.target.minCustomerInput.value;
  var maxCustomerEntered = clickEntry.target.maxCustomerInput.value;
  var averageCookiesEntered = clickEntry.target.averageCookiesInput.value;
  var openingTimeEntered = clickEntry.target.timeOpening.value;
  var closingTimeEntered = clickEntry.target.timeClosed.value;

  var newBranch = new SalmonBranch(nameEntered,minCustomerEntered,maxCustomerEntered,averageCookiesEntered, openingTimeEntered,closingTimeEntered);

  newBranch.cookiesBaked();
  newBranch.branchTotalSummed();
  newBranch.dataToRow();

  console.log(allBranches);

  for (var i = 0; i < hourlyTotalsArray.length; i++) {
    // var latestBranch = allBranches.length - 1; // a reminder. all this code only runs once. then when there's the next event, it becomes newBranch.
    hourlyTotalsArray[i] += newBranch.recordedCustomerSales[i];
  }

  allBranchHoursSummed();
  printTotals();

}
