const API = 'http://localhost:5000/api';

export const register = data => fetch(`${API}/register`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
}).then(res => res.json());

export const login = data => fetch(`${API}/login`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
}).then(res => res.json());

export const verifyOTP = data => fetch(`${API}/verify-otp`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
}).then(res => res.json());

export const deleteAccount = data => fetch(`${API}/delete`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
}).then(res => res.json());
