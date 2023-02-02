import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

const someCallback = jest.fn();

describe('button test', () => {
  it('should show button', () => {
    render(<Button text="This is a button" />);
    expect(screen.getByText("This is a button")).toBeInTheDocument();
  });

  it('the callback fn is called when the button is clicked', () => {

    render(<Button text="New Button" onClick={someCallback} />);
    const btn = screen.getByText("New Button");
    fireEvent(btn, new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }));
    expect(someCallback).toHaveBeenCalledTimes(1);
  });

});