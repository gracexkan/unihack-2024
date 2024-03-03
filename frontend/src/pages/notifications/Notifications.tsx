import { TimePicker, notification } from "antd";
import dayjs from "dayjs";
import { SmileOutlined } from "@ant-design/icons";

const Notifications = ({
  reminders,
  setReminders,
}: {
  reminders: string[];
  setReminders: (reminders: string[]) => void;
}) => {
  const removeReminder = (index: number) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  return (
    <div className="flex justify-center items-center text-left flex-col gap-3 overflow-y-auto mb-40">
      <h2 className="font-semibold text-2xl mt-3">Notifications</h2>
      <p className="text-sm text-center text-slate-800 w-4/5">
        Here are your upcoming reminders.
      </p>
      <div className="w-fit flex flex-row mt-2 justify-evenly gap-2 bg-purple-200 text-purple-700 rounded-lg text-xs p-2 mb-2">
        <SmileOutlined />
        {"Tip: Click on the clock icon to add another 15 minutes to the original notification."}
      </div>
      <div className="flex flex-col w-4/5 gap-4">
        {reminders.map((reminder, index) => (
          <div className="flex flex-row gap-4 justify-between" key={index}>
            <p>{reminder}</p>
            <button
              className="bg-indigo-200 text-indigo-900 hover:bg-indigo-300 rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => removeReminder(index)}
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
