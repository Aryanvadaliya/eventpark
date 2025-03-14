import { ReactNode } from "react";

function EventDetails({
  children,
  title,
  value,
  extraValue,
}: {
  children: ReactNode;
  title: string;
  value: string | ReactNode;
  extraValue?: string;
}) {
  return (
    <div className="flex md:w-1/2 w-full my-2 items-center">
      <div className="bg-blue-100  min-w-[70px] min-h-[70px] w-[70px] h-[70px] flex justify-center items-center p-2">
        {children}
      </div>
      <div className="ms-6 ">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-wrap">{value}</p>
        {extraValue && <p>{extraValue}</p>}
      </div>
    </div>
  );
}

export default EventDetails;
