import barcode from '../../assets/img/barcode.svg';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import React from 'react';
import PropTypes from 'prop-types';

// Component for showing the camera feed & placeholder.
// It receives a scannerRef for DOM reference, scanning state, and handleDetected callback as props.
const VideoComponent = ({ scannerRef, scanning, handleDetected }) => {
  return (
    <div className={'row pt-3'}>
      <div
        className={
          'd-flex flex-column col-12 align-items-center justify-content-center'
        }
      >
        <div
          style={{
            width: '100%',
            minHeight: '300px',
          }}
          ref={scannerRef}
          className={
            'border border-5 border-warning bg-white d-flex align-items-center justify-content-center'
          }
        >
          {!scanning && (
            // Displays a static barcode icon when not scanning.
            <img src={barcode} alt={'Barcode Icon'} width={70} height={70} />
          )}
          {scanning && (
            // Renders the BarcodeScanner component when scanning is active.
            // It passes down the scannerRef for camera access and handleDetected for processing scan results.
            <BarcodeScanner
              scannerRef={scannerRef}
              onDetected={(result) => handleDetected(result)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

VideoComponent.propTypes = {
  scannerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  scanning: PropTypes.bool.isRequired,
  handleDetected: PropTypes.func.isRequired,
};
export default VideoComponent;
