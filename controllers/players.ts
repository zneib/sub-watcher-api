import { MongoClient } from "https://deno.land/x/atlas_sdk@v1.1.0/mod.ts";
const data_api_key = Deno.env.get("DATA_API_KEY");
// const BASE_URI = `https://data.mongodb-api.com/app/data-yowii/endpoint/data/beta/action`;
// const DATA_SOURCE = "player-tracker-api";
// const DATABASE = "player_db";
// const COLLECTION = "players";

// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "api-key": data_api_key
//   },
//   body: ""
// };

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

// const allActiveUsers = await players.find();
// console.log(allActiveUsers);

// const addPlayer = async ({
//   request,
//   response,
// }: {
//   request: any;
//   response: any;
// }) => {
//   try {
//     if (!request.hasBody) {
//       response.status = 400;
//       response.body = {
//         success: false,
//         msg: "No Data"
//       };
//     } else {
//       const body = await request.body();
//       const player = await body.value;
//       const URI = `${BASE_URI}/insertOne`;
//       const query = {
//         collection: COLLECTION,
//         database: DATABASE,
//         dataSource: DATA_SOURCE,
//         document: player
//       };
//       options.body = JSON.stringify(query);
//       const dataResponse = await fetch(URI, options);
//       const { insertedId } = await dataResponse.json();

//       response.status = 201;
//       response.body = {
//         success: true,
//         data: player,
//         insertedId
//       };
//     }
//   } catch (error) {
//     response.body = {
//       success: false,
//       msg: error.toString(),
//     }
//   }
// }

const getPlayers = async ({ response }: { response: any }) => {
  try {
    // const URI = `${BASE_URI}/find`;
    // const query = {
    //   collection: COLLECTION,
    //   database: DATABASE,
    //   dataSource: DATA_SOURCE,
    // };
    // options.body = JSON.stringify(query);
    // const dataResponse = await fetch(URI, options);
    // const allPlayers = await dataResponse.json();

    // if (allPlayers) {
    //   response.status = 200;
    //   response.body = {
    //     success: true,
    //     data: allPlayers
    //   };
    // } else {
    //   response.status = 500;
    //   response.body = {
    //     success: false,
    //     msg: "Internal Server Error"
    //   };
    // }
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

export { getPlayers };