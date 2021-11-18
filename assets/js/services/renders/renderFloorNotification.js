import floorNotificationCreator from "../elementCreators/floorNotificationCreator.js";

const renderFloorNotification = (floor, notification) => {
  const $floor = document.querySelector(`.floor-${floor}`);
  $floor.querySelector('.floor-notification')?.remove();

  const $notification = floorNotificationCreator(notification);
  $floor.appendChild($notification);

  setTimeout(() => $notification.remove(), 2000);
}

export default renderFloorNotification;