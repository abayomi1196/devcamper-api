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

// static mongo method to getAverage course tuition
CourseSchema.static("getAverageCost", async function (bootcampId) {
  const obj = await this.aggregate([
    { $match: { bootcamp: bootcampId } },
    {
      $group: { _id: "$bootcamp", averageCost: { $avg: "$tuition" } }
    }
  ]);

  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.error(err);
  }
});

// middleware for getting average cost after saving a course
CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

// middleware for getting average cost before removing a course
CourseSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

export default mongoose.model("Course", CourseSchema);
