import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
    it('renders login page at /login', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });

    it('renders register page at /register', () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText('Join Nexum')).toBeInTheDocument();
    });
});
