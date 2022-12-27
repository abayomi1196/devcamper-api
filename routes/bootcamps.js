import { Router } from "express";

// initialize router
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Show all bootcamps!" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Create new bootcamps!" });
});

router.patch("/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `Update specific bootcamp with id: ${req.params.id}!` });
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `Get specific bootcamp with id: ${req.params.id}!` });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .json({ message: `Delete bootcamp with id: ${req.params.id}!` });
});

export default router;
