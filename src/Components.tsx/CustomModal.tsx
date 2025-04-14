import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { X } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CustomModal({
  children,
  buttonText,
  buttonClassName = "",
  headerText,
  eventId,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkip, setIsSkip] = useState(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);

  const navigate = useNavigate();

  const { data, isLoading } = useFetch({
    endpoint: `events/${eventId}`,
    method: "DELETE",
    skip: isSkip,
  });

  const handleDeleteEvent = () => {
    setIsSkip(false);
  };

  useEffect(() => {
    if (data) {
      toast("Event Deleted", { type: "success" });
      handleModalClose();
      navigate("/");
    }
  }, [data]);
  return (
    <>
      <button className={buttonClassName} onClick={handleModalOpen}>
        {buttonText}
      </button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div
          className="bg-white p-6 rounded-md shadow-lg w-full max-w-[90%] md:max-w-[700px] max-h-[80%] overflow-auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex justify-between">
          <p className="text-2xl">{headerText}</p>

            <X onClick={handleModalClose} className="cursor-pointer"/>
          </div>
          <hr />
          <div className="pt-8">{children}</div>
          <div className="flex justify-end mt-6 ">
            <button className="bg-slate-300 px-6 py-2 rounded-lg me-6 cursor-pointer">
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer"
              onClick={handleDeleteEvent}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomModal;
