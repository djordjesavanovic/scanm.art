import React, { useEffect } from 'react';
import { Offcanvas } from 'bootstrap';
import { useOffcanvasContext } from '../../context/OffcanvasContext';
import { useBasketContext } from '../../context/BasketContext';
import CartItem from '../CartItem/CartItem';

const OffcanvasComponent = () => {
  const { show, toggleOffcanvas } = useOffcanvasContext();
  const { items } = useBasketContext();

  useEffect(() => {
    const offcanvasElement = document.getElementById('offcanvasRight');
    const bsOffcanvas = new Offcanvas(offcanvasElement);

    if (show) {
      bsOffcanvas.show();
    }

    offcanvasElement.addEventListener('hidden.bs.offcanvas', toggleOffcanvas);

    return () =>
      offcanvasElement.removeEventListener(
        'hidden.bs.offcanvas',
        toggleOffcanvas
      );
  }, [show, toggleOffcanvas]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">
          Basket
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            return (
              <CartItem key={index} code={item.code} itemName={item.itemName} />
            );
          })}
      </div>
    </div>
  );
};

export default OffcanvasComponent;
