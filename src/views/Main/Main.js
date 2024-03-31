import React, { useState, useRef } from 'react';
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

  const openModal = () => {
    const modalElement = document.getElementById('staticBackdrop');
    const bsModal = new Modal(modalElement, {
      backdrop: 'static',
      keyboard: false,
    });
    bsModal.show();
  };

  const closeModal = () => {
    const modalElement = document.getElementById('staticBackdrop');
    const bsModal = Modal.getInstance(modalElement);
    if (bsModal) {
      bsModal.hide();
    }
    setCode('');
  };

  const handleDetected = (result) => {
    const itemsContainResult = items.some((item) => item.code === result);

    if (itemsContainResult) {
      return;
    }

    setCode(result);
    setScanning(false);
    removeVideoElement();
    openModal();
  };

  const initializeCamera = async () => {
    try {
      // Trigger permission prompt and enumerate cameras afterwards
      await Quagga.CameraAccess.request(null, {});
      await Quagga.CameraAccess.release();
      const detectedCameras = await Quagga.CameraAccess.enumerateVideoDevices();
      setCameras(detectedCameras);
      // Ensure torch is off on component load
      await Quagga.CameraAccess.disableTorch();
    } catch (err) {
      toast(`Error accessing camera: ${err.message}`);
      setCameraError(`Error accessing camera: ${err.message}`);
    }
  };

  const handleScanning = () => {
    if (scanning) {
      setScanning(false);
      removeVideoElement();
    } else if (cameras.length === 0) {
      initializeCamera().then(() => {
        setScanning(true);
      });
    } else if (cameras.length > 0 && !scanning) {
      setScanning(true);
    }
  };

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
