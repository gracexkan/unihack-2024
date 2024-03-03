import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { TPrescription } from "../types/types";
import { ChangeEvent } from "react";

const Accordion = ({
  data,
  setData,
}: {
  data: TPrescription;
  setData: (data: TPrescription) => void;
}) => {
  const handleMedicationNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, medicationName: event.target.value });
  };

  const handleDoseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.value === "null" ? -1 : parseInt(event.target.value, 10);
    setData({ ...data, dose: isNaN(value) ? undefined : value });
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.value === "null" ? -1 : parseInt(event.target.value, 10);
    setData({ ...data, duration: isNaN(value) ? undefined : value });
  };

  const handleFrequencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.value === "null" ? -1 : parseInt(event.target.value, 10);
    setData({ ...data, frequency: isNaN(value) ? undefined : value });
  };

  const handleRestrictionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, restrictions: event.target.value.split(".") });
  };

  const handleSeverityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      severity: event.target.value === "Unknown" ? null : event.target.value,
    });
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Medicine name",
      children: (
        <p>
          <input
            type="text"
            className="border border-gray-300 rounded p-1"
            value={data?.medicationName || ""}
            onChange={handleMedicationNameChange}
            required
          />
        </p>
      ),
    },
    {
      key: "2",
      label: "Dose",
      children: (
        <p>
          <input
            type="number"
            className="border border-gray-300 rounded p-1"
            value={data?.dose}
            onChange={handleDoseChange}
            required
          />
          {""} mg
        </p>
      ),
    },
    {
      key: "3",
      label: "Duration",
      children: (
        <p>
          <input
            type="number"
            className="border border-gray-300 rounded p-1"
            value={data?.duration}
            onChange={handleDurationChange}
            required
          />{" "}
          days
        </p>
      ),
    },
    {
      key: "4",
      label: "Frequency",
      children: (
        <p>
          <input
            type="number"
            className="border border-gray-300 rounded p-1"
            value={data?.frequency}
            onChange={handleFrequencyChange}
            required
          />{" "}
          doses a day
        </p>
      ),
    },
    {
      key: "5",
      label: "Restrictions",
      children: (
        <textarea
          type="text"
          className="w-full border border-gray-300 rounded p-1"
          value={data?.restrictions?.join(" ") || ""}
          onChange={handleRestrictionsChange}
          required
        />
      ),
    },
    {
      key: "6",
      label: "Severity",
      children: (
        <p>
          <input
            type="text"
            className="border border-gray-300 rounded p-1"
            value={data?.severity === "null" ? "Unknown" : `${data?.severity}`}
            onChange={handleSeverityChange}
            required
          />{" "}
          chance of issues arising if the medication is not taken.
        </p>
      ),
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse
      items={items}
      defaultActiveKey={["1"]}
      onChange={onChange}
      className="bg-slate-200"
    />
  );
};

export default Accordion;
