import { useState } from "react";

const Login = () => {

    const [state, setState] = useState('Admin');

    return (
        <form className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[360px] sm:min-w-96 border border-gradient-to-r from-blue-500 to-purple-500 rounded text-[#333] shadow-lg">
                <p><span>{state}</span> Login</p>
                <div className="">
                    <p>Email</p>
                    <input type="email" required />
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" required />
                </div>
                <button>Login</button>
            </div>
        </form>
    )
}

export default Login
