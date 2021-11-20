// imports
import {floors, elevators, render} from "./main.js";

import randomId from "./util/randomId.js";

// elements
const $form = document.querySelector('.form');
const $game = document.querySelector('.game');
const $floorsInput = $form.querySelector('#floors');
const $elevatorsInput = $form.querySelector('#elevators');

// validation
let submitted = false;

const validateFloors = (value = +$floorsInput.value) => value > 0 && value <= 100;
const validateElevators = (value = +$elevatorsInput.value) => value > 0 && value <= 10;

// listeners
$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const floorsCount = +$floorsInput.value;
  const elevatorsCount = +$elevatorsInput.value;

  const floorsIsValid = validateFloors();
  const elevatorsIsValid = validateElevators();

  submitted = true;

  if(!floorsIsValid || !elevatorsIsValid) {
    if(!floorsIsValid) {
      $floorsInput.classList.add('invalid');
      $floorsInput.nextElementSibling.innerHTML = 'No more 100';
    }
    
    if(!elevatorsIsValid) {
      $elevatorsInput.classList.add('invalid');
      $elevatorsInput.nextElementSibling.innerHTML = 'No more 10';
    }

    return false;
  }

  if(floorsIsValid && elevatorsIsValid) {
    console.log('a');
    for(let i = 0; i < floorsCount; i++) {
      floors.push(i);
    }
  
    for(let i = 0; i < elevatorsCount; i++) {
      elevators.push({id: randomId(), moving: false, floor: 0});
    }
  
    $form.classList.add('hide');
    $game.classList.add('open');
    
    render();
  }
});

[
  {input: $floorsInput, validator: validateFloors, max: 100},
  {input: $elevatorsInput, validator: validateElevators, max: 10}
].forEach(({input, validator, max}) => {
  input.addEventListener('input', ({target: {value}}) => {
    validateInputsAfterSubmit(input, () => validator(+value), max);
  });
});

// functions
function validateInputsAfterSubmit(input, validator, max) {
  if(submitted) {
    if(validator()) {
      input.classList.remove('invalid');
      input.nextElementSibling.innerHTML = '';
    } else {
      input.classList.add('invalid');
      input.nextElementSibling.innerHTML = `No more ${max}`;
    }
  }
}