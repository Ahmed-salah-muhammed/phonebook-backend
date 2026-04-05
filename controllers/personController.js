import { readData, writeData } from "../utils/fileHandler.js";

export const getAllPersons = async (req, res) => {
  const persons = await readData();
  res.json(persons);
};

export const getInfo = async (req, res) => {
  const persons = await readData();
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `);
};

export const getPerson = async (req, res) => {
  const persons = await readData();
  const person = persons.find((p) => p.id === req.params.id);

  if (!person) {
    return res.status(404).json({ error: "person not found" });
  }

  res.json(person);
};

export const deletePerson = async (req, res) => {
  let persons = await readData();
  persons = persons.filter((p) => p.id !== req.params.id);

  await writeData(persons);

  res.status(204).end();
};

export const createPerson = async (req, res) => {
  const { name, number } = req.body;
  const persons = await readData();

  if (!name || !number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  if (persons.some((p) => p.name === name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: new Date(),
    name,
    number,
  };

  await writeData([...persons, newPerson]);

  res.status(201).json(newPerson);
};
