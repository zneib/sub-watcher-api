import { MongoClient, ObjectId } from "https://deno.land/x/atlas_sdk@v1.1.0/mod.ts";
const data_api_key = Deno.env.get("DATA_API_KEY");

if (!data_api_key) throw new Error('API Key not found');

const client = new MongoClient({
  endpoint: "https://data.mongodb-api.com/app/data-yowii/endpoint/data/v1",
  dataSource: "player-tracker-api",
  auth: {
    apiKey: data_api_key
  }
});

const db = client.database("player_db");
const players = db.collection("players");

const addPlayer = async ({request, response}: { request: any; response: any;}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data"
      }
    } else {
      const body = await request.body();
      const player = await body.value;
      const insertedId = await players.insertOne({
        _id: new ObjectId(),
        data: player
      });

      response.status = 201;
      response.body = {
        success: true,
        data: player,
        insertedId
      }
    }
  } catch (error) {
    response.body = {
      success: false,
      msg: error.toString(),
    }
  }
}

const getPlayers = async ({ response }: { response: any }) => {
  try {
    const allPlayers = await players.find();
    if (allPlayers) {
      response.status = 200;
      response.body = {
        success: true,
        data: allPlayers
      }
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString()
    };
  }
};

export { addPlayer, getPlayers };