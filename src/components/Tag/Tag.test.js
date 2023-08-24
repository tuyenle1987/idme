import { render, screen } from '@testing-library/react';
import Tag from './';

test('renders Tag text', () => {
  render(<Tag name="test" />);
  const elem = screen.getAllByText(/test/i)[0];
  expect(elem).toBeInTheDocument();
});
