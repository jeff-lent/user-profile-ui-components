import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';
 
describe('Heading test', () => {
  it('should show heading', () => {
    render(<Heading text="Personal Information"/>);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it('should show heading by text', () => {
    render(<Heading text="New Heading"/>);
    expect(screen.getByText("New Heading")).toBeInTheDocument();
  });
  
});