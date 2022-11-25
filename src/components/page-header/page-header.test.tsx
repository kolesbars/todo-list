import PageHeader from './page-header';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('Component: PageHeader', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <PageHeader />
      </BrowserRouter>
    );

    expect(screen.getByText(/Todo list/i)).toBeInTheDocument();
  });
});
