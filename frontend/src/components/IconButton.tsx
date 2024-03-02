import { Tooltip } from "antd"
import { ReactNode } from "react"

type IconButtonProps = {
  title: string,
  children: ReactNode,
  onClick?: () => void
}

const IconButton = ({ title, children, onClick }: IconButtonProps) => {
  return (
    <Tooltip title={title}>
      <button className="hover:text-indigo-600" onClick={onClick}>
        {children}
      </button>
    </Tooltip>
  )
}

export default IconButton
