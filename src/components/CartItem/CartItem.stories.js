import React from 'react';
import CartItem from './CartItem';

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
