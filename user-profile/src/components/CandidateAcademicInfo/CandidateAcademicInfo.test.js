import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockData from "./mockData"
import CandidateAcademicInfo from './CandidateAcademicInfo';

describe('CandidateAcademicInfo component test', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData)
        })
    });

    it('should get user data on first render', () => {
        render(<CandidateAcademicInfo />);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should take us to adding educational details page when we click + Add Another button', async () => {
        render(<CandidateAcademicInfo />);
        const addAnotherButton = screen.getByText("+ Add Another");
        fireEvent(addAnotherButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        await waitFor(async () => {
            expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
        })
        await waitFor(async () => {
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        })
    });

    it('text can be inputted into the Title field on the add details page', async () => {
        render(<CandidateAcademicInfo />);
        const addAnotherButton = screen.getByText("+ Add Another");
        fireEvent(addAnotherButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        let titleInput;
        await waitFor(async () => {
            titleInput = screen.getByPlaceholderText("Title")
        })
        fireEvent.change(titleInput, { target: { value: 'Bachelor of Arts' } })
        expect(titleInput.value).toBe('Bachelor of Arts')
      });

      it('should send post request on clicking Save button', () => {
        render(<CandidateAcademicInfo />);
        const saveButton = screen.getByText("Save");
        fireEvent(saveButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        expect(fetch).toHaveBeenCalledTimes(2);
    });

});