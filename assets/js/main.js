// imports
import renderFloors from "./services/renders/renderFloors.js";
import renderElevators from "./services/renders/renderElevators.js";
import renderFloorNotification from "./services/renders/renderFloorNotification.js";

import setElevatorPosition from "./util/setElevatorPosition.js";
import findClosestElevator from "./util/findClosestElevator.js";
import randomId from "./util/randomId.js";

// elements
const $addFloor = document.querySelector('.add-floor');
const $addElevator = document.querySelector('.add-elevator');

// data
let floors = [];
let elevators = [];

// listeners
$addFloor.addEventListener('click', addFloor);
$addElevator.addEventListener('click', addElevator);

// functions
function stopElevator(elevator) {
  elevators = elevators.map((elev) => elev.id === elevator.id ? {
    ...elev,
    moving: false
  } : elev);
}

function moveElevator(elevator, floor) {
  elevators = elevators.map((elev) => elev.id === elevator.id ? {
    ...elev,
    floor,
    moving: true
  } : elev);

  const $elevator = document.querySelector(`.elevator-${elevator.id}`);

  setElevatorPosition($elevator, elevator, floor, () => stopElevator(elevator));
}

function chooseOtherElevator(elevator, floor) {
  const filteredElevators = elevators.filter(({id, moving}) => id !== elevator.id && !moving);
  if(!filteredElevators.length) {
    renderFloorNotification(floor, 'All elevators working. Please try later');
    return false;
  }

  const otherElevator = findClosestElevator(filteredElevators, floor);
  if(!otherElevator) return false;

  if(elevator.moving) {
    if(otherElevator.moving) {
      chooseOtherElevator(otherElevator);
      return false;
    }
  }

  moveElevator(otherElevator, floor);
}


function checkElevatorsMoving(warning) {
  if(elevators.find((elevator) => elevator.moving)) {
    alert(`Wait elevators stopping and add ${warning}`);
    return false;
  }

  return true;
}

function addFloor() {
  if(floors.length < 20 && checkElevatorsMoving('floor')) {
    floors.push(floors.length);
    render();
  }
}

function addElevator() {
  if(elevators.length < 6 && checkElevatorsMoving('elevator')) {
    elevators.push({id: randomId(), moving: false, floor: 0});
    renderElevators(elevators, floors);
  }
}

// listener functions
function handleFloorClick(floor) {
  const elevatorOnFloorIndex = elevators.findIndex((elevator) => elevator.floor === floor);

  if(elevatorOnFloorIndex >= 0) {
    const elevatorOnFloor = {...elevators[elevatorOnFloorIndex]};

    if(elevatorOnFloor.moving) {
      renderFloorNotification(floor, `Elevator number ${elevatorOnFloorIndex + 1} is coming`);
    } else {
      renderFloorNotification(floor, `Elevator number ${elevatorOnFloorIndex + 1} here`);
    }

    return false;
  }

  const closestElevator = findClosestElevator(elevators, floor);

  if(closestElevator.floor === floor) return false;
  
  if(closestElevator.moving) {
    chooseOtherElevator(closestElevator, floor);
  } else {
    moveElevator(closestElevator, floor);
  }
}

function render() {
  renderFloors(floors, handleFloorClick);
  renderElevators(elevators, floors);
}

export {
  floors, elevators, render
}