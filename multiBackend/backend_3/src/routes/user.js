import express from "express";
import userList from "../utils/userList.js";
const router = express.Router();

router.post("/", (req, res) => {
    const { id } = req.body;

    if (id == null) {
        return res.status(400).send("User Id not found");
    }

    const user = userList.find((e) => e.id === id);

    if (user) {
        return res.json({ ...user, message: "User fetched Successfully!" });
    }

    res.json({ message: "User not found" });
});

export default router;
