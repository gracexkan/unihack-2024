// confirm prescription output
// reminder summary / scheduling / generation

import { Progress } from "antd";
import { useState, useEffect } from "react";
import Camera from "../../components/Camera";
import DateTimePicker from "../../components/DateTimePicker";

const Prescription = () => {
  document.title = "Add Prescription | ${name}";
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isCamera, setIsCamera] = useState(false);

  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadLogo = e.target.files[0];
      setImage(uploadLogo);
      setPreview(URL.createObjectURL(uploadLogo));
    }
  };

  useEffect(() => {}, [progress, isCamera, preview, image]);

  return (
    <div className="flex justify-center items-center text-left flex-col gap-3 overflow-y-auto">
      <h2 className="font-semibold text-2xl mt-3">Add a prescription</h2>
      <Progress
        percent={Math.round((progress / 2) * 100)}
        strokeColor={{
          "0%": "#818cf8",
          "100%": "#818cf8",
        }}
        className="w-4/5 mb-4"
      />
      {progress === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-semibold text-md mb-2">Step One</h3>
          <p className="text-sm text-slate-800 mb-5">
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
              onClick={() => setIsCamera(false)}
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
          {isCamera && <Camera isVisible={isCamera} setPreview={setPreview} setImage={setImage}/>}
          {!isCamera && image && (
            <img
              src={preview}
              alt="prescription image"
              className="flex flex-col justify-center items-center w-4/5"
            />
          )}
          <div className="flex mt-5 mb-10">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm font-medium"
              onClick={() => setProgress(progress + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {progress === 1 && (
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-semibold text-md mb-2">Step Two</h3>
          <p className="text-sm text-slate-800 mb-5">
            Confirm that this is what the prescription says:
          </p>
          {image && (
            <img
              src={preview}
              alt="prescription image"
              className="flex flex-col justify-center items-center w-4/5 mb-4"
            />
          )}
          <div className="flex justify-end gap-2">
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
      {progress === 2 && (
        <div className="w-4/5 flex flex-col justify-center items-center">
          <h3 className="font-semibold text-md mb-2">Step Three</h3>
          <p className="text-sm text-slate-800 mb-5">
            We have scheduled the following reminders according to your
            requirements and preferences.
          </p>
          <p className="text-sm text-slate-800 mb-5">
            Are you happy with these scheduled reminders for medication XYZ?
          </p>
          <div className="flex flex-col gap-4 w-full md:w-3/4 mb-8">
            {/* TODO: fix */}
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
