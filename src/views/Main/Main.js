import React, { useState, useRef, useCallback } from 'react';
import Quagga from '@ericblade/quagga2';
import { toast } from 'react-toastify';
import ItemModal from '../../components/ItemModal/ItemModal';
import { Modal } from 'bootstrap';
import removeVideoElement from '../../utils/removeVideoElement';
import { useBasketContext } from '../../context/BasketContext';
import Controls from '../../components/Controls/Controls';
import VideoComponent from '../../components/VideoComponent/VideoComponent';

const Main = () => {
  const [scanning, setScanning] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [cameraError, setCameraError] = useState('');
  const [code, setCode] = useState('');
  const scannerRef = useRef(null);
  const { items } = useBasketContext();

  // Function to open the modal.
  const openModal = useCallback(() => {
    // Bootstrap modal setup and display.
    const modalElement = document.getElementById('staticBackdrop');
    const bsModal = new Modal(modalElement, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  }, []);

  // Function to close the modal and reset scanned code.
  const closeModal = useCallback(() => {
    // Close the Bootstrap modal and reset the code state.
    const modalElement = document.getElementById('staticBackdrop');
    const bsModal = Modal.getInstance(modalElement);
    if (bsModal) {
      bsModal.hide();
    }
    setCode('');
  }, []);

  // Function to handle the detected barcode.
  const handleDetected = useCallback(
    (result) => {
      // Check if the detected item is already in the basket, if not, show it in the modal.
      const itemsContainResult = items.some((item) => item.code === result);

      if (itemsContainResult) {
        return;
      }

      setCode(result);
      setScanning(false);
      removeVideoElement();
      openModal();
    },
    [items, openModal]
  );

  // Callback function to initialize camera access and handle permissions.
  const initializeCamera = useCallback(async () => {
    // Request camera access, check for permissions, and update state accordingly.
    try {
      // Trigger permission prompt to access the camera
      await Quagga.CameraAccess.request(null, {});
      // Immediately release the camera as we only want to check permission
      await Quagga.CameraAccess.release();

      // Enumerate video devices to check if camera access was granted
      const detectedCameras = await Quagga.CameraAccess.enumerateVideoDevices();

      if (detectedCameras.length === 0) {
        // Assuming no cameras detected means permission was denied
        throw new Error('Camera access denied by user.');
      }

      // If cameras are detected, update state accordingly
      setCameras(detectedCameras);
    } catch (err) {
      // Handle errors including denied camera access here
      toast(`Error accessing camera: ${err.message}`);
      setCameraError(`Error accessing camera: ${err.message}`);
      throw err;
    }
  }, []);

  // Function to handle the scanning process based on current state and camera availability.
  const handleScanning = useCallback(() => {
    if (scanning) {
      setScanning(false);
      removeVideoElement();
    } else if (cameras.length === 0) {
      // Attempt to initialize the camera
      initializeCamera()
        .then(() => {
          setScanning(true);
        })
        .catch(() => {});
    } else if (cameras.length > 0 && !scanning) {
      // If cameras are already initialized and scanning is not active, start scanning.
      setScanning(true);
    }
  }, [cameras.length, initializeCamera, scanning]);

  return (
    <>
      <VideoComponent
        handleDetected={handleDetected}
        scanning={scanning}
        scannerRef={scannerRef}
      />
      <Controls
        cameras={cameras}
        cameraError={cameraError}
        handleScanning={handleScanning}
        scanning={scanning}
      />
      <ItemModal closeModal={closeModal} code={code} />
    </>
  );
};

export default Main;
