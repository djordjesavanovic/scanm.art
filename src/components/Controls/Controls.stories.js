import React from 'react';
import Controls from './Controls';

export default {
  title: 'Example/Controls',
  component: Controls,
  argTypes: { handleScanning: { action: 'clicked' } },
};

const Template = (args) => <Controls {...args} />;

export const Default = Template.bind({});
Default.args = {
  cameras: [
    { id: 'cam1', label: 'Camera 1' },
    { id: 'cam2', label: 'Camera 2' },
  ],
  scanning: false,
};

export const NoCameraPermission = Template.bind({});
NoCameraPermission.args = {
  cameras: [],
  cameraError: null,
  scanning: false,
};

export const ScanningActive = Template.bind({});
ScanningActive.args = {
  cameras: [{ id: 'cam1', label: 'Camera 1' }],
  scanning: true,
};
