import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthProvider";

const Landing = () => {
  document.title = "Home | ${name}";
  const navigate = useNavigate();
  const { token } = useAuthContext();

  return (
    <div className="flex flex-col gap-5 justify-center items-center py-40">
      <h2 className="font-semibold text-2xl mb-2">$name</h2>
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
    </div>
  );
};

export default Landing;
