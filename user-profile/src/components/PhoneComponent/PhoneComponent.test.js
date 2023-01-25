import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PhoneComponent from './PhoneComponent';
 
describe('PhoneComponent test', () => {
  it('should show phone component', () => {
    render(<PhoneComponent placeholder='Mobile Number' required={true} />);
    expect(screen.getByPlaceholderText("Mobile Number")).toBeInTheDocument();
  });
  
});