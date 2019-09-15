import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Learn React')).toBeInTheDocument();
});

// More on writing component tests
// https://github.com/testing-library/react-testing-library