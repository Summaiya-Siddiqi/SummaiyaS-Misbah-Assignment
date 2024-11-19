import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import GeneralTab from './GeneralTab'; // Adjust the import path if needed
import firestore from '@react-native-firebase/firestore';

// Mocking the Firestore module
jest.mock('@react-native-firebase/firestore', () => {
  return jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    update: jest.fn(),
  });
});

describe('GeneralTab Component', () => {
  const mockUserData = {
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    phoneno: '12345678901',
    zipcode: '12345',
    designation: 'Software Engineer',
    address: '123 Main St',
    city: 'Metropolis',
    state: 'Stateville',
    provideservice: 'Yes',
    photouri: 'http://example.com/photo.jpg',
  };

  beforeEach(() => {
    // Mocking the Firestore response to simulate a successful fetch
    firestore().get.mockResolvedValueOnce({
      exists: true,
      data: () => mockUserData,
    });
  });

  it('should render the form and display user data correctly', async () => {
    render(<GeneralTab />);

    // Wait for the component to finish rendering user data
    const fullnameInput = await screen.findByDisplayValue(mockUserData.fullname);
    const emailInput = await screen.findByDisplayValue(mockUserData.email);

    expect(fullnameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  it('should show validation errors for empty fields', async () => {
    render(<GeneralTab />);

    // Leave the inputs empty and try to update
    fireEvent.press(screen.getByText('Update'));

    expect(await screen.findByText('Full Name is required')).toBeTruthy();
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Phone number is required')).toBeTruthy();
    expect(await screen.findByText('Zip code is required')).toBeTruthy();
  });

  it('should show email validation error for invalid email', async () => {
    render(<GeneralTab />);

    fireEvent.changeText(screen.getByLabelText('Email'), 'invalid-email');
    fireEvent.press(screen.getByText('Update'));

    expect(await screen.findByText('Please enter a valid email address')).toBeTruthy();
  });

  it('should update the profile when the form is valid', async () => {
    render(<GeneralTab />);

    // Fill the form with valid data
    fireEvent.changeText(screen.getByLabelText('Full Name'), 'Jane Doe');
    fireEvent.changeText(screen.getByLabelText('Email'), 'jane.doe@example.com');
    fireEvent.changeText(screen.getByLabelText('Phone No.'), '09876543210');
    fireEvent.changeText(screen.getByLabelText('Zip Code'), '54321');

    // Mocking the successful update action
    firestore().update.mockResolvedValueOnce({});

    fireEvent.press(screen.getByText('Update'));

    // Check if Firestore update was called with the correct data (only the fields with values)
    expect(firestore().update).toHaveBeenCalledWith(
      expect.objectContaining({
        fullname: 'Jane Doe',
        email: 'jane.doe@example.com',
        phoneno: '09876543210',
        zipcode: '54321',
      })
    );

    // Optionally, check for a success alert (if your component triggers one)
    // You can mock `Alert.alert` if necessary
  });
});
