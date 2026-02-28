import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <div className="relative">
        <img onClick={()=> navigate('/')}
          src="https://tse1.mm.bing.net/th/id/OIP.5-8N1e0Fbn-EUV6mhQxOvgHaFL?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="logo"
          className="w-14 h-14 object-contain rounded-full shadow-lg border-2 border-blue-900 bg-white p-1 transition-transform animate-spin duration-300 hover:scale-105"
        />
      </div>
      <p className="text-xl font-bold bg-gradient-to-r from-blue-900 via-teal-700 to-blue-800 bg-clip-text shadow-lg text-transparent tracking-wide">
        MediLink
      </p>
    </div>
  );
};

export default Logo;
