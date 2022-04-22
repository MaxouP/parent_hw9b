import express from "express";
import cors from "cors";

const router = express.Router();
const app = express();

let data = {};

router.get("/form", (req, res) => {
	console.log('Send', data);
	res.json(data);
});

router.post("/form", async (req, res) => {
	data = req.body;
	res.json(`${data.nameInput}, Thank you for your order. We will keep you posted on delivery status at ${data.emailInput}`);
});
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(8080, async () => {
	console.log(`Ready on port 8080`);
});
