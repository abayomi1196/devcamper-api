import NodeGeocoder from "node-geocoder";
import * as dotenv from "dotenv";
dotenv.config();

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

export default geocoder;
