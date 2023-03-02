import { Router } from "https://deno.land/x/oak/mod.ts";
import { addPlayer } from "./controllers/players.ts";

const router = new Router();

// Implement routes
router
  .post("/api/players", addPlayer) // Add a player

export default router;