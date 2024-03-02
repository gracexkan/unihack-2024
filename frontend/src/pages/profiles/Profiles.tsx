import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Card from "../../components/Card";
import { useState } from "react";
import IconButton from "../../components/IconButton";
import Pill from "../../components/Pill";

// TODO: delete
const data = [
  {
    name: "John",
    prescription: "fdsfjklds",
  },
  {
    name: "Jane",
    prescription: "fdsfjklds",
  },
];

const Profiles = () => {
  document.title = "Family Profiles | ${name}";
  const [toggle, setToggle] = useState(true);

  return (
    <div className="flex justify-center items-center w-full flex-col gap-3">
      <div className="flex flex-row justify-between gap-4 w-4/5 mt-4">
        <h2 className="font-semibold text-2xl">Your Profile</h2>
        {toggle ? (
          <IconButton title={"Toggle visibility"} onClick={() => setToggle(false)}>
            <EyeOutlined />
          </IconButton>
        ) : (
          <IconButton title={"Toggle visibility"} onClick={() => setToggle(true)}>
            <EyeInvisibleOutlined />
          </IconButton>
        )}
      </div>
      <div className="w-4/5 lg:flex lg:justify-start">
        <Pill message={"Warning: medication A and medication B may have potential side effects when taken together. Please check with your G.P."} />
      </div>
      <div className="flex flex-col m-0 w-4/5 lg:flex-row gap-4">
        {data.map((d, index) => (
          <div key={index}>
            <Card key={index}>{d.prescription}</Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
