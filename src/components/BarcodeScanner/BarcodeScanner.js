import { useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Quagga from '@ericblade/quagga2';

// A utility function to calculate the median of an array. Useful for filtering out decoding errors.
const getMedian = (arr) => {
  const sortedArr = [...arr].sort((a, b) => a - b);
  const midIndex = Math.floor(sortedArr.length / 2);
  return sortedArr.length % 2 !== 0
    ? sortedArr[midIndex]
    : (sortedArr[midIndex - 1] + sortedArr[midIndex]) / 2;
};

// Function to calculate the median of code errors from decoded barcode results.
const getMedianOfCodeErrors = (decodedCodes) =>
  getMedian(decodedCodes.flatMap((x) => x.error || []));

// Default configuration for the Quagga library
const defaultConfig = {
  constraints: {
    facingMode: 'environment',
    aspectRatio: 1,
  },
  decoders: ['ean_reader'],
};

// The main component that sets up and manages the barcode scanner.
const BarcodeScanner = ({ onDetected, scannerRef }) => {
  // Callback function that processes detected barcodes.
  const handleDetected = useCallback(
    (result) => {
      if (!onDetected) return; // Do nothing if no callback is provided.
      // Calculate the median error of decoded barcodes to filter out poor scans.
      const medianError = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      if (medianError < 0.25) onDetected(result.codeResult.code); // Accept code if error < 0.25
    },
    [onDetected]
  );

  // Hook to initialize and clean up the barcode scanner.
  useLayoutEffect(() => {
    let ignoreInit = false; // Flag to ignore initialization if component is quickly unmounted.

    const initQuagga = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1)); // Short delay to mitigate quick mount/unmount scenarios.
      if (ignoreInit) return; // Prevent initialization if component is unmounted.

      // Initialize Quagga with configuration and start the barcode scanning process.
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            constraints: defaultConfig.constraints,
            target: scannerRef.current,
          },
          decoder: { readers: defaultConfig.decoders },
          locate: true,
        },
        async (err) => {
          if (err) {
            console.error('Error starting Quagga:', err);
            return;
          }
          Quagga.onDetected(handleDetected);

          await Quagga.start();
        }
      );
    };

    initQuagga(); // Initialize the scanner on component mount.

    return () => {
      // Cleanup function to stop scanning and remove event listeners.
      ignoreInit = true;
      Quagga.stop();
      Quagga.offDetected(handleDetected);
    };
  }, [handleDetected, scannerRef]);

  return null; // This component doesn't render any visual content.
};

BarcodeScanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
  scannerRef: PropTypes.object.isRequired,
};

export default BarcodeScanner;
