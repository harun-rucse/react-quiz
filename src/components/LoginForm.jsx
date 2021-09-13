import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';
import TextInput from '../components/TextInput';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');

  const { login } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      setLoading(false);

      // Redirect to home page
      history.push('/');
    } catch (err) {
      console.log(err);
      setError('Failed to login!');
      setLoading(false);
    }
  };

  return (
    <Form style={{ height: '330px' }} onSubmit={onSubmitHandler}>
      {error && <p className="error">{error}</p>}
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        <span>{loading ? 'Processing...' : 'Submit now'}</span>
      </Button>

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
