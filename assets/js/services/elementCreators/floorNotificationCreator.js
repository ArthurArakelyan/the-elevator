const floorNotificationCreator = (notification) => {
  const $notification = document.createElement('div');
  $notification.classList.add('floor-notification');
  $notification.innerHTML = notification;

  return $notification;
}

export default floorNotificationCreator;