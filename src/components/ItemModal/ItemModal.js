import React, { useState } from 'react';
import { useBasketContext } from '../../context/BasketContext';
import barcode from '../../assets/img/barcode.svg';
import box from '../../assets/img/box.svg';
import PropTypes from 'prop-types';

const ItemModal = ({ code, closeModal }) => {
  const [itemName, setItemName] = useState('');
  const { saveItem } = useBasketContext();

  const handleItemName = (e) => {
    setItemName(e.target.value);
  };

  const handleSaveItem = () => {
    saveItem({ code, itemName });
    closeModal();
    setItemName('');
  };

  const handleCloseModal = () => {
    setItemName('');
    closeModal();
  };

  return (
    <div
      className={'modal fade'}
      id={'staticBackdrop'}
      tabIndex={'-1'}
      aria-labelledby={'staticBackdropLabel'}
      aria-hidden={'true'}
    >
      <div className={'modal-dialog modal-dialog-centered'}>
        <div className={'modal-content'}>
          <div className={'modal-header'}>
            <h1 className={'modal-title fs-5'} id={'staticBackdropLabel'}>
              Scanned Item
            </h1>
            <button
              type={'button'}
              className={'btn-close'}
              aria-label={'Close'}
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className={'modal-body'}>
            <div className={'mb-3 row'}>
              <label
                htmlFor={'scannedItemCode'}
                className={'col-sm-4 col-form-label'}
              >
                Scanned Item
              </label>
              <div className={'col-sm-8'}>
                <div className={'input-group'}>
                  <span className={'input-group-text'}>
                    <img src={barcode} alt={'Barcode Icon'} />
                  </span>
                  <input
                    type={'text'}
                    disabled
                    className={'form-control'}
                    id={'scannedItemCode'}
                    value={code}
                  />
                </div>
              </div>
            </div>
            <div className={'mb-3 row'}>
              <label htmlFor={'itemName'} className={'col-sm-4 col-form-label'}>
                Item Name
              </label>
              <div className={'col-sm-8'}>
                <div className={'input-group'}>
                  <span className={'input-group-text'}>
                    <img src={box} alt={'Item Icon'} />
                  </span>
                  <input
                    type={'text'}
                    className={'form-control'}
                    id={'itemName'}
                    name={'itemName'}
                    value={itemName}
                    onChange={handleItemName}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'modal-footer'}>
            <button
              type={'button'}
              className={'btn btn-secondary'}
              onClick={handleCloseModal}
            >
              Dismiss
            </button>
            <button
              type={'button'}
              className={'btn btn-primary'}
              onClick={handleSaveItem}
            >
              Add to basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemModal.propTypes = {
  code: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ItemModal;
