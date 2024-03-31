import React from 'react';
import Controls from './Controls';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../assets/scss/custom.scss';

export default {
  title: 'Example/Controls',
  component: Controls,
};

const Template = (args) => <Controls {...args} />;

// Story definition for the default state
export const Default = Template.bind({});
Default.args = {
  cameras: [],
  cameraError: '',
  handleScanning: () => alert('Scanning toggled'),
  scanning: false,
};

// Story definition for a state with cameras detected
export const WithCamerasDetected = Template.bind({});
WithCamerasDetected.args = {
  ...Default.args,
  cameras: [
    { id: 'cam1', label: 'Camera 1' },
    { id: 'cam2', label: 'Camera 2' },
  ],
};
