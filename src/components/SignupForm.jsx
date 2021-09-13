import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Form from '../components/Form';
import TextInput from '../components/TextInput';
import { useAuth } from '../context/AuthContext';

export default function SignupForm() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agree, setAgree] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');

  const { signup } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Validate password confirm
    if (password !== passwordConfirm) {
      return setError('Password does not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, username);
      setLoading(false);

      // Redirect to home page
      history.push('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError('Failed to create an accoutn!');
    }
  };

  return (
    <Form style={{ height: '500px' }} onSubmit={onSubmitHandler}>
      {error && <p className="error">{error}</p>}
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock"
        required
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Checkbox
        value={agree}
        required
        onChange={(e) => setAgree(e.target.value)}
      >
        <span>I agree to the Terms &amp; Conditions</span>
      </Checkbox>

      <Button type="submit" disabled={loading}>
        <span>{loading ? 'Processing...' : 'Submit now'}</span>
      </Button>

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
