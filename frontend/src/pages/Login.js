import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log('Login response:', res);

      if (res.msg === 'OTP sent successfully') {
        localStorage.setItem('email', email);
        navigate('/otp');
      } else {
        alert(res.error || 'Login failed');
        navigate('/error');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      alert('Server error. Try again.');
      navigate('/error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/register')}>Create Account</button>
    </div>
  );
}

export default Login;
