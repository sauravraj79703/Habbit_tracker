


import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStreak.css';
import { getCalender } from './allApi';

export default function CalendarStreak({ habitId }) {
  const [date, setDate] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await getCalender(habitId);
       
        if (res.data && Array.isArray(res.data.completed)) {
          setCompletedDates(res.data.completed);
        } else {
          console.warn("Unexpected response format", res.data);
        }
      } catch (err) {
        console.error('Failed to fetch completed dates:', err);
      }
    };

    fetchCompleted();
  }, [habitId]);

  const isDateCompleted = (tileDate) => {
    // const dateStr = tileDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const dateStr = tileDate.toLocaleDateString('en-CA');
    return completedDates.includes(dateStr);
  };

  return (
    <div className="calendar-streak">
      <h3>Calendar Streak</h3>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) =>
          isDateCompleted(date) ? 'streak-day' : null
        }
      />
    </div>
  );
}



