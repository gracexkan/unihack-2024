import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  document.title = "Sign Up | ${name}";
  const { setToken } = useAuthContext();
  return (
    <div className="flex justify-center items-center w-full flex-col gap-3">
      <h2 className="font-semibold text-2xl mb-2">Sign Up</h2>
      <div className="flex justify-left items-left flex-col mb-5 mr-3">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          className="m-0 text-left"
        ></Form.Item>
        <Input className="w-full mx-2" />
      </div>
      <div className="flex justify-left items-left flex-col mb-5">
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          className="m-0 text-left"
        ></Form.Item>
        <Input.Password />
      </div>
      <div className="flex justify-left items-left flex-col mb-5">
        <Form.Item
          label="Confirm password"
          name="Confirm password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          className="m-0 text-left"
        ></Form.Item>
        <Input.Password />
      </div>
      <button
        type="button"
        className="bg-indigo-500 text-white rounded-xl px-4 py-2 text-sm font-medium"
        onClick={() => setToken(uuidv4())}
      >
        <Link to="/onboarding">Create account</Link>
      </button>
      <p className="text-slate-800 text-xs">
        Have an account?{" "}
        <Link to="/login" className="text-indigo-500 hover:text-indigo-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
