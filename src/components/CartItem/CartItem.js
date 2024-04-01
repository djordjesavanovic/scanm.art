import React from 'react';

// Component for presenting scanned items in the cart
const CartItem = ({ code, itemName }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{itemName}</h5>
        <h6 className="card-subtitle text-body-secondary">{code}</h6>
      </div>
    </div>
  );
};

export default CartItem;
