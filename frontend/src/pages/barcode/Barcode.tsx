import { useEffect, useState } from "react";
import Quagga from "quagga";

const Barcode = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [barcode, setBarcode] = useState('Scanning...');
  const [data, setData] = useState([]);

  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadLogo = e.target.files[0];
      setImage(uploadLogo);
      setPreview(URL.createObjectURL(uploadLogo));
    }
  };

  const handleScan = async () => {
    const response = await fetch(`http://127.0.0.1:8088/scan?barcode=${barcode}`);
    if (response.ok) {
      const res = await response.json();
      setData(res);
    } else {
      console.error('unable to scan barcode');
    }
  }

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner"),
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          setBarcode("Error initializing barcode scanner");
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      setBarcode(data.codeResult.code);
      handleScan();
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div className="flex justify-center items-center text-left flex-col gap-3 overflow-y-auto">
      <h2 className="font-semibold text-2xl mt-3">Add a barcode</h2>
      <p className="text-sm text-slate-800 mb-5">
        Upload or scan your prescription barcode to learn more
      </p>
      <div className="flex flex-row space-between gap-x-6 mb-5 align-middle">
        <label
          htmlFor="logo"
          className="bg-indigo-200 text-indigo-900 hover:bg-indigo-300 rounded-xl px-4 py-2 text-sm font-medium cursor-pointer"
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
      {/* Barcode scanner */}
      <div className="flex flex-row justify-center items-center">
        <div id="barcode-scanner" />
        <p>Your results: {barcode}</p>
      </div>
    </div>
  );
};

export default Barcode;
