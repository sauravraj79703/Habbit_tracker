
import API from "./api"; 

export const signupUser = (name, email, password) =>
  API.post("/signup", { name, email, password });

export const loginUser = (email, password) =>
  API.post("/login", { email, password }); 

export const addNewHabit = (habitCard) =>
  API.post("/addNewHabit", habitCard);

export const getAllHabits = () =>
  API.get("/getAllHabits");


export const Delete = (habitId) =>
  // console.log(habitId)
  API.delete(`/delete/${habitId}`);




export const Complete = (habitId, day, today) =>
  API.post(`/complete/${habitId}`, { day, today });


export const Uncomplete = async (habitId, today, config) => {
  return API.post(`/deletestreak/${habitId}`, { today},config);
};

export const getCalender = (habitId) =>
  API.get(`/habitData/${habitId}`);

