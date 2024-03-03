import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Input } from "antd";
import { DatePicker as DateTimePicker } from "antd";
import moment from 'moment';

const Onboarding = () => {
  const [breakfastTime, setBreakfastTime] = useState('');
  const [lunchTime, setLunchTime] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  useEffect(() => {
    const loadedPreferences = {
      breakfast: localStorage.getItem('breakfastTime'),
      lunch: localStorage.getItem('lunchTime'),
      dinner: localStorage.getItem('dinnerTime'),
      reminder: localStorage.getItem('reminderTime'),
    };

    if (loadedPreferences.breakfast) setBreakfastTime(loadedPreferences.breakfast);
    if (loadedPreferences.lunch) setLunchTime(loadedPreferences.lunch);
    if (loadedPreferences.dinner) setDinnerTime(loadedPreferences.dinner);
    if (loadedPreferences.reminder) setReminderTime(loadedPreferences.reminder);
  }, []);

  const savePreferences = () => {
    localStorage.setItem('breakfastTime', breakfastTime);
    localStorage.setItem('lunchTime', lunchTime);
    localStorage.setItem('dinnerTime', dinnerTime);
    localStorage.setItem('reminderTime', reminderTime);
  };

  const handleDateChange = (setter: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }) => (date: any, dateString: any) => {
    setter(dateString);
  };

  document.title = "Onboarding | Pill Pal";
  return (
    <div className="flex justify-center items-center text-left flex-col gap-3 overflow-y-auto">
      <h2 className="font-semibold text-2xl mb-2">Onboarding</h2>
      <p className="text-xs text-slate-800 mb-6">
        Please enter some preferences about yourself.
      </p>
      <div className="flex flex-col gap-4 w-3/4 mb-8">
        <div className="flex flex-row justify-between">
          <p className="text-sm text-slate-800 my-2">Breakfast</p>
          <DateTimePicker
            format="DD/MM/YYYY hh:mm A"
            showTime={{ use12Hours: true }}
            value={breakfastTime ? moment(breakfastTime, "DD/MM/YYYY hh:mm A") : null}
            onChange={handleDateChange(setBreakfastTime)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm text-slate-800 my-2">Lunch</p>
          <DateTimePicker
            format="DD/MM/YYYY hh:mm A"
            showTime={{ use12Hours: true }}
            value={lunchTime ? moment(lunchTime, "DD/MM/YYYY hh:mm A") : null}
            onChange={handleDateChange(setLunchTime)}
          />
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm text-slate-800 my-2">Dinner</p>
          <DateTimePicker
            format="DD/MM/YYYY hh:mm A"
            showTime={{ use12Hours: true }}
            value={dinnerTime ? moment(dinnerTime, "DD/MM/YYYY hh:mm A") : null}
            onChange={handleDateChange(setDinnerTime)}
          />
        </div>
      </div>
      <div className="w-4/5 flex flex-col gap-4 mb-3">
        <p className="text-sm text-center text-slate-800">How many minutes before these times do you want the reminder?</p>
        <Input value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
      </div>
      <span className="w-96 text-xs text-center text-slate-800 mb-4">
        Note: this information is used to automatically schedule preferred
        reminders to take your medication.
      </span>
      <div className="flex flex-row space-x-8">
        <button className="bg-indigo-500 text-white rounded-xl px-4 py-2 text-sm font-medium" onClick={savePreferences}>
          <Link to="/profiles">Save</Link>
        </button>
        <button className="bg-indigo-200 text-indigo-900 rounded-xl px-4 py-2 text-sm font-medium">
          <Link to="/profiles">Discard</Link>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
