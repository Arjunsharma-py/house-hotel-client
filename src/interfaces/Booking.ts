export default interface Booking {
  _id: number;
  success: string;
  check_in_date: Date;
  check_out_date: Date;
  name: string;
  house_name: string | null;
  amount: {
    total: number;
  };
}
