const   habitCard = require("../models/habitCard");
const  streak  = require("../models/completeDates");


exports.addNewHabit = async (req,res) => {

try{
    const userId = req.user._id;
    const data = req.body;
    const newHabit = new habitCard({
        userId:userId,
        name: data.name,
        category: data.category,
        description: data.description,
        days: Array.isArray(data.days) ? data.days : [],
        duration: data.duration,
        enableReminder: data.enableReminder,
        reminderTime: data.reminderTime,
        priority: data.priority,
        goal: data.goal,
        notes: data.notes
    });

   await newHabit.save();
   res.status(200).json({msg:"New habbit created",newHabit})

}catch(error){
    res.status(500).json({msg:"error from adding haibt ,server error",message:error.message});
}

}

exports.updateHabitData = async (req, res) => {
    try {
        const cardId = req.params.id;
        const data = req.body || {};

        const update = {};
        if (typeof data.name !== 'undefined') update.name = data.name;
        if (typeof data.category !== 'undefined') update.category = data.category;
        if (typeof data.description !== 'undefined') update.description = data.description;
        if (typeof data.days !== 'undefined') update.days = Array.isArray(data.days) ? data.days : [];
        if (typeof data.duration !== 'undefined') update.duration = data.duration;
        if (typeof data.enableReminder !== 'undefined') update.enableReminder = data.enableReminder;
        if (typeof data.reminderTime !== 'undefined') update.reminderTime = data.reminderTime;
        if (typeof data.priority !== 'undefined') update.priority = data.priority;
        if (typeof data.goal !== 'undefined') update.goal = data.goal;
        if (typeof data.notes !== 'undefined') update.notes = data.notes;

        const updatedHabit = await habitCard.findByIdAndUpdate(cardId, update, { new: true });

        if (!updatedHabit) {
            return res.status(404).json({ msg: 'Habit not found' });
        }

        res.status(200).json({ msg: 'Habit updated', updatedHabit });
    } catch (error) {
        res.status(500).json({ msg: 'Error updating habit', message: error.message });
    }
}

exports.getAllHabit = async (req,res) =>{
    try{
        const data  = req.user;
        // console.log(data)
        const allHabits = await habitCard.find({userId:data._id});
        res.status(200).json(allHabits);
    }catch(error){
        res.status(500).json({msg:"error from getting habit",message:error.message})
    }
}

exports.deleteHabit = async(req,res) =>{
    try{

        const data= req.params;
        console.log(data.id);
        const deletedHabit = await habitCard.findByIdAndDelete(data.id);
        res.status(200).json({"msg":"habit deleted succefull"});
    }catch(err){
        res.status(500).json({msg:"error in deleting habit",message:err.message});
    }
}

exports.completeHabit = async(req,res) =>{
    try{
        const userId = req.user._id;
        const cardId = req.params.id;
        const data = req.body;
        const day = Array.isArray(data.day) ? data.day : [data.day];
        const today = data.today;


        const exist = await streak.findOne({cardId});
        if(!exist){
            const newcomplete = new streak({
            userId: userId,
            cardId: cardId,
            completed: [today],
            day
            });
            await newcomplete.save();
        }
        else {
            await streak.updateOne(
            { cardId },
            {
                $push: { completed:today } 
            }
            );
        }

        res.status(200).json("done work")
    }catch(err){
        res.status(500).json({msg:"error from server",message:err.message})
    }
}

exports.removeStreakDate = async (req, res) => {
  try {
    const cardId = req.params.id;
    const habitStreak = await streak.findOne({ cardId });

    if (!habitStreak) {
      return res.status(404).json({ msg: "No streak found for this cardId" });
    }

    const targetDate = req.body.today; 
    const dateArray = habitStreak.completed;

    const index = dateArray.indexOf(targetDate);
    if (index !== -1) {
      dateArray.splice(index, 1);
      await habitStreak.save(); 
      return res.status(200).json({ msg: "Date removed successfully" });
    } else {
      return res.status(404).json({ msg: "Date not found in streak" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error from removeStreakDate", message: error.message });
  }
};


exports.habitData = async(req,res)=>{
    try{
        const cardId = req.params.id;
        console.log(cardId)
        const data = await streak.findOne({cardId});
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({msg:"error from fetching habitData",message:err.message});
    }
}