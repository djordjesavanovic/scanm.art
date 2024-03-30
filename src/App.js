import React, {useState, useRef} from 'react';
import Quagga from '@ericblade/quagga2';
import Result from './components/Result/Result';
import BarcodeScanner from "./components/BarcodeScanner/BarcodeScanner";
import Header from "./components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import barcode from "./assets/img/barcode.svg";

const App = () => {
	const [scanning, setScanning] = useState(false);
	const [cameras, setCameras] = useState([]);
	const [cameraId] = useState('');
	const [cameraError, setCameraError] = useState('');
	const [results, setResults] = useState([]);
	const scannerRef = useRef(null);

	const handleDetected = (result) => {
		setResults(prevResults => [...prevResults, result])
		setScanning(false);
		let element = document.querySelector('#interactive.viewport canvas, video');
		element.parentNode.removeChild(element);
	}

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
			toast(`Error accessing camera: ${err.message}`)
			setCameraError(`Error accessing camera: ${err.message}`);
		}
	};

	const handleScanning = () => {
		if (scanning) {
			setScanning(false)
			let element = document.querySelector('#interactive.viewport canvas, video');
			element.parentNode.removeChild(element);
		} else if (cameras.length === 0) {
			initializeCamera()
				.then(() => {
					setScanning(true)
				})
		} else if (cameras.length > 0 && !scanning) {
			setScanning(true)
		}
	}

	return (
		<div className={'container-fluid bg-light vh-100 d-flex flex-column'}>
			<Header />
			<div className={'container'}>
				{/*ROW FOR VIDEO*/}
				<div className={'row'}>
					<div className={'d-flex flex-column col-12 align-items-center justify-content-center pt-3'}>
						<div
							style={{
								width: '100%',
								minHeight: '300px',
							}}
							ref={scannerRef}
							className={'border border-5 border-warning bg-lighter-gray d-flex align-items-center justify-content-center'}
						>
							{
								!scanning &&
								<img
									src={barcode}
									alt={'Barcode Icon'}
									width={70}
									height={70}
								/>
							}
							{scanning && <BarcodeScanner
								scannerRef={scannerRef}
								cameraId={cameraId}
								onDetected={(result) => handleDetected(result)}
							/>}
						</div>
					</div>
				</div>
				{/*ROW FOR CONTROLS*/}
				<div className={'row'}>
					<div className={'col-12 d-flex flex-column align-items-center justify-content-center pt-3'}>
						{cameras.length === 0 && !cameraError &&
							<div className="alert alert-light" role="alert">
								Please grant camera permission if prompted.
							</div>
						}
						<button
							onClick={handleScanning}>{scanning ? 'Stop Scanning' : 'Start Scanning'}</button>
					</div>
					<button type="button" className="btn btn-primary" data-bs-toggle="modal"
							data-bs-target="#staticBackdrop">
						Launch static backdrop modal
					</button>
				</div>
				{/*ROW FOR RESULTS*/}
				<div className={'row'}>
					<div className={'col-12'}>
						<ul>
							{results.map((result, index) => (
								<Result key={index} result={result}/>
							))}
						</ul>
					</div>
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="light"
			/>
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
				 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal"
									aria-label="Close"></button>
						</div>
						<div className="modal-body">
							...
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Understood</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
