import React, {useCallback, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Quagga from '@ericblade/quagga2';

// Utility function to calculate the median of an array
const getMedian = (arr) => {
	const sortedArr = [...arr].sort((a, b) => a - b);
	const midIndex = Math.floor(sortedArr.length / 2);
	return sortedArr.length % 2 !== 0 ? sortedArr[midIndex] : (sortedArr[midIndex - 1] + sortedArr[midIndex]) / 2;
};

// Utility function to get the median of code errors from decoded codes
const getMedianOfCodeErrors = (decodedCodes) => getMedian(decodedCodes.flatMap(x => x.error || []));

// Default configuration settings
const defaultConfig = {
	constraints: {
		facingMode: "environment",
		aspectRatio: 1
	},
	decoders: ['ean_reader'],
};

const BarcodeScanner = ({
							onDetected,
							scannerRef,
							onScannerReady,
							cameraId,
							facingMode,
							constraints = defaultConfig.constraints,
							decoders = defaultConfig.decoders,
							locate = true,
						}) => {
	// Error checking callback
	const handleDetected = useCallback((result) => {
		if (!onDetected) return;
		const medianError = getMedianOfCodeErrors(result.codeResult.decodedCodes);
		if (medianError < 0.25) onDetected(result.codeResult.code); // Accept code if error < 0.25
	}, [onDetected]);

	useLayoutEffect(() => {
		let ignoreInit = false;

		const initQuagga = async () => {
			await new Promise(resolve => setTimeout(resolve, 1)); // Delay to check for unmount
			if (ignoreInit) return;

			Quagga.init({
				inputStream: {
					type: 'LiveStream',
					constraints: {
						...constraints,
					},
					target: scannerRef.current,
				},
				decoder: {readers: decoders},
				locate,
			}, async (err) => {
				if (err) {
					console.error('Error starting Quagga:', err);
					return;
				}
				Quagga.onDetected(handleDetected);

				await Quagga.start();
				onScannerReady?.();
			});
		};

		initQuagga();

		return () => { // Cleanup
			ignoreInit = true;
			Quagga.stop();
			Quagga.offDetected(handleDetected);
		};
	}, [cameraId, constraints, decoders, facingMode, handleDetected, locate, onScannerReady, scannerRef]);

	return null; // This component doesn't render anything itself
};

BarcodeScanner.propTypes = {
	onDetected: PropTypes.func.isRequired,
	scannerRef: PropTypes.object.isRequired,
	onScannerReady: PropTypes.func,
	cameraId: PropTypes.string,
	facingMode: PropTypes.string,
	constraints: PropTypes.object,
	decoders: PropTypes.arrayOf(PropTypes.string),
	locate: PropTypes.bool,
};

export default BarcodeScanner;
