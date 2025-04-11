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
  id: string;
  tickets: any;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
  email: string;
}
export interface Options {
  value?: string;
  label?: string;
  name?: string;
  id?: string
}

export interface TicketData {
  ticketNumber: number;
  image: string;
  date: moment.MomentInput;
  name: string;
  price: string | number;
  quantity: string | Number;
}