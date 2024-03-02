import { Link } from "react-router-dom";
import { Input } from "antd";
import DateTimePicker from "../../components/DateTimePicker";

const UserPreferences = () => {
  // TODO: update name
  document.title = "Preferences | Pill Pal";
  return (
    <div className="flex justify-center items-center text-left flex-col gap-3 overflow-y-auto">
      <h2 className="font-semibold text-2xl mb-2">User Preferences</h2>
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
      <div className="w-4/5 flex flex-col gap-4 mb-3">
        <p className="text-sm text-center text-slate-800">How many minutes before these times do you want the reminder?</p>
        <Input />
      </div>
      <span className="w-4/5 text-xs text-center text-slate-800 mb-4">Note: this information is used to automatically schedule preferred reminders to take your medication.</span>
      <div className="flex flex-row space-x-8">
        <button className="bg-indigo-500 text-white rounded-xl px-4 py-2 text-sm font-medium">
          <Link to="/profiles">Save</Link>
        </button>
        <button className="bg-indigo-200 text-indigo-900 rounded-xl px-4 py-2 text-sm font-medium">
          <Link to="/profiles">Discard</Link>
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;
