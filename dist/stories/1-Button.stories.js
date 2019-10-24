import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
export default {
  title: 'Button'
};
export const text = () => React.createElement(Button, {
  onClick: action('clicked')
}, "Hello Button");
export const emoji = () => React.createElement(Button, {
  onClick: action('clicked')
}, React.createElement("span", {
  role: "img",
  "aria-label": "so cool"
}, "\uD83D\uDE00 \uD83D\uDE0E \uD83D\uDC4D \uD83D\uDCAF"));