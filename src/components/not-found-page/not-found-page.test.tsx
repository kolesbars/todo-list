import NotFoundPage from './not-found-page';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/404 - The Page can not be found/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Go TO Homepage/i)).toBeInTheDocument();
  });
});
