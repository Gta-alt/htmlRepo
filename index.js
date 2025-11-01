/** @format */
const { Pool } = require("pg");

// Connection pool configuration
const pool = new Pool({
	host: "localhost",
	port: 5433,
	database: "radio_talk_db",
	user: "group_2",
	password: "group2password",
});

(async () => {
	try {
		// Get a client connection from the pool
		const client = await pool.connect();
		console.log(" Connected successfully to PostgreSQL");

		// Optional test query
		const res = await client.query("SELECT * FROM radio.audio_url");
		console.log("Response : ", res.rows[0]);

		// Always release client back to pool
		client.release();
	} catch (error) {
		console.error(" Database connection error:", error.message);
	} finally {
		// Optionally close pool after test
		await pool.end();
	}
})();
