import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = ({ onSelectDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (selectedDate) => {
        setSelectedDate(selectedDate);
        onSelectDate(selectedDate);
    };

    const generateCalendarDays = () => {
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const days = [];

        // Adjust firstDayOfMonth to start from Sunday (if needed)
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            days.push(
                <button
                    key={i}
                    onClick={() => handleDateSelect(currentDate)}
                    className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-100 transition-colors ${
                        format(currentDate, "dd-MM-yyyy") === format(selectedDate, "dd-MM-yyyy") ? "bg-blue-500 text-white" : ""
                    }`}
                    aria-label={`Select date: ${format(currentDate, "MMMM d, yyyy")}`}
                >
                    {i}
                </button>
            );
        }

        return days;
    };

    const handlePreviousMonth = () => {
        setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
    };

    return (
        <div className="relative w-full max-w-xs mx-auto">
            <div className="absolute z-50 mt-2 bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-lg p-4 w-64">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handlePreviousMonth}
                        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Previous month"
                    >
                        <FaChevronLeft className="text-gray-600" />
                    </button>
                    <h2 className="text-md font-semibold text-gray-800">
                        {format(currentMonth, "MMMM yyyy")}
                    </h2>
                    <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Next month"
                    >
                        <FaChevronRight className="text-gray-600" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div key={day} className="text-xs font-semibold text-gray-600">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
            </div>
        </div>
    );
};

export default Calendar;
