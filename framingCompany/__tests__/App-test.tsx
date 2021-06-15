/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/pages/Home';
import {render, fireEvent} from '@testing-library/react-native';

import {getImageWithFrame} from '../src/services/frames';

beforeEach(() => {
  fetch.resetMocks();
});

it('Renders default elements', () => {
  const {getByPlaceholderText, getAllByTestId, getByText, getByTestId} = render(
    <App />,
  );
  expect(getAllByTestId('logoImage').length).toBe(1);
  expect(getAllByTestId('welcomeTitle').length).toBe(1);
  expect(getAllByTestId('mainPicture').length).toBe(1);
  getByText('Edit Profile');
  fireEvent.press(getByTestId('buttonEditingMode'));
  getByText('Publish');
  expect(getAllByTestId('logoImage').length).toBe(1);
  getByPlaceholderText('your name');
  expect(getAllByTestId('mainPicture').length).toBe(1);
  getByTestId('carrouseOflFrames');
  getByTestId('buttonShapeSquare');
  getByTestId('buttonShapeRound');
  getByTestId('buttonChangePicture');
  fireEvent.press(getByTestId('buttonEditingMode'));
  getByText('Edit Profile');
  expect(() => getAllByTestId('carrouseOflFrames')).toThrow(
    'Unable to find an element',
  );
  expect(() => getAllByTestId('buttonShapeSquare')).toThrow(
    'Unable to find an element',
  );
  expect(() => getAllByTestId('buttonShapeRound')).toThrow(
    'Unable to find an element',
  );
  expect(() => getAllByTestId('buttonChangePicture')).toThrow(
    'Unable to find an element',
  );
});

it('Verifies that a name put in Input appears on Welcome Message', () => {
  const {getByPlaceholderText, getAllByTestId, getByText, getByTestId, debug} =
    render(<App />);
  expect(getByTestId('welcomeTitle').props.children).toBe('Hello!');
  fireEvent.press(getByTestId('buttonEditingMode'));
  fireEvent.changeText(getByTestId('inputTextName'), "Alicia")
  fireEvent.press(getByTestId('buttonEditingMode'));
  getByTestId('welcomeTitle');
  expect(getByTestId('welcomeTitle').props.children).toBe('Hello Alicia!');
});
