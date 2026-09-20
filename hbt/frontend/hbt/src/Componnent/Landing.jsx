// import React from 'react'
import React, { useState } from 'react';
import HabitForm from './HabitForm';
import HabitCard from './HabitCard';
import CalendarStreak from './CalendarStreak';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { getAllHabits} from "./allApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './swiper.css'
import './Landing.css'


const Landing = () => {

  const [habits, setHabits] = useState([]);      
  const [showForm, setShowForm] = useState(false); 
    const [selectedHabitId, setSelectedHabitId] = useState(null);


  const handleOpenForm = () => {
    setShowForm(true); 
  };

   useEffect(() => {
      const fetchHabits = async () => {
        try {
          const response = await getAllHabits( {withCredentials: true});
           setHabits(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error('Error fetching habits:', error);
        }
      };
  
      fetchHabits();
    }, []);

      const handleSaveHabit = (newHabit) => {
    setHabits([...habits, newHabit]); // add new habit to the list
    setShowForm(false);               // hide form after saving
  };


    const handleDelete = (id) => {
    setHabits((prev) => prev.filter((habit) => habit._id !== id));
  };

  const handleUpdate = (habit) => {
    console.log('Update habit:', habit);
    // Redirect to edit form or show modal
  };



 const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleClick = (habitId) =>{
        setSelectedHabitId(habitId);
        console.log("Selected Habit for Calendar:", selectedHabitId);
          const dashboardSection = document.getElementById("Dashboard");
  if (dashboardSection) {
    dashboardSection.scrollIntoView({ behavior: "smooth" });
  }};
  return (
  <div> 

  <div className="body">
    <section id='Habit'>
      <div className="container">

         <div className="navbar"> 
                 <h1> Habit</h1>

                <ul>
                 <li><a href="#Habit">Habit Page</a></li>
                 <li><a href="#show-habit">Show Habit Page</a></li>
                 <li><a href="#About">About</a></li>
                 <li><a href="#Dashboard">Streakboard</a></li>
                </ul>
            </div>
           
  <div className="btn">
        <button id='login-btn' onClick={handleLoginClick}>Login</button>
     </div>
   
           
    <div className="card">

  <div className="app-container">     
      {!showForm && (
        <div className="add-new-habit" onClick={handleOpenForm}>
          <div className="plus">+</div>
          <h3>Add New Habit</h3>
          <p>Create a new habit to track your progress</p>
   </div>
      )}
      {showForm && <HabitForm onSave={handleSaveHabit} />}
   </div>
         
   </div>

   </div> 
     </section>

          
   <section id="show-habit">
     <div className="showhabit">
       <h2 className='show-header'>Your Habits</h2>
       
 <Swiper
  modules={[Navigation, Pagination]}
  spaceBetween={10}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  mousewheel={true}
  breakpoints={{
    300: { slidesPerView: 1 },
    600: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
  {habits.map((habit) => (
    <SwiperSlide key={habit._id}>
      <HabitCard habit={habit} onDelete={handleDelete} onUpdate={handleUpdate} onClick={() =>handleClick(habit._id)} />
    </SwiperSlide>
  ))}
</Swiper>

  </div>
</section>

     <section id='About'>
         <div className="about">
          <h2>About</h2>
          <div className="para-container">
            <p>
  Our Habit Tracker App helps you build better routines, one day at a time. 
  Whether you’re aiming to exercise more, read daily, learn a new skill, or simply 
  stay consistent, this tool makes it easy to stay on track.  

  <br /><br />
  You can create personalized habits, set reminders, and visualize your progress 
  through interactive streaks and completion charts. Each habit card lets you 
  mark your daily progress, update goals, and track consistency over time.  

  <br /><br />
  The dashboard provides a clear view of your daily, weekly, and monthly activity, 
  motivating you to keep going even when it’s tough. You’ll also find a calendar view 
  showing which days you’ve succeeded — because small steps every day add up to big results.  

  <br /><br />
  Designed with simplicity in mind, our Habit Tracker blends modern design 
  with easy functionality — so you can focus on what really matters: 
  building habits that transform your life.
</p>

          </div>
         </div>
      </section>



    <section id='Dashboard'>
          <h2>Streakboard</h2>
      <div className="app">
         <aside className="sidebar">
          {/* <StreakSummary completed={64} missed={36} /> */}
        
    <div className="calendar">
      
    {selectedHabitId ? (
           <>
    <h4>
      {habits.find((habit) => habit._id === selectedHabitId)?. name || "Habit"}
    </h4>
    <CalendarStreak habitId={selectedHabitId} />
  </>  
    ) : (
          <p>Please click a habit card to view its calendar streak.</p>
        )}
</div>
      </aside>
      
    </div>
        </section>      
  </div>
   
</div>
  );
};


export default Landing