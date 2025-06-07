import React, { useState } from 'react';
import { verifyOTP } from '../api';
import { useNavigate } from 'react-router-dom';

function OTPVerify() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await verifyOTP({ email, otp });
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/thankyou');
    } else {
      navigate('/error');
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default OTPVerify;
