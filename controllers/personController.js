import Person from "../models/person.js";

export const getAllPersons = async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
};

export const getInfo = async (req, res) => {
  const count = await Person.countDocuments({});
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
  `);
};

export const getPerson = async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);

    if (!person) {
      return res.status(404).json({ error: "person not found" });
    }

    res.json(person);
  } catch (err) {
    next(err);
  }
};

export const deletePerson = async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const createPerson = async (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  try {
    const existingPerson = await Person.findOne({ name });

    if (existingPerson) {
      const updated = await Person.findByIdAndUpdate(
        existingPerson._id,
        { number },
        { new: true, runValidators: true, context: "query" },
      );
      return res.json(updated);
    }

    const person = new Person({
      name,
      number,
    });
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    next(err);
  }
};

export const updatePerson = async (req, res, next) => {
  const { number } = req.body;

  try {
    const updated = await Person.findByIdAndUpdate(
      req.params.id,
      { number },
      { new: true, runValidators: true, context: "query" },
    );

    if (!updated) {
      return res.status(404).json({ error: "person not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};
