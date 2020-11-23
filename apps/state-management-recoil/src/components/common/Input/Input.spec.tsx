import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore } from 'src/code/testHelpers';
import initialState, { IReduxState } from 'src/store/reducers/initialState';

import Input from '.';
import { IInput } from './Input';

const getProps = (props?: Partial<IInput>): IInput => ({
  placeholder: 'Username',
  onChange: jest.fn(),
  inputText: 'Testing',
  ...props
});

const createRenderer = (state: IReduxState = initialState, props = getProps()): RenderResult => {
  const store = createMockStore(state);
  return render(
    <Provider store={store}>
      <Input {...props} />
    </Provider>
  );
};

describe('<Search />', () => {
  it('should render input', () => {
    const { getByPlaceholderText } = createRenderer();
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
  });

  it('should invoke onChange callback', () => {
    const props = getProps();
    const { getByPlaceholderText } = createRenderer(initialState, props);
    const Input = getByPlaceholderText('Username');
    expect(props.onChange).not.toHaveBeenCalled();
    userEvent.type(Input, 'T');
    expect(props.onChange).toHaveBeenCalled();
  });
});
