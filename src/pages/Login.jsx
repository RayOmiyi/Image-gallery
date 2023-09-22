import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth'
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className="text-red-500">{error}</p>}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Image Gallery</h1>
            <p className="py-6">Log in to access your photos.</p>
          </div>
          <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Log In</button>
                <Link to='/signup'>Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
