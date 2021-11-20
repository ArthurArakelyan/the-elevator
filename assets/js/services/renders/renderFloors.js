import floorCreator from "../elementCreators/floorCreator.js";

const renderFloors = (floors, handleClick) => {
  const $floors = document.querySelector('.floors');
  const $addFloor = document.querySelector('.add-floor');
  
  if(floors.length >= 100) {
    $addFloor.disabled = true;
  } else {
    $addFloor.disabled = false;
  }

  $floors.innerHTML = '<div class="elevators"></div>';
  floors.forEach((floor) => $floors.appendChild(floorCreator(floor, handleClick)));
}

export default renderFloors;