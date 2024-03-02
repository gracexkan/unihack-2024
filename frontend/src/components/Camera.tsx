import { useState, useEffect, useRef } from "react";
import { CameraOutlined } from "@ant-design/icons";

type CameraProps = {
  isVisible: boolean;
  setPreview: (str: string) => void;
  setImage: (file: File) => void;
};

const Camera = ({ isVisible, setPreview, setImage }: CameraProps) => {
  const [width, setWidth] = useState<number>(320);
  const [height, setHeight] = useState<number>(0);
  const [streaming, setStreaming] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const startup = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const photo = photoRef.current;
      try {
        // TODO: change to be back facing
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (video && canvas && photo) {
          video.srcObject = stream;
          video.play();
          video.addEventListener(
            "canplay",
            function (ev) {
              if (!streaming) {
                setHeight(video.videoHeight / (video.videoWidth / width));
                if (isNaN(height)) {
                  setHeight(width / (4 / 3));
                }
                video.setAttribute("width", width.toString());
                video.setAttribute("height", height.toString());
                canvas.setAttribute("width", width.toString());
                canvas.setAttribute("height", height.toString());
                setStreaming(true);
              }
            },
            false
          );
        }
      } catch (err) {
        console.log("An error occurred: " + err);
      }
    };

    startup();
  }, [width, height, streaming]);

  const clearphoto = () => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.fillStyle = "#AAA";
      context.fillRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      const data = canvasRef.current?.toDataURL("image/png");
      if (photoRef.current) {
        photoRef.current.setAttribute("src", data || "");
      }
    }
  };

  const takepicture = () => {
    const context = canvasRef.current?.getContext("2d");
    if (context && width && height) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      context.drawImage(
        videoRef.current || new HTMLVideoElement(),
        0,
        0,
        width,
        height
      );
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'image.png', { type: 'image/png' });
          console.log(file)
          setImage(file);
          setPreview(URL.createObjectURL(file))
        }
      }, 'image/png');
    } else {
      clearphoto();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <video ref={videoRef} id="video">
        Video stream not available.
      </video>
      {isVisible && (
        <button
          onClick={takepicture}
          className="bg-indigo-500 text-white rounded-xl px-4 py-2 text-sm font-medium my-4"
        >
          <CameraOutlined />{" "}
          Capture photo
        </button>
      )}
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div className="output">
        <img ref={photoRef} id="photo" />
      </div>
    </div>
  );
};

export default Camera;
