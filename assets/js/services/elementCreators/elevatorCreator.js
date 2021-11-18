import setElevatorPosition from "../../util/setElevatorPosition.js";

const elevatorCreator = (elevator, index) => {
  const $elevator = document.createElement('div');
  $elevator.classList.add('elevator');
  $elevator.classList.add(`elevator-${elevator.id}`);
  $elevator.style.left = `${(index + 1) * 55}px`;
  setElevatorPosition($elevator, elevator);
  
  return $elevator;
}

export default elevatorCreator;