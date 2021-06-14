/**
 * @format
 */

import React from 'react';
import App from '../src/pages/Home';

import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

it('renders correctly', () => {
  renderer.create(<App />)
});
