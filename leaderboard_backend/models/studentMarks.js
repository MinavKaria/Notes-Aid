import mongoose from "mongoose";

const studentMarksSchema = new mongoose.Schema(
  {
    seat_number: { type: String, required: true, index: true },
    name: { type: String, required: true },
    admission_year: { type: Number, required: true, index: true },
    sgpa_list: [
      {
        semester: { type: Number, required: true },
        sgpa: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Adding text index for full-text search
studentMarksSchema.index({
  seat_number: "text",
  name: "text",
});

const StudentMarks = mongoose.model(
  "StudentMarks",
  studentMarksSchema,
  "students"
);
export default StudentMarks;
