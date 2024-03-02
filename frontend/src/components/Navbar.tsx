import { BellOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import IconButton from './IconButton';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center font-sans top-0 z-40 w-full backdrop-blur bg-white lg:z-50 py-2">
      <div className="px-8 font-semibold mt-2">
        <p>Logo</p>
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
