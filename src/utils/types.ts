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
  isMticketAvailable: boolean
}

