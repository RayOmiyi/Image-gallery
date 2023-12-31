import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase/config';
import {Link,useNavigate} from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    {error && <p className="text-red-500">{error}</p>}
      <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center">
      <h1 className="text-5xl font-bold ">Image Gallery</h1>
      <p className="py-6">To Upload your photos, signup.</p>
    </div>
    <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" defaultValue={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="input input-bordered" />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Signup</button>
                        <Link to='/login'>Sign In</Link>

        </div>
      </div>
    </div>
  </div>
</div>
    </form>
  )
}

export default Signup
