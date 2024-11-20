import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import GeneralTab from './GeneralTab'; // Adjust the import path if needed
import firestore from '@react-native-firebase/firestore';

// Mocking the Firestore module
jest.mock('@react-native-firebase/firestore', () => {
  return jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn(),
    update: jest.fn().mockResolvedValue({}),
  });
});

describe('GeneralTab Component', () => {
  const mockUserData = {
    fullname: 'Testuser MS',
    email: 'MS@gmail.com',
    phoneno: '12345678901',
    zipcode: '12345',
    designation: 'Software Engineer',
    address: '123 Main St',
    city: 'Karachi',
    state: 'Pakistan',
    provideservice: '5km',
    photouri: 'http://example.com/photo.jpg',
  };

  beforeEach(() => {
    // Mocking the Firestore response to simulate a successful fetch
    firestore().get.mockResolvedValueOnce({
      exists: true,
      data: () => mockUserData,
    });
  });

  // ==============================
  // 1. UI Rendering Tests
  // ==============================
  it('should render the form and display user data correctly', async () => {
    render(<GeneralTab />);

    
    const fullnameInput = await screen.findByDisplayValue(mockUserData.fullname);
    const emailInput = await screen.findByDisplayValue(mockUserData.email);
    const designationInput = await screen.findByDisplayValue(mockUserData.designation);

    
    expect(fullnameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(designationInput).toBeTruthy();
  });

  it('should render the form correctly with placeholders and labels', async () => {
    render(<GeneralTab />);

    
    expect(await screen.getByLabelText('Full Name')).toBeTruthy();
    expect(await screen.getByLabelText('Email')).toBeTruthy();
    expect(await screen.getByLabelText('Phone No.')).toBeTruthy();
  });

  it('should display validation errors when fields are empty', async () => {
    render(<GeneralTab />);

    
    fireEvent.press(screen.getByText('Update'));


    expect(await screen.findByText('Full Name is required')).toBeTruthy();
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Phone number is required')).toBeTruthy();
    expect(await screen.findByText('Zip code is required')).toBeTruthy();
  });

  it('should show email validation error for invalid email format', async () => {
    render(<GeneralTab />);

  
    fireEvent.changeText(screen.getByLabelText('Email'), 'invalid-email');
    fireEvent.press(screen.getByText('Update'));


    expect(await screen.findByText('Please enter a valid email address')).toBeTruthy();
  });

  // ==============================
  // 2. Unit Tests (mocking functionality)
  // ==============================
  it('should call firestore update with correct data', async () => {
    render(<GeneralTab />);

  
    fireEvent.changeText(screen.getByLabelText('Full Name'), 'Testuser MS');
    fireEvent.changeText(screen.getByLabelText('Email'), 'MS@gmail.com');
    fireEvent.changeText(screen.getByLabelText('Phone No.'), '09876543210');
    fireEvent.changeText(screen.getByLabelText('Zip Code'), '54321');

    firestore().update.mockResolvedValueOnce({});

    fireEvent.press(screen.getByText('Update'));

    
    expect(firestore().update).toHaveBeenCalledWith(
      expect.objectContaining({
        fullname: 'Testuser MS',
        email: 'MS@gmail.com',
        phoneno: '09876543210',
        zipcode: '54321',
      })
    );
  });

  it('should show validation errors for empty fields', async () => {
    render(<GeneralTab />);

    fireEvent.press(screen.getByText('Update'));

    expect(await screen.findByText('Full Name is required')).toBeTruthy();
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Phone number is required')).toBeTruthy();
    expect(await screen.findByText('Zip code is required')).toBeTruthy();
  });


  it('should be accessible and contain labels for all input fields', async () => {
    render(<GeneralTab />);

 
    expect(await screen.findByLabelText('Full Name')).toBeTruthy();
    expect(await screen.findByLabelText('Email')).toBeTruthy();
    expect(await screen.findByLabelText('Phone No.')).toBeTruthy();
    expect(await screen.findByLabelText('Zip Code')).toBeTruthy();
  });
});
