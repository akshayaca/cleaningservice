/*
  File: ServiceListing.test.js
  Description: Unit tests for ServiceListing component.
  Author: Akshayarekha Subhramaniyan
  Date: 27/03/2024

  Note: This file contains unit tests for the ServiceListing component. It tests rendering of service listings
  with different filter options.
*/

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceListing from './ServiceListing';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useHistory from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('ServiceListing Component', () => {
  const renderComponent = () =>
    render(
      <Router>
        <ServiceListing />
      </Router>
    );

    test('renders service listings with all time filter by default', async () => {
      const { findAllByText } = renderComponent();
      const listings = await findAllByText(/Property Title/);
      expect(listings).toHaveLength(8); 
    });
    
    test('renders today service listings when today filter is applied', async () => {
      const { findByTestId, findAllByText } = renderComponent();
    
      // First, open the filter menu
      const filterToggleButton = await findByTestId('filter-toggle-button');
      fireEvent.click(filterToggleButton);
    
      // Then, select "Today"
      const todayOption = await findByTestId('filter-time-today');
      fireEvent.click(todayOption);
    
      // Check for listings that match the "Today" filter
      const filteredListings = await findAllByText(/Property Title/);
      expect(filteredListings).toHaveLength(1); 
    });

  test('renders this week service listings when this week filter is applied', async () => {
    const { findByTestId, findAllByText } = renderComponent();
  
    // Open the filter menu
    const filterToggleButton = await findByTestId('filter-toggle-button');
    fireEvent.click(filterToggleButton); 
  
    // Select "This Week" from the "Time" filter options
    const thisWeekOption = await findByTestId('filter-time-this-week');
    fireEvent.click(thisWeekOption);
  
    // Check for listings after applying the filter
    const filteredListings = await findAllByText(/Property Title/);
    expect(filteredListings).toHaveLength(1); 
  });

});
