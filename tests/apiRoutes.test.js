const axios = require("axios");

describe("API Routes", () => {
	describe("get request on /api/notes", () => {
		it("should return a status code of 200", async () => {
			const { status } = await axios.get("/api/notes");
			expect(status).toBe(200);
		});
		it("should have content type json", async () => {
			const expectedContentType = "application/json";
			const { headers } = await axios.get("/api/notes");

			const hasJSON =
				JSON.stringify(headers).indexOf(expectedContentType) !== -1;

			expect(hasJSON).toBe(true);
		});
		it("should return an array", async () => {
			const { data } = await axios.get("/api/notes");
			const isArray = Array.isArray(data);
			expect(isArray).toBeTruthy();
			expect(data).toBeTruthy();
		});
		it("it should return an array of objects if it's not empty", async () => {
			const { data } = await axios.get("/api/notes");
			const isObject = typeof data[0] === "object";

			if (data.length > 0) {
				expect(isObject).toBe(true);
			} else {
				expect(isObject).toBe(false);
			}
		});
		it("should have the correct properties (title, text, id)", async () => {
			const { data } = await axios.get("/api/notes");
			const isObject = typeof data[0] === "object";

			if (data.length > 0) {
				const [note] = data;
				const { title, text, id } = note;
				expect(title).toBeTruthy();
				expect(text).toBeTruthy();
				expect(id).toBeTruthy();
			} else {
				expect(isObject).toBe(false);
			}
		});
	});

	describe("POST request on api routes", () => {
		it("should return a status code of 200", async () => {
			const response = await axios.post("/api/notes");
			const { status } = response;
			expect(status).toBe(200);
		});
		it("should have something in the request body", async () => {
			const response = await axios.post("/api/notes", {
				title: "Hello",
				text: "World",
			});
			const { data } = response;
			expect(data).toBeTruthy();
		});
		// it("should return a status code of 500 and an error if there are any missing fields in the note", async () => {
		// 	const { data, status } = await axios.post("/api/notes", {
		// 		title: "Hello",
		// 	});
		// 	const err = new Error("Missing required fields!");
		// 	expect(status).toBe(500);
		// 	expect(data).toEqual(err);
		// });
	});

	describe("DELETE request on api routes", () => {
		it("should return a status code of 200", async () => {
			const response = await axios.post("/api/notes");
			const { status } = response;
			expect(status).toBe(200);
		});
	});
});
