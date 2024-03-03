import { TPrescription } from "../../types/types";

const Notifications = ({reminders, setReminders} : { reminders: string[], setReminders: (reminders: string[]) => void }) => {
  return (
    <div className="flex justify-center items-center text-left flex-col gap-3 overflow-y-auto">
      <h2 className="font-semibold text-2xl mt-3">Notifications</h2>
      <p>Here are your upcoming reminders</p>

    </div>
  )
}

export default Notifications;
