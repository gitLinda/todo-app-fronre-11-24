import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './Foo';

describe('App', () => {
    it('types in the input field', async () => {
        const user = userEvent.setup();
        render(<App />);

        expect(screen.getByText(/Searches for .../)).toBeInTheDocument();

        const inputField = screen.getByRole('textbox');
        await user.type(inputField, 'React Testing Library');

        expect(
            screen.getByText(/Searches for React Testing Library/)
        ).toBeInTheDocument();
    });
});
