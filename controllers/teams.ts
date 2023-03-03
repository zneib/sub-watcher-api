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

const db = client.database("team_db");
const teams = db.collection("teams");

const addTeam = async ({request, response}: { request: any; response: any; }) => {
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
      const insertedId = await teams.insertOne({
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

const getTeams = async ({ response }: { response: any }) => {
  try {
    const getTeams = await teams.find();
    if (getTeams) {
      response.status = 200;
      response.body = {
        success: true,
        data: getTeams
      }
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString()
    };
  }
};

// const getPlayer = async ({ params, response }: { params: { id: string }; response: any }) => {
//   try {
//     const player = await players.findOne({
//       id: parseInt(params.id),
//     });
//     if (player) {
//       response.status = 200;
//       response.body = {
//         success: true,
//         data: player
//       }
//     }
//   } catch (error) {
//    response.body = {
//     success: false,
//     msg: error.toString()
//    } 
//   }
// }

export { addTeam, getTeams };