const floorCreator = (index, handleFloorClick) => {
  const $floor = document.createElement('div');
  $floor.classList.add('floor');
  $floor.classList.add(`floor-${index}`);
  $floor.innerHTML = `<span class="floor-index">${index + 1}</span>`;
  $floor.addEventListener('click', () => handleFloorClick(index));

  return $floor;
}

export default floorCreator;