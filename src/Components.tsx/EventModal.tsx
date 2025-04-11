import {
  Autocomplete,
  createFilterOptions,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { Options } from "../utils/types";

const validationSchema = {
  name: Yup.string().required(),
  description: Yup.string().required(),
  date: Yup.date().required(),
  location: Yup.string().required(),
  availableSeats: Yup.number().min(5, "Minimum 5 Tickets are required!"),
  ticketPrice: Yup.number()
    .required()
    .min(99, "Minimum Ticket Price should be 99 Rs"),
  image: Yup.string().required(),
  category: Yup.string().required(),
  duration: Yup.string().required(),
};

function EventModal({ eventData = null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [isSkip, setIsSkip] = useState(true);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
    formik.resetForm();
    if (eventData) setValues({ ...eventData, date: moment(eventData.date) });
  };

  const initialValues = {
    name: "",
    description: "",
    date: moment(),
    location: "",
    availableSeats: 0,
    ticketPrice: 0,
    image: "",
    category: "",
    duration: "",
  };

  const handleSubmit = () => {
    setIsSkip(false);
  };
  const { data: categoriesData } = useFetch({ endpoint: "categories" });

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues,
    validationSchema: Yup.object().shape(validationSchema),
  });
  const { getFieldProps, values, setFieldValue, errors, setValues } = formik;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFieldValue("image", reader.result);
    reader.readAsDataURL(file);
  };

  const { data, isLoading: isDataLoading } = useFetch({
    endpoint: eventData ? `events/${eventData.id}` : "events",
    method: eventData ? "PUT" : "POST",
    body: JSON.stringify(values),
    skip: isSkip,
  });

  // useEffect(() => {
  //   if (eventData) setValues({ ...eventData, date: moment(eventData.date) });
  // }, [eventData]);

  useEffect(() => {
    let timerId = null;
    if (!data) return;
    if (data.name && eventData) {
      toast("Event Updated", { type: "success", autoClose: 2000 });
      handleModalClose();
      timerId = setTimeout(() => window.location.reload(), 2000);
    } else {
      toast("Event Added", { type: "success", autoClose: 2000 });
      handleModalClose();
      timerId = setTimeout(() => navigate(`event/${data.id}`), 2000);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [data]);

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ms-auto my-6 cursor-pointer"
        onClick={handleModalOpen}
      >
        {eventData ? "Edit Event" : "Add Event"}
      </button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          className="bg-white p-6 rounded-md shadow-lg w-full max-w-[90%] md:max-w-[700px] max-h-[80%] overflow-auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-semibold">
              {eventData ? "Edit Event" : "Add Event"}
            </p>
            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          <hr className="mb-4" />
          <form
            onSubmit={formik.handleSubmit}
            className="flex justify-center flex-wrap"
          >
            <div className="flex gap-x-12 flex-wrap">
              <div className="md:w-5/12 w-full">
                <label htmlFor="name" className="block mb-1">
                  Name:
                </label>
                <TextField
                  name="name"
                  size="small"
                  placeholder="Name"
                  fullWidth
                  {...getFieldProps("name")}
                  className="mb-4"
                  error={!!errors.name}
                  helperText={!!errors.name && errors.name}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="description" className="block mb-1">
                  Description:
                </label>
                <TextField
                  name="description"
                  size="small"
                  placeholder="Description"
                  fullWidth
                  {...getFieldProps("description")}
                  className="mb-4"
                  multiline
                  error={!!errors.name}
                  helperText={!!errors.name && errors.description}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="date" className="block mb-1">
                  Date and time
                </label>
                <MobileDateTimePicker
                  defaultValue={values.date}
                  format="DD-MM-YYYY hh:m a"
                  className="w-full"
                  onChange={(newDate) => setFieldValue("date", newDate)}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="location" className="block mb-1">
                  Location:
                </label>
                <TextField
                  name="location"
                  size="small"
                  placeholder="Location"
                  fullWidth
                  {...getFieldProps("location")}
                  className="mb-4"
                  error={!!errors.location}
                  helperText={!!errors.location && errors.location}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="availableSeats" className="block mb-1">
                  Available Seats:
                </label>
                <TextField
                  name="availableSeats"
                  size="small"
                  placeholder="Available Seats"
                  fullWidth
                  type="number"
                  {...getFieldProps("availableSeats")}
                  className="mb-4"
                  error={!!errors.availableSeats}
                  helperText={!!errors.availableSeats && errors.availableSeats}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="ticketPrice" className="block mb-1">
                  Ticket Price:
                </label>
                <TextField
                  name="ticketPrice"
                  size="small"
                  placeholder="Ticket Price"
                  fullWidth
                  type="number"
                  {...getFieldProps("ticketPrice")}
                  className="mb-4"
                  error={!!errors.ticketPrice}
                  helperText={!!errors.ticketPrice && errors.ticketPrice}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="image" className="block mb-1">
                  Event Image:
                </label>
                <TextField
                  name="image"
                  type="file"
                  size="small"
                  fullWidth
                  onChange={handleFileChange}
                  className="mb-4"
                  error={!!errors.image}
                  helperText={!!errors.image && errors.image}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="category" className="block mb-1">
                  Category:
                </label>
                <TextField
                  name="category"
                  size="small"
                  placeholder="Category"
                  fullWidth
                  {...getFieldProps("category")}
                  className="mb-4"
                  error={!!errors.category}
                  helperText={!!errors.category && errors.category}
                />
              </div>
              <div className="md:w-5/12 w-full ">
                <label htmlFor="duration" className="block mb-1">
                  Event Duration: <span>(i.e 2 hours )</span>
                </label>
                <TextField
                  name="duration"
                  size="small"
                  placeholder="Event Duration"
                  fullWidth
                  {...getFieldProps("duration")}
                  className="mb-4"
                  error={!!errors.duration}
                  helperText={!!errors.duration && errors.duration}
                />
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button
                type="submit"
                disabled={isDataLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ms-auto mt-6 mb-2 cursor-pointer"
              >
                {eventData ? "Update Event" : "Add Event"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default EventModal;
