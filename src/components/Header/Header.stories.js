import React from 'react';
import Header from './Header';
import { BasketContextProvider } from '../../context/BasketContext';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../assets/scss/custom.scss';

export default {
  title: 'Example/Header',
  component: Header,
  decorators: [
    (Story) => (
      <BasketContextProvider>
        <Story />
      </BasketContextProvider>
    ),
  ],
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
