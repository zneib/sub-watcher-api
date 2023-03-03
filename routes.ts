import { Router } from "https://deno.land/x/oak/mod.ts";
import { getPlayers } from "./controllers/players.ts";

const router = new Router();

// Implement routes
router
  // .post("/api/players", addPlayer) // Add a player
  .get("/api/players", getPlayers) // Get all players

export default router;