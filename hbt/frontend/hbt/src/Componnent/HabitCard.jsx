
import React, { useState, useEffect } from 'react';
import './HabitCard.css';
import { Delete } from "./allApi";
import { Complete, Uncomplete } from "./allApi"; // 👈 Add Uncomplete API call

const HabitCard = ({ habit, onDelete, onUpdate, onClick }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  if (!habit) return null;

  // ✅ Initialize completion for today if backend provides info
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (habit.completedDates?.includes(today)) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [habit]);

  const handleDelete = async () => {
    try {
      console.log('Deleting habit with id:', habit._id);
      await Delete(habit._id, { withCredentials: true });
      onDelete(habit._id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdate = () => {
    onUpdate(habit);
  };



  // ✅ Toggle Complete / Incomplete (without deleting the habit)
  const handleComplete = async (e) => {
    const checked = e.target.checked;
    setIsCompleted(checked); // update UI immediately
    // const today = new Date().toISOString().split('T')[0];
     const today = new Date().toLocaleDateString('en-CA');

    try {
      if (checked) {
        // ✅ Mark as complete
        await Complete(habit._id, habit.days, today, { withCredentials: true });
        console.log(`Habit ${habit._id} marked complete for ${today}`);
      } else {
        // ❌ Mark as incomplete (keep habit)
        await Uncomplete(habit._id, today, { withCredentials: true });
        console.log(`Habit ${habit._id} marked incomplete for ${today}`);
      }
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  return (
    <div
      className={`habit-card ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
    >
      <div className="habit-card-header">
        <h3>{habit.name}</h3>
        <span className="category">{habit.category}</span>
      </div>

      <p>{habit.description}</p>

      <div className="streak-priority">
        <span className="streak">⭐ {habit.streak || '0'} day streak</span>
        <span className={`priority ${habit.priority.toLowerCase()}`}>
          {habit.priority} Priority
        </span>
      </div>

      <div className="schedule">
        <strong>Schedule</strong>
        <div className="days">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className={`day ${habit.days?.includes(day) ? 'active' : ''}`}
            >
              {day[0]}
            </div>
          ))}
        </div>
      </div>

      <div className="time-duration">
        <div>⏰ Time: {habit.time}</div>
        <div>🕒 Duration: {habit.duration} mins</div>
      </div>

      {habit.enableReminder && (
        <div className="reminder">
          🔔 Reminder at {habit.reminderTime || 'N/A'}
        </div>
      )}

      <div className="goal">
        <strong>Goal:</strong> {habit.goal}
      </div>

      {/* <div className="note">
        <strong>Today's Note:</strong> {habit.notes || 'No note yet'}
      </div> */}

      <div className="habit-actions">
        <button onClick={handleDelete}>🗑️ Delete</button>
        <button onClick={handleUpdate}>✏️ Update</button>
        <label className="complete-checkbox">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleComplete}
          />
          Mark as Complete
        </label>
      </div>
    </div>
  );
};

export default HabitCard;


