// imports
import {floors, elevators, render} from "./main.js";

import randomId from "./util/randomId.js";

// elements
const $form = document.querySelector('.form');
const $game = document.querySelector('.game');
const $floorsSelect = $form.querySelector('#floors');
const $elevatorsSelect = $form.querySelector('#elevators');

// form selects render
for(let i = 1; i <= 20; i++) {
  $floorsSelect.innerHTML += `<option value="${i}">${i}</option>`;
}

for(let i = 1; i <= 6; i++) {
  $elevatorsSelect.innerHTML += `<option value="${i}">${i}</option>`;
}

// validation
let submitted = false;

// listeners
$form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(!$floorsSelect.value || !$elevatorsSelect.value) {
    submitted = true;
    if(!$floorsSelect.value) {
      $floorsSelect.classList.add('invalid');
    } else if(!$elevatorsSelect.value) {
      $elevatorsSelect.classList.add('invalid');
    }

    return false;
  }

  for(let i = 0; i < +$floorsSelect.value; i++) {
    floors.push(i);
  }

  for(let i = 0; i < +$elevatorsSelect.value; i++) {
    elevators.push({id: randomId(), moving: false, floor: 0});
  }

  $form.classList.add('hide');
  $game.classList.remove('hide');
  $game.classList.add('open');
  
  render();
});

[$floorsSelect, $elevatorsSelect].forEach((select) => {
  select.addEventListener('change', ({target: {value}}) => {
    if(submitted) {
      if(value) {
        select.classList.remove('invalid');
      } else {
        select.classList.add('invalid');
      }
    }
  });
});