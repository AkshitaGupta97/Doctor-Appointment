import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {

    const { setAdToken, backendUrl } = useContext(AdminContext);

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            // for admin
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
                if (data.success) {
                    //  console.log("Token is -> admi login =  ", data.token );
                    localStorage.setItem('adToken', data.token);
                    setAdToken(data.token);
                    toast.success(data.message);
                }
                else {
                    toast.error(data.message);
                }
            }
            // then we are at doctor
            else {

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">

            <div className={` ${state === 'Doctor' ? "bg-blue-400": "bg-amber-100"} flex flex-col gap-4 m-auto px-6 py-6 sm:min-w-96 border rounded-xl text-cyan-800 shadow-lg shadow-gray-900 bg-white`}>

                <p className="text-xl text-center text-amber-800 font-semibold">
                    <span className={` ${state==='Doctor' ? 'text-blue-700' : "text-cyan-700"}`}>{state}</span> Login🚀
                </p>

                <div className="w-full">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}
                        className="w-full border border-violet-500 rounded p-2 mt-1 outline-0"
                        type="email"
                        required
                    />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password}
                        className="w-full border-violet-500 outline-0 border rounded p-2 mt-1"
                        type="password"
                        required
                    />
                </div>

                <button className="bg-cyan-700 cursor-pointer hover:scale-95 transition-all text-white w-full py-2 rounded">
                    Login
                </button>

                {
                    state === 'Admin' ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className="text-amber-600 text-sm cursor-pointer underline">Click here</span></p> :
                        <p>Admin Login? <span onClick={() => setState('Admin')} className="text-amber-600 text-sm cursor-pointer underline">Click here</span></p>
                }

            </div>

        </form>
    )
}

export default Login;
