import {
  CameraOutlined,
  MedicineBoxOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="fixed w-screen bottom-0 left-0 right-0 z-40 bg-white backdrop-blur py-3 flex justify-between items-center border-t border-slate-900/1">
      <div className="pl-10 text-slate-900">
        <Link to="/camera"><CameraOutlined /></Link>
      </div>
      <div className="text-slate-900">
        <Link to="/prescription"><MedicineBoxOutlined /></Link>
      </div>
      <div className=" text-slate-900">
        <Link to="/profiles"><TeamOutlined /></Link>
      </div>
      <div className="pr-10 text-slate-900">
        <Link to="/preferences"><SettingOutlined /></Link>
      </div>
    </div>
  );
};

export default Footer;
