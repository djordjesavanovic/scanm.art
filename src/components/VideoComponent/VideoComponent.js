import barcode from '../../assets/img/barcode.svg';
import BarcodeScanner from '../BarcodeScanner/BarcodeScanner';
import React from 'react';
import PropTypes from 'prop-types';

const VideoComponent = ({ scannerRef, scanning, handleDetected }) => {
  return (
    <div className={'row'}>
      <div
        className={
          'd-flex flex-column col-12 align-items-center justify-content-center pt-3'
        }
      >
        <div
          style={{
            width: '100%',
            minHeight: '300px',
          }}
          ref={scannerRef}
          className={
            'border border-5 border-warning bg-light d-flex align-items-center justify-content-center'
          }
        >
          {!scanning && (
            <img src={barcode} alt={'Barcode Icon'} width={70} height={70} />
          )}
          {scanning && (
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
