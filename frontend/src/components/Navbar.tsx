import { BellOutlined } from '@ant-design/icons'
import { Link, useNavigate } from "react-router-dom"
import IconButton from './IconButton';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center font-sans top-0 z-40 w-full backdrop-blur bg-white lg:z-50 py-2 mb-5">
      <div className="px-8 font-semibold mt-2">
        <Link to="/"><img width={50} src={logo} alt="Description" /></Link>
      </div>
      <div className="px-8">
        <IconButton title="Open notifications" onClick={() => navigate("/notifications")}>
          <BellOutlined />
        </IconButton>
      </div>
    </div>
  )
}

export default Navbar;
