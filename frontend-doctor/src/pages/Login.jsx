import { useState } from "react"

const Login = () => {
  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

  }

  return (
    <form className="min-h-[80vh] flex items-center">
      <div className={`flex flex-col gap-2 m-auto items-start ${state === 'Sign Up' ? "bg-teal-900" : "bg-blue-900"}  text-white p-8 min-w-85 sm:min-w-96 border border-amber-300 rounded-xl shadow-lg  `}>
        <p className="text-3xl border-b text-blue-100 border-amber-200">{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>{state === 'Sign Up' ? <span className="text-amber-200">Sign up</span> : <span className="text-amber-200">Login</span>} to Book Appointment</p>
        {
          state === 'Sign Up' &&
          <div className="w-full mt-4">
            <p className="text-pink-200">Full Name</p>
            <input className="border border-zinc-200 rounded w-full p-2 mt-1 outline-0"
              type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
        }
        <div className="w-full mt-2.5">
          <p className="text-pink-200">Email</p>
          <input className="border border-zinc-200 rounded w-full p-2 mt-1 outline-0"
            type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="w-full mt-2.5">
          <p className="text-pink-200">Password</p>
          <input className="border border-zinc-200 rounded w-full p-2 mt-1 outline-0"
            type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button className="mt-4 bg-gray-100 text-gray-800 w-full rounded-2xl px-1 py-2 hover:scale-95 hover:bg-gray-300 cursor-pointer transation-all">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>
        {
          state === 'Sign Up' ?
            <p className=" text-gray-300">Already have an account? <span onClick={() => setState('Login')} className="text-amber-200 text-lg cursor-pointer">Login here</span></p> :
            <p className=" text-gray-300">Create new Account. <span onClick={() => setState('Sign Up')} className="text-amber-200 text-lg cursor-pointer">Sign Up</span></p>
        }
      </div>
    </form>
  )
}

export default Login
