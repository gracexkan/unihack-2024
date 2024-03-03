import { DatePicker, Progress, Space, TimePicker, notification } from "antd";
import { useState, useEffect } from "react";
import Camera from "../../components/Camera";
import axios from "axios";
import Accordion from "../../components/Accordion";
import { add, format } from "date-fns";
import { TPrescription } from "../../types/types";
import Barcode from "../barcode/Barcode";
import moment from 'moment';
import dayjs from 'dayjs';

const Prescription = ({reminders, setReminders} : { reminders: string[], setReminders: (reminders: string[]) => void }) => {
  document.title = "Add Prescription | Pill Pal";
  const [data, setData] = useState<TPrescription | undefined>();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isCamera, setIsCamera] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [scan, setScan] = useState(false);

  const { RangePicker } = DatePicker;

  const openNotification = () => {
    notification.open({
      message: 'Reminder scheduled',
      description:
        'A reminder has been scheduled!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const addReminder = () => {
    setReminders([...reminders, '']);
    openNotification();
  };

  const updateReminder = (value: dayjs.Dayjs | null, index: number) => {
    const newReminders = [...reminders];
    newReminders[index] = value ? value.format('HH:mm') : '';
    setReminders(newReminders);
    openNotification();
  };

  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadLogo = e.target.files[0];
      setImage(uploadLogo);
      setPreview(URL.createObjectURL(uploadLogo));
    }
  };

  const fieldsNotMinusOne = (prescription: TPrescription) => {
    const result = [];
    for (const [key, value] of Object.entries(prescription)) {
      if (value !== -1 && ["mlDosage", "mgDosage", "numPills"].includes(key)) {
        result.push(value);
      }
    }
    if (result.length === 0) {
      result.push(-1);
    }
    return result[0];
  }

  const keysNotMinusOne = (prescription: TPrescription) => {
    const result = [];
    for (const [key, value] of Object.entries(prescription)) {
      if (value !== -1 && ["mlDosage", "mgDosage", "numPills"].includes(key)) {
        if (key === "mlDosage") {
          result.push("ml");
        } else if (key === "mgDosage") {
          result.push("mg");
        } else {
          result.push("pills/capsules")
        }
      }
    }
    if (result.length === 0) {
      result.push("mg");
    }
    return result[0];
  }  

  const fetchPrescription = async () => {
    if (!image && !scan) {
      alert("Please select a file first");
      setIsLoaded(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://unihack-2024-backend.zax.sh/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let resp = JSON.parse(response.data.result);
      resp['dose'] = fieldsNotMinusOne(resp);
      resp['unit'] = keysNotMinusOne(resp);
      setData(resp);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
    
  const calcFrequency = () => {
    if (data?.duration && data?.frequency) {
      const divisor = ((data.duration * 24) / data.frequency) / data.duration;
      const times = [];
      let currTime = dayjs();
      const endTime = currTime.add(data.duration, 'day');
      
      while (currTime.isBefore(endTime)) {
        times.push(currTime.format("h:mm A ddd, MMM D, YYYY"));
        currTime = currTime.add(divisor, 'hour');
      }
      setReminders(times);
      console.log(reminders);
    }
  };

  const getInitialDates = (): [dayjs.Dayjs | undefined, dayjs.Dayjs | undefined] | undefined => {
    const today = moment();
    let endDate = today.clone();
  
    if (data?.duration && data?.duration > 0) {
      endDate = endDate.add(data?.duration, 'days');
      // Convert moment objects to dayjs
      return [dayjs(today.toDate()), dayjs(endDate.toDate())];
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    calcFrequency()
    console.log(reminders);
  }, [data, startDate, endDate])

  useEffect(() => {}, [progress, isCamera, preview, image]);

  return (
    <div className="flex justify-center items-center text-left flex-col gap-3 overflow-y-auto mb-7">
      <h2 className="font-semibold text-2xl mt-3">Add a prescription</h2>
      <Progress
        percent={Math.round((progress / 3) * 100)}
        strokeColor={{
          "0%": "#818cf8",
          "100%": "#818cf8",
        }}
        className="w-4/5 mb-4"
      />
      {progress === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-semibold text-md mb-4">Step One</h3>
          <p className="text-sm text-center text-slate-800 mb-5 px-5">
            What would you like to scan to add a prescription?
          </p>
          <p className="text-xs text-center text-slate-800 mb-5 px-5">
            *Please note that scanning the bar code only works on US drugs.
          </p>
          <div className="flex flex-row space-between gap-x-6 mb-5 align-middle">
            <label
              className="bg-indigo-500 text-white hover:bg-indigo-300 rounded-xl px-4 py-2 text-sm font-medium cursor-pointer"
              onClick={() => {
                setProgress(progress + 1);
                setScan(false);
              }}
            >
              Prescription docs
            </label>
            <label
              className="bg-indigo-200 text-indigo-900 hover:bg-indigo-300 rounded-xl px-4 py-2 text-sm font-medium cursor-pointer"
              onClick={() => {
                setProgress(progress + 1);
                setScan(true);
              }}
            >
              Drug's barcode
            </label>  
          </div>
        </div>
      )}
      {progress === 1 && (
        <div className="flex flex-col items-center justify-center py-10">
          <h3 className="font-semibold text-md mb-2">Step Two</h3> 
          {scan && <Barcode data={data} setData={setData} setIsLoaded={setIsLoaded} />}  
          {!scan && <><p className="text-sm text-slate-800 mb-5">
            Provide a photo of your prescription
          </p>
          <div className="flex flex-row space-between gap-x-6 mb-5 align-middle">
            <label
              className="bg-indigo-500 text-white hover:bg-indigo-300 rounded-xl px-4 py-2 text-sm font-medium cursor-pointer"
              onClick={() => setIsCamera(true)}
            >
              Take a photo
            </label>
            <label
              htmlFor="logo"
              className="bg-indigo-200 text-indigo-900 hover:bg-indigo-300 rounded-xl px-4 py-2 text-sm font-medium cursor-pointer"
              onClick={() => {
                setIsCamera(false);
              }}
            >
              Upload a photo
            </label>
            <input
              id="logo"
              name="logo"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              required
              hidden
              onChange={uploadImg}
            />
          </div>
          {isCamera && (
            <Camera
              isVisible={isCamera}
              setPreview={setPreview}
              setImage={setImage}
            />
          )}
          {!isCamera && image && (
            <img
              src={preview}
              alt="prescription image"
              className="flex flex-col justify-center items-center w-4/5"
            />
          )}</>}
          <div className="flex justify-end gap-2 my-10">
            <button
              className="bg-indigo-200 text-indigo-900 rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => setProgress(progress - 1)}
            >
              Prev
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => {
                if (!scan) {
                fetchPrescription();
                }
                setProgress(progress + 1);
                {!isCamera && fetchPrescription()}
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {progress === 2 && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-semibold text-md mb-2">Step Three</h3>
          <p className="text-sm text-slate-800 mb-5">
            Confirm that this is what the prescription says:
          </p>
          <div className="flex flex-col md:flex-row md:items-start gap-3 items-center justify-center w-4/5">
            <div className="w-3/4 md:2/5">
              {isLoaded ? <Accordion data={data} setData={setData}/> : <p>Extracting data from image...</p>}
            </div>
            {image && (
              <img
                src={preview}
                alt="prescription image"
                className="flex flex-col justify-center items-center mb-4"
              />
            )}
          </div>
          <div className="flex justify-end gap-2 my-16">
            <button
              className="bg-indigo-200 text-indigo-900 rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => setProgress(progress - 1)}
            >
              Prev
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => setProgress(progress + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {progress === 3 && (
        <div className="w-4/5 flex flex-col justify-center items-center">
          <h3 className="font-semibold text-md mb-2">Step Four</h3>
          <p className="text-sm text-slate-800 mb-5 mt-5">
            We have scheduled the following reminders according to your
            requirements and preferences.
          </p>
          <p className="text-sm text-slate-800 mb-5">
            Are you happy with these scheduled reminders for medication {data?.medicationName}?
          </p>
          <div className="flex flex-col gap-4 w-full md:w-3/4 mb-8 mt-4">
            <p className="text-sm text-slate-800 mb-1">
              Start and end dates:
            </p>
            <RangePicker defaultValue={getInitialDates()}/>
            <Space direction="vertical" size="large">
              {reminders.map((reminder, index) => (
                <TimePicker
                  key={index}
                  value={reminder ? dayjs(reminder, 'h:mm') : null}
                  format="h:mm"
                  onChange={(time) => updateReminder(time, index)}
                />
              ))}
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium" onClick={addReminder}>
                Add Reminder
              </button>
            </Space>
            <div className="flex justify-end gap-2">
              <button
                className="bg-indigo-200 text-indigo-900 rounded-xl px-4 py-2 text-sm font-medium"
                onClick={() => setProgress(progress - 1)}
              >
                Prev
              </button>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prescription;
