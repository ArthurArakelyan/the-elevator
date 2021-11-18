const setElevatorBottom = ($elevator, bottom) => $elevator.style.bottom = `${bottom}px`;

const animate = ($elevator, floor, destination, stopElevator = () => {}) => {
  let i = floor;
 
  if(i < destination) {
    i += 1;
    setElevatorBottom($elevator, i * 50);
  } else if(i > destination) {
    i -= 1;
    setElevatorBottom($elevator, i * 50);
  }

  const interval = setInterval(() => {
    if(i < destination) {
      i += 1;
      setElevatorBottom($elevator, i * 50);
    } else if(i > destination) {
      i -= 1;
      setElevatorBottom($elevator, i * 50);
    } else {
      stopElevator();
      clearInterval(interval);
    }
  }, 1000);
}

const setElevatorPosition = ($elevator, elevator, destination = elevator.floor, stopElevator) => {
  if(elevator.floor === destination) {
    setElevatorBottom($elevator, elevator.floor * 50);
  } else {
    animate($elevator, {...elevator}.floor, destination, stopElevator);
  }
}

export default setElevatorPosition;