import Booking from "./Booking";
import Images from "./Images";

export default interface House {
  _id: string;
  details: {
    name: string;
    description: string;
  };
  isVerified: boolean;
  rating: number;
  price: {
    original_price: number;
  };
  images: Images[];
  property_type: string;
  address: {
    full: string;
  };
  bookings: Booking[];
}
