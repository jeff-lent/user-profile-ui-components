import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField test', () => {
  it('should show input field', () => {
    render(<InputField value="John Doe" type='text' placeholder='First Name' />);
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
  });

});