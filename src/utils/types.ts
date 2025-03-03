export interface EventData {
  id: number | string;
  name: string;
  description: string;
  date: string;
  location: string;
  availableSeats: number;
  ticketPrice: number;
  image: string;
  category: string;
  duration: string;
  isMticketAvailable: boolean;
}

export type ReduxState = {
  auth: Auth;
};

export type Auth = {
  user: UserData;
  token: string;
};

export interface UserData {
  firstName: string;
  lastName: string;
  role: string;
  token : string;
  email: string
}
export interface Options { 
  value: string ;
  label: string

}