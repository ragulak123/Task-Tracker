const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");
const Task = require("../models/Task");

// Add tasks in DB
exports.addTask = async (req, res) => {
  try {
    const taskObj = req.body;
    await new Task(taskObj).save();
    return res
      .status(201)
      .json({ message: "Tasks added successfully...", taskObj });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update tasks in DB
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const opt = { new: true };
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, opt);
    res.status(200).json({
      message: "Task is updated in the list...",
      updatedTask,
    });
  } catch (error) {
  
    return res.status(400).json({ message: error });
  }
};

// DeleteTask in DB
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    return res.status(200).send("Task is deleted in the list");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
//taskFind
exports.getStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const cas = new RegExp(`${id}`, "i");

    const getid = await Task.find({ status: { $regex: cas } }).lean();
    const getname = await Task.find({ title: { $regex: cas } }).lean();
    const getdescription = await Task.find({
      description: { $regex: cas },
    }).lean();
    const getpriority = await Task.find({ comment: { $regex: cas } }).lean();
    const getduration = await Task.find({ duration: { $regex: cas } }).lean();
    const getassign = await Task.find({ assigned_to: { $regex: cas } }).lean();
    var result;
    if (getid.length != 0) {
      result = getid;
      
    } else if (getname.length != 0) {
      result = getname;
      console.log("Taskname", result);
    } else if (getdescription.length != 0) {
      result = getdescription;
      
    } else if (getpriority.length != 0) {
      result = getpriority;
     
    } else if (getduration.length != 0) {
      result = getduration;
      
    } else if (getassign.length != 0) {
      result = getassign;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
