/** @format */
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());

const pool = new Pool({
	host: "localhost",
	port: 5433,
	database: "radio_talk_db",
	user: "group_2",
	password: "group2password",
});

app.get("/api/audio", async (req, res) => {
	try {
		const { rows } = await pool.query(
			"SELECT * FROM radio.audio_url"
		);
		res.json(rows);
	} catch (error) {
		console.error("Database Error:", error);
		res.status(500).json({ error: "Failed to fetch audio URLs" });
	}
});

// app.post('/api/audio', async (req, res)=>{
// 	try {
// 		const {}

// 	} catch (error) {

// 	}
// });

app.listen(4000, () =>
	console.log("Server running on http://localhost:4000")
);
