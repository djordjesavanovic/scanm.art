// Function for removing the video element after stopping the scanning
const removeVideoElement = () => {
  let element = document.querySelector('#interactive.viewport canvas, video');
  element.parentNode.removeChild(element);
};

export default removeVideoElement;
