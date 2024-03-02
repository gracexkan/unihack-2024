import {
  CameraOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import IconButton from "./IconButton";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed w-screen bottom-0 left-0 right-0 z-40 bg-white backdrop-blur py-3 flex justify-between items-center border-t border-slate-900/1">
      <div className="pl-10">
        <IconButton title="Add prescription" onClick={() => navigate("/prescription")}>
          <CameraOutlined />
        </IconButton>
      </div>
      <div>
        <IconButton title="Access profile" onClick={() => navigate("/profiles")}>
          <TeamOutlined />
        </IconButton>
      </div>
      <div className="pr-10">
        <IconButton title="Edit preferences" onClick={() => navigate("/preferences")}>
        <MedicineBoxOutlined />
        </IconButton>
      </div>
    </div>
  );
};

export default Footer;
