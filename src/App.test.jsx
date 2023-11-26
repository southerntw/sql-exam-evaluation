import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders App component and checks for a successful comparison', async () => {
  render(<App />);

  const questionIdInput = screen.getByLabelText('Question ID:');
  const query2Input = screen.getByLabelText('Query 2:');

  fireEvent.change(questionIdInput, { target: { value: '5E' } });
  fireEvent.change(query2Input, { target: { value: "SELECT f.title AS 'judul', f.release_year AS 'tahun rilis', f.rental_duration AS 'durasi rental', c.name AS genre FROM film f JOIN film_category fc USING (film_id) JOIN category c USING (category_id) WHERE f.rental_duration =(SELECT MAX(rental_duration) from film) GROUP BY f.title HAVING c.name ='horror';" } });

  const submitButton = screen.getByText('Check Query');
  fireEvent.click(submitButton);

  await waitFor(() => {
      const jawabanBenarElement = screen.getByText('Jawaban Benar');
      expect(jawabanBenarElement).toBeInTheDocument();
    }, { timeout: 5000 });

});