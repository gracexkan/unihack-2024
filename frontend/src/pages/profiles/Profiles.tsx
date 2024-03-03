import { EyeOutlined, EyeInvisibleOutlined, SmileOutlined } from "@ant-design/icons";
import Card from "../../components/Card";
import { useState } from "react";
import IconButton from "../../components/IconButton";
import Pill from "../../components/Pill";
import { Tag } from 'antd';

// TODO: delete
const data = [
  {
    name: "John",
    prescription: "Ibuprofen",
    restrictions: ["Take with food.", "Do not exceed 2400mg in 24 hours."],
    duration: 5,
    frequency: 4,
    severity: 'Low'
  },
  {
    name: "Jane",
    prescription: "Lexapro",
    restrictions: ["Take with food.", "Do not exceed 1800mg in 24 hours."],
    duration: 6,
    frequency: 8,
    severity: 'Medium'
  },
];

const Profiles = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.title = "Family Profiles | Pill Pal";
  const [toggle, setToggle] = useState(true);

  const changeBgColour = (severity: string) => {
    const s = severity.toLowerCase();
    if (s.includes("low")) {
      return "green-300"
    } else if (s.includes("medium")) {
      return "orange-300"
    } else if (s.includes("high")) {
      return "red-300"
    }
  }

  return (
    <div className="flex justify-center items-center w-full flex-col gap-3 pb-5 mb-2">
      <div className="flex flex-row justify-between gap-4 w-4/5">
        <h2 className="font-semibold text-2xl">Family Profiles</h2>
      </div>
      <div className="flex flex-col m-0 w-4/5 lg:flex-row gap-4">
        {data.map((d, index) => (
          <div key={index}>
            <h3 className="font-semibold text-md mb-2">
              {d.name}'s Prescriptions
            </h3>
            <div className="flex items-start">
              <Card key={index}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-left font-semibold text-md">💊 {d.prescription}</h4>
                  <Tag className={`w-min bg-${changeBgColour(d.severity)} border-${changeBgColour(d.severity)} text-slate-900`}>{d.severity}</Tag>
                  <p className="text-left text-sm text-slate-800">Administer prescription every {d.frequency} hours for {d.duration} days </p>
                  <p className="text-left text-sm text-slate-800">Notes: {d.restrictions.join(" ")}</p>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
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
      <div className="w-4/5 lg:flex flex-col lg:justify-start">
        <div className="w-fit flex flex-row mt-2 justify-evenly gap-2 bg-indigo-200 text-indigo-700 rounded-lg text-xs p-2 mb-2">
          <SmileOutlined />
          {"Tip: you can turn the visibility of your prescriptions to your family group on and off."}
        </div>
        <Pill message={"Warning: Ibuprofen and Lexapro may have potential side effects when taken together. Please check with your G.P."} />
      </div>
      <div className="mb-80 flex flex-col m-0 w-4/5 lg:flex-row gap-4">
        {data.map((d, index) => (
          <div key={index}>
            <Card key={index}>
              <div className="flex flex-col gap-2">
                <h4 className="text-left font-semibold text-md">💊 {d.prescription}</h4>
                <Tag className={`w-min bg-${changeBgColour(d.severity)} border-${changeBgColour(d.severity)} text-slate-900`}>{d.severity}</Tag>
                <p className="text-left text-sm text-slate-800">Administer prescription every {d.frequency} hours for {d.duration} days </p>
                <p className="text-left text-sm text-slate-800">Notes: {d.restrictions.join(" ")}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
