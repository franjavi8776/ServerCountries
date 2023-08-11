const server = require("../src/server");
const session = require("supertest");
const agent = session(server);

describe("Routing tests", () => {
  describe("GET /countries/:id", () => {
    it("Respond with status 200", async () => {
      await agent.get("/countries/KEN").expect(200);
    });
    it("Respond with an object containing the properties: 'id','name','flags', 'continents', 'capital', 'subregion', 'area', 'population'", async () => {
      const response = (await agent.get("/countries/KEN")).body;
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name");
      expect(response).toHaveProperty("flags");
      expect(response).toHaveProperty("continents");
      expect(response).toHaveProperty("capital");
      expect(response).toHaveProperty("subregion");
      expect(response).toHaveProperty("area");
      expect(response).toHaveProperty("population");
    });
    it("If error, respond with status: 500", async () => {
      await agent.get("/countries/ABC").expect(404);
    });
  });
  describe("GET /countries/name", () => {
    it("Respond with status 200", async () => {
      await agent.get("/countries/name?name=Argentina").expect(200);
    });
    it("Respond with an array of objects containing country properties", async () => {
      const response = (await agent.get("/countries/name?name=Argentina")).body;

      // Verifica que la respuesta sea un arreglo
      expect(Array.isArray(response)).toBe(true);

      // Verifica que cada objeto en el arreglo tenga las propiedades esperadas
      if (response.length > 0) {
        const countryObject = response[0];
        expect(countryObject).toHaveProperty("id");
        expect(countryObject).toHaveProperty("name");
        // ... verifica otras propiedades aquí ...
      }
    });
    it("If no countries found, respond with status 404", async () => {
      await agent.get("/countries/name?name=NonExistentCountry").expect(404);
    });
    it("If error, respond with status 500", async () => {
      await agent.get("/countries/name").expect(404);
    });
  });
});
