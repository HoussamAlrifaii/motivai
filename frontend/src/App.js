import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme, setTheme] = useState('motivation');
  const [celebrity, setCelebrity] = useState('the-rock');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const themes = [
    { value: 'motivation', label: 'Motivation Speech' },
    { value: 'compliment', label: 'Compliment' },
    { value: 'joke', label: 'Joke' },
  ];

  const celebrities = [
    { value: 'the-rock', label: 'Dwayne "The Rock" Johnson' },
    { value: 'oprah', label: 'Oprah Winfrey' },
    { value: 'elon-musk', label: 'Elon Musk' },
  ];

  const handleGenerateMessage = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-message', {
        theme,
        celebrity,
      });
      setMessage(response.data.text);
      setError('');
    } catch (err) {
      setError('Failed to generate message. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Motivai</h1>
      <Form>
        <Form.Group>
          <Form.Label>Select Theme</Form.Label>
          <Form.Control as="select" value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Select Celebrity</Form.Label>
          <Form.Control as="select" value={celebrity} onChange={(e) => setCelebrity(e.target.value)}>
            {celebrities.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" className="mt-3" onClick={handleGenerateMessage}>
          Generate Message
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {message && (
        <div className="mt-3">
          <h3>Generated Message:</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;