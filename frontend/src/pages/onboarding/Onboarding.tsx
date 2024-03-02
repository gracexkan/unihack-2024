import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import DateTimePicker from "../../components/DateTimePicker";

const Onboarding = () => {
  // TODO: update name
  const navigate = useNavigate();
  document.title = "Onboarding | Pill Pal";
  return (
    <div className="flex justify-center items-center text-left flex-col gap-3">
      <h2 className="font-semibold text-2xl mb-2">Onboarding</h2>
      <p className="text-xs text-slate-800 mb-6">
        Please enter some preferences about yourself.
      </p>
      <h3 className="font-semibold text-md mb-2">Meal times</h3>
      <div className="flex flex-col gap-4 w-3/4 mb-8">
        <div className="flex flex-row justify-between">
          <p className="text-sm text-slate-800 my-2">Breakfast</p>
          <DateTimePicker />
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm text-slate-800 my-2">Lunch</p>
          <DateTimePicker />
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm text-slate-800 my-2">Dinner</p>
          <DateTimePicker />
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-3">
        <p className="text-sm text-slate-800 text-left">
          How many minutes before these times do you want the reminder?
        </p>
        <Input />
      </div>
      <span className="w-96 text-xs text-center text-slate-800 mb-4">
        Note: this information is used to automatically schedule preferred
        reminders to take your medication.
      </span>
      <div className="flex flex-row space-x-8">
        <button className="bg-indigo-500 text-white rounded-xl border-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-800" onClick={() => navigate("/profiles")}>
          Save
        </button>
        <button className="bg-indigo-200 text-indigo-900 rounded-xl border-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-500" onClick={() => navigate("/profiles")}>
          Discard
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
