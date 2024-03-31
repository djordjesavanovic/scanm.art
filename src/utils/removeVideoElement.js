const removeVideoElement = () => {
  let element = document.querySelector('#interactive.viewport canvas, video');
  element.parentNode.removeChild(element);
};

export default removeVideoElement;
