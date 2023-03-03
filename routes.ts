import { Router } from "https://deno.land/x/oak/mod.ts";
import { addPlayer, getPlayers, getPlayer } from "./controllers/players.ts";
import { getTeams } from "./controllers/teams.ts";

const router = new Router();

// Implement routes
router
  .post("/api/players", addPlayer) // Add a player
  .get("/api/players", getPlayers) // Get all players
  .get("/api/getPlayer/:id", getPlayer) // Get a single player
  .get("/api/getTeams", getTeams) // Get all teams

export default router;