import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockData from "./mockData"
import CandidateAcademicInfo from './CandidateAcademicInfo';

describe('CandidateWorkInfo component testing', () => {

    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData)
        })
    });
    it('should get user data on first render', async () => {
        render(<CandidateWorkInfo />);
        expect(fetch).toHaveBeenCalledTimes(1);
        const {company, CurrentlyWorking, startDate, endDate, title, jobType, } = mockData[0];
        await waitFor(() => {
            expect(screen.getByText(currentDegree)).toBeInTheDocument();
        })
        expect(screen.getByText(company)).toBeInTheDocument();
        expect(screen.getByText(CurrentlyWorking)).toBeInTheDocument();
        expect(screen.getByText(startDate)).toBeInTheDocument();
        expect(screen.getByText(endDate)).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(jobType)).toBeInTheDocument();
    });
    
})
