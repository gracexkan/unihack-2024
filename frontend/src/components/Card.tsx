import { ReactNode } from "react";

type CardProps = {
  children: ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="w-full flex justify-center items-center bg-slate-100 p-10 px-12 rounded-lg">
      <h2>{children}</h2>
    </div>
  )
}

export default Card;
