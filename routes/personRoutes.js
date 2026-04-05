import { Router } from "express";
import {
  getAllPersons,
  getPerson,
  deletePerson,
  createPerson,
} from "../controllers/personController.js";

const router = Router();

router.get("/persons", getAllPersons);
router.get("/persons/:id", getPerson);
router.delete("/persons/:id", deletePerson);
router.post("/persons", createPerson);

export default router;
