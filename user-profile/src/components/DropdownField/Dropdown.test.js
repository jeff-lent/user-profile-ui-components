import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownField from './DropdownField';
 
describe('DropdownField test', () => {
  it('should show dropdown field', () => {
    render(<DropdownField options={['Male', 'Female']} placeholder='Gender'/>);
    expect(screen.getByDisplayValue("Gender")).toBeInTheDocument();
  });
  
  it('should show display options', () => {
    render(<DropdownField options={['Male', 'Female']} placeholder='Gender'/>);
    const select = screen.getByDisplayValue("Gender");
    expect(select).toContainElement(screen.getByText("Male"));
    expect(select).toContainElement(screen.getByText("Female"));
  });

});