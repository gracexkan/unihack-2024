import { WarningOutlined } from "@ant-design/icons";
type PillProps = {
  message: string
}

const Pill = ({ message }: PillProps) => {
  return (
    <div className="flex flex-row justify-evenly gap-2 bg-orange-200 text-orange-700 rounded-lg text-xs p-2">
      <WarningOutlined />
      {message}
    </div>
  );
}

export default Pill;
