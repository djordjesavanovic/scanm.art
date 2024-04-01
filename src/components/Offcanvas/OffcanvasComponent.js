import React, { useEffect } from 'react';
import { Offcanvas } from 'bootstrap';
import { useOffcanvasContext } from '../../context/OffcanvasContext';
import { useBasketContext } from '../../context/BasketContext';
import CartItem from '../CartItem/CartItem';

// Offcanvas component, i.e. sidebar for showing the basket content
const OffcanvasComponent = () => {
  const { show, toggleOffcanvas } = useOffcanvasContext();
  const { items } = useBasketContext();

  useEffect(() => {
    // Identifying the offcanvas element in the DOM.
    const offcanvasElement = document.getElementById('offcanvasRight');
    // Initializing Bootstrap's offcanvas component with the DOM element.
    const bsOffcanvas = new Offcanvas(offcanvasElement);

    // Conditionally showing the offcanvas sidebar based on the 'show' state.
    if (show) {
      bsOffcanvas.show();
    }

    // Adding an event listener to the offcanvas element that triggers 'toggleOffcanvas'
    // when the offcanvas is closed.
    offcanvasElement.addEventListener('hidden.bs.offcanvas', toggleOffcanvas);

    // Cleanup function to remove the event listener when the component unmounts
    // or before re-invoking the effect due to dependency changes.
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
