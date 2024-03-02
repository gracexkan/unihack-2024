import { DatePicker } from "antd";
import { useEffect, useRef } from "react";

// taken from https://codesandbox.io/s/datetime-picker-ant-design-sh57oc?file=/src/App.js
const DateTimePicker = () => {
  // cannot find picker ref type from antd
  const ref = useRef<HTMLInputElement | any>(null);

  useEffect(() => {
    console.log(ref.current);
    if (!ref.current) throw Error ("ref is not assigned")
    ref.current.focus();
  }, []);

  return (
    <DatePicker
      ref={ref}
      format="DD/MM/YYYY hh:mm A"
      onChange={(date, dateString) => console.log(date, dateString)}
      showTime={{ use12Hours: true }}
    />
  );
};

export default DateTimePicker;
