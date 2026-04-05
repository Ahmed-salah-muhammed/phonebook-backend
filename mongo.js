import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!password) {
  console.log("please provide password");
  process.exit(1);
}

const url = `mongodb+srv://ahmedsalah:${password}@cluster0.nvtqaog.mongodb.net/phonebook`;
console.log("Connecting to:", url);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", personSchema);

try {
  if (name && number) {
    const person = new Person({ name, number });
    await person.save();
    console.log(`added ${name} number ${number} to phonebook`);
  } else {
    const persons = await Person.find({});
    persons.forEach((p) => console.log(`${p.name} ${p.number}`));
  }
} catch (err) {
  console.error(err.message);
} finally {
  mongoose.connection.close();
}
