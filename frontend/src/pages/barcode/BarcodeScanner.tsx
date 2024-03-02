import { useEffect, useState } from "react";
import Quagga from "quagga";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("Scanning...");
  const [scanSuccess, setScanSuccess] = useState(false);
  const handleScan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8088/scan?barcode=${barcode}`
      );
      if (!response.ok) {
        setScanSuccess(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      setScanSuccess(true);
      console.log(data);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      setScanSuccess(false);
    }
  };

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
    <div className="flex flex-col items-center justify-center">
      <div id="barcode-result">Result: {barcode}</div>
      <div id="barcode-scanner" className="w-4/5"></div>
    </div>
  );
};

export default BarcodeScanner;
