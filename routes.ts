import { Router } from "https://deno.land/x/oak/mod.ts";
import { addPlayer, getPlayers, getPlayer } from "./controllers/players.ts";
import { addTeamPicture, addTeamTest, getTeams } from "./controllers/teams.ts";
import { addGame, getGames } from "./controllers/games.ts";

const router = new Router();

// Implement routes
router
  .post("/api/players", addPlayer) // Add a player
  .post("/api/games", addGame) // Add a new game
  .post("/api/addTeamPicture", addTeamPicture) // Add a team picture
  .get("/api/addTeamTest", addTeamTest) // Test route for Deno KV
  .get("/api/players", getPlayers) // Get all players
  .get("/api/getPlayer/:id", getPlayer) // Get a single player
  .get("/api/getTeams", getTeams) // Get all teams
  .get("/api/games", getGames) // Get all previously saved games

export default router;