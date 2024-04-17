import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/pokemon", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
      params: {
        limit: 50,
        offset: 0,
      },
    });

    const pokemonData = response.data;

    res.json(pokemonData);
  } catch (error) {
    console.error("Error fetching data from PokeAPI:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
