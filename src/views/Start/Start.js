import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useBasketContext } from '../../context/BasketContext';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const { setBasketID } = useBasketContext();
  const navigate = useNavigate();

  // Handler for the 'Start the app' button click event.
  const handleStart = () => {
    const uid = uuidv4(); // Generating a unique identifier for the new basket session.
    setBasketID(uid); // Setting the basket ID in the context to this new UUID.
    navigate('/scan'); // Navigating to the '/scan' route where the main functionality likely resides.
  };

  return (
    <div className={'row'}>
      <div className={'d-flex flex-column col-12 align-items-center'}>
        <button
          type={'button'}
          className={'btn btn-primary mt-5'}
          onClick={handleStart}
        >
          Start the app
        </button>
      </div>
    </div>
  );
};

export default Start;
