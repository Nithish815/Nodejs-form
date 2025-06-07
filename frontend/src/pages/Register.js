import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = { ...formData, image };
  try {
    const res = await register(data);
    if (res.msg) {
      alert(res.msg);
      navigate('/');
    } else {
      alert(res.error || 'Registration failed');
    }
  } catch (err) {
    alert('Network error or server issue');
    console.error(err);
  }
 };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = { ...formData, image };
//     const res = await register(data);
//     if (res.msg) {
//       alert('Registration successful');
//       navigate('/');
//     }
//   };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="company" placeholder="Company" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="dob" type="date" onChange={handleChange} required />
        <input type="file" accept="image/png, image/jpeg" onChange={handleImage} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
