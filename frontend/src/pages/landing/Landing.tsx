import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthProvider";
import logo from '../../assets/logo.png';

const Landing = () => {
  document.title = "Home | Pill Pal";
  const navigate = useNavigate();
  const { token } = useAuthContext();

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-20 px-5">
      <img width={300} src={logo} alt="Description" />
      <h2 className="font-semibold text-2xl mb-2">Welcome to Pill Pal</h2>
      <p className="text-center">Thanks for choosing pill pal as your prescription management service!</p>
      {token ? null : (
        <div className="flex flex-col w-4/5 md:w-2/5 gap-5">
          <button
            className="bg-indigo-500 text-white rounded-xl px-4 py-2 font-medium"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
          <button
            className="bg-indigo-200 rounded-xl text-indigo-900 px-4 py-2 font-medium"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      )}
      <p className="text-center text-xs">Created by (wit): Frances, Grace, Joanna and Michael</p>
    </div>
  );
};

export default Landing;
