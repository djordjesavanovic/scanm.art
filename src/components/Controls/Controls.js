import React from 'react';
import PropTypes from 'prop-types';

// Defining the Controls component with props for managing camera and scanning state.
const Controls = ({ cameras, cameraError, handleScanning, scanning }) => {
  return (
    <div className={'row pt-3'}>
      <div
        className={
          'col-12 d-flex flex-column align-items-center justify-content-center'
        }
      >
        {cameras.length === 0 && !cameraError && (
          <div className={'alert alert-light'} role={'alert'}>
            Please grant camera permission if prompted.
          </div>
        )}
      </div>
      <div className={'d-grid'}>
        <button
          type={'button'}
          className={'btn btn-primary'}
          onClick={handleScanning}
        >
          {scanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
      </div>
    </div>
  );
};

Controls.propTypes = {
  cameras: PropTypes.array.isRequired,
  cameraError: PropTypes.string,
  handleScanning: PropTypes.func.isRequired,
  scanning: PropTypes.bool.isRequired,
};

export default Controls;
