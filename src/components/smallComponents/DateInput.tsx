import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  date_picker_id: string;
  disabled_dates: Date[];
  checkInDate: Date;
  checkOutDate: Date;
  date: Date;
  onSetDate: (date: Date) => void;
}

function getDatesInRange(startDate: Date, endDate: Date) {
  const dateArray = [];
  const currentDate = new Date(startDate.getTime() + 1);

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

const DateInput = ({
  date_picker_id,
  disabled_dates,
  checkInDate,
  checkOutDate,
  date,
  onSetDate,
}: Props) => {
  const disabledDates: Date[] = disabled_dates;

  return (
    <div className="customDatePickerWidth">
      <DatePicker
        id={date_picker_id}
        selected={date}
        onChange={onSetDate}
        excludeDates={disabledDates}
        placeholderText="Select a date"
        highlightDates={getDatesInRange(checkInDate, checkOutDate)}
      />
    </div>
  );
};

export default DateInput;
