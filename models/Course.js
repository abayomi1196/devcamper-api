import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"]
  },
  description: {
    type: String,
    required: [true, "Please add some description"]
  },
  weeks: {
    type: String,
    required: [true, "Please add the duration for this course"]
  },
  tuition: {
    type: Number,
    required: [true, "Please add the tuition cost"]
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add the minimum skill"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  }
});

export default mongoose.model("Course", CourseSchema);
