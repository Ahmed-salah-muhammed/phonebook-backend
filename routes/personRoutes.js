import { Router } from "express";
import {
  getAllPersons,
  getPerson,
  deletePerson,
  createPerson,
  updatePerson,
} from "../controllers/personController.js";

const router = Router();

router.get("/persons", getAllPersons);
router.get("/persons/:id", getPerson);
router.delete("/persons/:id", deletePerson);
router.post("/persons", createPerson);
router.put("/persons/:id", updatePerson);

export default router;
