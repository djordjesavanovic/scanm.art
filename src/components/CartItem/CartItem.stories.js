import React from 'react';
import CartItem from './CartItem';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default {
  title: 'Example/CartItem',
  component: CartItem,
};

const Template = (args) => <CartItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  itemName: 'Sample Item Name',
  code: '123456',
};
