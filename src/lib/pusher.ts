import PusherServer from "pusher";
import Pusher from "pusher-js";

const APP_Id = process.env.APP_Id || "";
const KEY = process.env.KEY || "";
const SECRET = process.env.SECRET || "";
const CLUSTER = process.env.CLUSTER || "";

console.log("credentials > ", APP_Id);
console.log("credentials > ", KEY);
console.log("credentials > ", SECRET);
console.log("credentials > ", CLUSTER);

const pusherServer = new PusherServer({
  appId: APP_Id,
  key: KEY,
  secret: SECRET,
  cluster: CLUSTER,
  useTLS: true,
});

const pusherClient = new Pusher(KEY, { cluster: CLUSTER });

export { pusherServer, pusherClient };
