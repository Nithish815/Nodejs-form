import React from 'react';
import { deleteAccount } from '../api';
import { useNavigate } from 'react-router-dom';

function ThankYou() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteAccount({ email: user.email });
    localStorage.clear();
    alert('Account deleted');
    navigate('/');
  };

  return (
    <div>
      <h2>Thank You, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Company: {user.company}</p>
      <p>Age: {user.age}</p>
      <p>Date of Birth: {user.dob.slice(0, 10)}</p>
      <img src={user.image} alt="User" width="150" />
      <br />
      <button onClick={handleDelete}>Remove Account</button>
    </div>
  );
}

export default ThankYou;
