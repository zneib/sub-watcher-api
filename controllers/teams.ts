import { MongoClient, ObjectId } from "https://deno.land/x/atlas_sdk@v1.1.0/mod.ts";
const data_api_key = Deno.env.get("DATA_API_KEY");

const kv = await Deno.openKv();

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

const addTeamPicture = async ({request, response}: { request: any; response: any; }) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data"
      }
    } else {
      const body = await request.body();
      const pictureUrl = await body.value;

      response.status = 201;
      response.body = {
        success: true,
        data: pictureUrl,
      }
    }
  } catch (error) {
    response.body = {
      success: false,
      msg: error.toString(),
    }
  }
}

const addTeamTest = async ({request, response}: { request: any; response: any; }) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data"
      }
    } else {
      const body = await request.body();
      console.log(body.value.players);
      const team = await body.value;
      const players = await JSON.parse(body.value.players)

      await kv.set(["teams", body.value.name], { 
        name: body.value.name,
        maxPlayers: body.value.maxPlayers,
        color: body.value.color,
        players: [...players]
      });

      response.status = 201;
      response.body = {
        success: true,
        data: team,
      }
    }
  } catch (error) {
    response.body = {
      success: false,
      msg: error.toString(),
    }
  }
  // const res = await kv.get(["teams", "pinpals"]);
} 

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

export { addTeamPicture, addTeamTest, addTeam, getTeams };