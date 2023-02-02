import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockData from "./mockData"
import { CandidateWorkInfo } from './CandidateWorkInfo';


describe('CandidateWorkInfo component testing', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData)
        })
    });
    it('should get user data on first render', async () => {
        render(<CandidateWorkInfo/>);
        expect(fetch).toHaveBeenCalledTimes(1);
        const {company, CurrentlyWorking, startDate, endDate, title, jobType} = mockData[0];
        await waitFor(() => {
            expect(screen.getByText(company)).toBeInTheDocument();
        })
        
        expect(screen.getByText(CurrentlyWorking)).toBeInTheDocument();
        expect(screen.getByText(startDate)).toBeInTheDocument();
        expect(screen.getByText(endDate)).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(jobType)).toBeInTheDocument();
    });
    
    it('should take us to adding work experience details page when we click + Add Another button', async () => {
        render(<CandidateWorkInfo />);
        const addAnotherButton = screen.getByText("+ Add New");
        fireEvent(addAnotherButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Company')).toBeInTheDocument();
        })
        await waitFor(() => {
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        })
        await waitFor(() => {
            expect(screen.getByText('Add')).toBeInTheDocument();
        })
    });

    it('text can be inputted into the Job type field on the add details page', async () => {
        render(<CandidateWorkInfo />);
        const addAnotherButton = screen.getByText("+ Add New");
        fireEvent(addAnotherButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        let titleInput;
        await waitFor(() => {
            titleInput = screen.getByPlaceholderText("Job Title")
        })
        fireEvent.change(titleInput, { target: { value: 'Cfo' } })
        expect(titleInput.value).toBe('Cfo')
      });

      it('should send post request on clicking Add button on add details page', async () => {
        render(<CandidateWorkInfo />);
        const addAnotherButton = screen.getByText("+ Add New");
        fireEvent(addAnotherButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        let addButton;
        await waitFor(() => {
            addButton = screen.getByText("Add")
        })
        fireEvent(addButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }));
        expect(fetch).toHaveBeenCalledTimes(2);
    });
})
