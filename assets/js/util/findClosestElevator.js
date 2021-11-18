const findClosestElevator = (array, index) => {
  const elevators = array.map((elevator) => elevator.floor);
  const closestElevatorIndex = elevators.reduce((prev, curr) => {
    return (Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev);
  });
  return array.find((elevator) => elevator.floor === closestElevatorIndex);
}

export default findClosestElevator;