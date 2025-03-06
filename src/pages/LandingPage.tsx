import {
  Autocomplete,
  CircularProgress,
  createFilterOptions,
  Input,
  TextField,
} from "@mui/material";
import { citiesData } from "../utils/citiesData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventData, Options, ReduxState } from "../utils/types";
import {
  BookOpen,
  BriefcaseBusiness,
  Film,
  Handshake,
  Laugh,
  Music,
  Palette,
  PartyPopper,
  Salad,
  Shirt,
  Soup,
} from "lucide-react";
import EventBox from "../Components.tsx/EventBox";
import { useDebounce } from "../hooks/useDebounce";
import { useAuth } from "../hooks/AuthContext";

function LandingPage() {
  const [nameInput, setNameInput] = useState("");
  const [eventList, setEventList] = useState<Array<EventData>>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [categories, setCategories] = useState([]);
  const { currentUser, userId } = useAuth();

  const debouncedValue = useDebounce(nameInput, 700);

  const iconMapping: { [key: string]: React.ComponentType } = {
    Music: Music,
    Film: Film,
    Art: Palette,
    Business: BriefcaseBusiness,
    Conference: Handshake,
    Wellness: Salad,
    Comedy: Laugh,
    Festival: PartyPopper,
    Fashion: Shirt,
    Literature: BookOpen,
    "Food & Drink": Soup,
  };

  useEffect(() => {
    (async function getData() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_URL
          }/events?name_like=${debouncedValue}&location_like=${selectedCity}`
        );
        const eventList = await response.json();
        setEventList(eventList);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [debouncedValue, selectedCity]);

  useEffect(() => {
    (async function getCategories() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/categories`
        );
        const categories = await response.json();
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {userId && !currentUser ? (
        <CircularProgress />
      ) : (
        <>
          <div className="w-full bg-blue-950 h-[300px] flex flex-col justify-center items-center text-white text-4xl text-center">
            <h1 className="mb-4">Pickup your wonderful plans now</h1>
            <div className="md:flex md:flex-row flex-col bg-white gap-8 justify-center text-black md:w-1/2 w-[80%] mx-4 p-4">
              <Input
                placeholder="Explore Events"
                value={nameInput}
                className="md:w-[40%] w-full"
                onChange={(e) => setNameInput(e.target.value)}
              />

              <Autocomplete
                options={citiesData}
                className="md:w-[40%] border-none outline-none"
                filterOptions={createFilterOptions({
                  stringify: (option: Options) => option.label,
                  matchFrom: "start",
                  limit: 10,
                })}
                onChange={(e: any, city: Options | null) =>
                  setSelectedCity(city?.value ?? "")
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select city" />
                )}
                getOptionLabel={(option) => option.label}
                autoSelect
              />
            </div>
          </div>
          <div className="md:my-6 md:mx-12 mx-4 my-4 font-semibold">
            <h1 className="text-3xl">Explore by categories</h1>
            <div className=" flex gap-12  items-center overflow-auto my-4">
              {categories.map((category: any, index) => {
                const IconComponent = iconMapping[category?.name];
                return IconComponent ? (
                  <Link
                    to={`categories/${category.name}`}
                    key={index}
                    className="min-w-[100px] min-h-[100px] rounded-md bg-slate-200 flex flex-col justify-center items-center"
                  >
                    <IconComponent />
                    <p>{category.name}</p>
                  </Link>
                ) : null;
              })}
            </div>
            <h1 className="text-3xl">Upcoming Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 justify-items-center mt-4">
              {eventList?.map((event: EventData) => (
                <EventBox event={event} key={event.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LandingPage;
