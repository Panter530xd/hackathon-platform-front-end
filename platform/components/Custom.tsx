import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Clock } from "tabler-icons-react";

interface CustomTimePickerProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (...event: any[]) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  id,
  placeholder,
  value,
  onChange,
}) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
    onChange(time);
  };

  const CustomInput = React.forwardRef<HTMLInputElement | null>(
    ({ value, onClick }: any, ref) => {
      const [inputValue, setInputValue] = useState(value || "");

      useEffect(() => {
        setInputValue(value || "");
      }, [value]);

      return (
        <div
          className="flex justify-between items-center w-32 h-10 rounded-md border border-gray-300 px-2 cursor-pointer"
          onClick={onClick}
        >
          <span className="mr-2">{inputValue || placeholder}</span>
          <Clock size={20} className="text-gray-500" />
          <input
            type="text"
            className="hidden"
            ref={ref}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      );
    }
  );

  return (
    <div>
      <DatePicker
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        customInput={<CustomInput ref={inputRef} />}
        placeholderText={placeholder}
      />
    </div>
  );
};

export default CustomTimePicker;
