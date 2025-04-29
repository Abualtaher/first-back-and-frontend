import { Router } from "express";
import Task from "../module/Task";

const router = Router();

router.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "title is needed!" });
    const task = await Task.create({ title });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  await task.destroy();
  res.json({ message: "Task removed" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  const { completed } = req.body;
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.set({ completed });
  task.save();
  res.json(task);
});
export default router;
