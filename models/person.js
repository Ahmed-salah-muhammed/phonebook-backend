import mongoose from "mongoose";
import validate from "validator";

const phoneValidator = (val) => {
  return /^\d{2,3}-\d+$/.test(val) && val.length >= 8;
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long"],
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: phoneValidator,
      message: "Phone number must formatted as XX-XXXXXX or XXX-XXXXXX",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
