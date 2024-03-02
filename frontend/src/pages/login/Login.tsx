import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  document.title = "Sign In | ${name}";
  return (
    <div className="flex justify-center items-center w-full flex-col gap-3">
      <h2 className="font-semibold text-2xl mb-2">Login</h2>
      <div className="flex justify-left items-left flex-col mr-3">
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
      <button className="bg-indigo-500 text-white rounded-xl border-indigo-500 px-4 py-2 font-medium">
        <Link to="/profiles">Submit</Link>
      </button>
      <p className="text-slate-800 text-xs">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-indigo-500 hover:text-indigo-600">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
