import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CandidatePersonalInfo from './CandidatePersonalInfo';
import mockData from "./mockData"

describe('CandidatePersonalInfo component test', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData)
        })
    });

    it('should send post request', () => {
        render(<CandidatePersonalInfo />);
        const saveButton = screen.getByText("Save");
        fireEvent(saveButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('text can be inputted into the input field', () => {
        render(<CandidatePersonalInfo />);
        const input = screen.getByPlaceholderText("First Name")
        fireEvent.change(input, { target: { value: 'Mufaddal' } })
        expect(input.value).toBe('Mufaddal')
      });

});