import Booking from "./Booking";
import Images from "./Images";

export default interface User {
  _id: string;
  name: string;
  profilepic: Images;
  user_type: string;
  address: {
    full: string;
  };
  notifications: {
    title: string;
    content: string;
    date: Date;
    isUnread: boolean;
  }[];
  kyc: {
    level: number;
  };
  settings: string[];
  bookings: Booking[];
}
