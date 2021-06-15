/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/pages/Home';
import {render, fireEvent} from '@testing-library/react-native';
import {toHaveStyle, toHaveProp} from '@testing-library/jest-native';

import {act} from 'react-test-renderer';

expect.extend({toHaveStyle, toHaveProp});
beforeEach(() => {
  fetch.resetMocks();
  jest.clearAllMocks();
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
  const {getByTestId} = render(<App />);
  expect(getByTestId('welcomeTitle').props.children).toBe('Hello!');
  fireEvent.press(getByTestId('buttonEditingMode'));
  fireEvent.changeText(getByTestId('inputTextName'), 'Alicia');
  fireEvent.press(getByTestId('buttonEditingMode'));
  getByTestId('welcomeTitle');
  expect(getByTestId('welcomeTitle').props.children).toBe('Hello Alicia!');
  fireEvent.press(getByTestId('buttonEditingMode'));
  fireEvent.changeText(getByTestId('inputTextName'), '');
  fireEvent.press(getByTestId('buttonEditingMode'));
  expect(getByTestId('welcomeTitle').props.children).toBe('Hello!');
});

it('Verifies that Shape changes when clicked on square and round shapes', () => {
  const {getAllByTestId, getByTestId} = render(<App />);
  fireEvent.press(getByTestId('buttonEditingMode'));
  fireEvent.press(getByTestId('buttonShapeSquare'));
  expect(getByTestId('mainPicture')).not.toHaveStyle({borderRadius: 215});
  getAllByTestId('imageCarrousel').forEach(imageCarrousel => {
    expect(imageCarrousel).not.toHaveStyle({borderRadius: 40});
  });
  fireEvent.press(getByTestId('buttonShapeRound'));
  getAllByTestId('imageCarrousel').forEach(imageCarrousel => {
    expect(imageCarrousel).toHaveStyle({borderRadius: 40});
  });
  expect(getByTestId('mainPicture')).toHaveStyle({borderRadius: 215});
});

it('Verify that main image changes using Picker', async () => {
  const {getByTestId} = render(<App />);
  fireEvent.press(getByTestId('buttonEditingMode'));
  fireEvent.press(getByTestId('buttonChangePicture'));
  await act(() => new Promise(resolve => setImmediate(resolve)));
  expect(getByTestId('mainPicture')).toHaveProp('source', {
    uri: 'data:image/jpeg;base64,mockDatabase64',
  });
});
