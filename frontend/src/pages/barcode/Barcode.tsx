import { useEffect, useState } from "react";
import Quagga from "quagga";

const Barcode = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [barcode, setBarcode] = useState('Scanning...');
  const [data, setData] = useState([]);

  const handleScan = async () => {
    const response = await fetch(`https://unihack-2024-backend.zax.sh/scan?barcode=${barcode}`);
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
        Scan your prescription barcode to learn more
      </p>
      {/* Barcode scanner */}
      <div className="flex flex-col justify-center items-center">
        <p className="mb-4">Your results: {barcode}</p>
        <div id="barcode-scanner" />
      </div>
    </div>
  );
};

export default Barcode;
