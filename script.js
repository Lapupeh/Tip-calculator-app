'use strict';

const card = document.querySelector('.bill__calculator--container')
const allTipButtons = document.querySelectorAll('.tip__button');
const resetBtn = document.querySelector('.reset');
const billValue = document.getElementById('bill__input');
const customTipInput = document.getElementById('custom__tip');
const numberOfPeople = document.getElementById('people__input');
const tipAmount = document.querySelector('.total-tip');
const totalAmount = document.querySelector('.total-amount');
const errorMessage = document.querySelector('.error');

// Initialize tip value
let tipValue = 0

//function to handle tip button clicks
function handleTipClick(e) {
  tipValue = parseFloat(e.target.textContent);
  e.target.classList.add('active');
}

// Attach the event listener to all tip buttons 
allTipButtons.forEach((button) => {
  button.addEventListener('click', handleTipClick);
  
});

// Validate input for people
function validatePeopleInput() {
  let numPeople = Number(numberOfPeople.value.trim());
  
  if(numPeople === 0 || numberOfPeople.value === "") {
    errorMessage.textContent = "Can't be zero";
    errorMessage.classList.add('error');
    numberOfPeople.classList.add('active');
    return false;
  }
  else {
    errorMessage.textContent = "";
    errorMessage.classList.remove('error');
    numberOfPeople.classList.remove('active');
    return true;
  }
}


const calculateTip = function(){
  let tip = 0;
  let bill = parseFloat(billValue.value);
  let customTipValue = parseFloat(customTipInput.value);
  let peopleNum = parseFloat(numberOfPeople.value);
  
  customTipValue ? tip = customTipValue : tip = tipValue;
  
  if(!validatePeopleInput()) return;
  
  let tipAmountPerPerson = ((bill * tip) / 100) / peopleNum;
  let totalAmountPerPerson = (bill / peopleNum) + tipAmountPerPerson;
  
  if(isNaN(tipAmountPerPerson) || isNaN(totalAmountPerPerson)) return;
  else {
    tipAmount.textContent = parseFloat(tipAmountPerPerson.toFixed(2));
    totalAmount.textContent = parseFloat(totalAmountPerPerson.toFixed(2));
  }
  
};


card.addEventListener('input', () => {
  setTimeout(calculateTip, 500)
});


// Attach event listener to reset

const resetCalc = () => {
  billValue.value = '';
  customTipInput.value = '';
  numberOfPeople.value = '';
  tipAmount.textContent = '0.00';
  totalAmount.textContent = '0.00';

  allTipButtons.forEach((button) => {
    button.classList.remove('active');
  });
}
resetBtn.addEventListener('click', resetCalc);
