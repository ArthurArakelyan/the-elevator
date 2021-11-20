import elevatorCreator from "../elementCreators/elevatorCreator.js";

const renderElevators = (elevators, floors) => {
  const $elevators = document.querySelector('.elevators');
  const $addElevator = document.querySelector('.add-elevator');
  
  if(elevators.length >= 10) {
    $addElevator.disabled = true;
  } else {
    $addElevator.disabled = false;
  }

  $elevators.innerHTML = '';
  elevators.forEach((elevator, index) => $elevators.appendChild(elevatorCreator(elevator, index, floors)));
}

export default renderElevators;