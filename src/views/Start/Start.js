import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useBasketContext } from '../../context/BasketContext';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const { setBasketID } = useBasketContext();
  const navigate = useNavigate();
  const handleStart = () => {
    const uid = uuidv4();
    setBasketID(uid);
    navigate('/scan');
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
