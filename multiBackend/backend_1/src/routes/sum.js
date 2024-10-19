import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
    const { a, b } = req.body;

    if (a == null || b == null) {
        return res.status(400).send("Invalid input");
    }
    console.log(req.body);
    
    res.json({ result: a + b });
});

export default router;
