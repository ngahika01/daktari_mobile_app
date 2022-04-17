import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Mpesa } from "mpesa-api";
import http, { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";

const app = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ["websocket"],
  cors: {
    cors: {
      origin: "http://192.168.226.85:19000/",
    },
  },
});

app.post("/", async (req, res) => {
  const { phoneNumber } = req.body;

  const credentials = {
    clientKey: "GttPo6xuhMiJekypru0fQqSa40TUaAWp",
    clientSecret: "pfoCqVqeGNhs3KWN",
    initiatorPassword: "Safaricom981!",
    securityCredential:
      "Kc9qvh1eXX2cE4wvbNaQjp5QtE0K6Mc04lTwjEdvqo9Q2i4wfZPAoyR8c8iafv0Cg3EYb2AxrFz7mjptP2uMSxTXqHvu8XUMB4swcGnaN4a/XL1n7GF6oe3+vCGPN2OGuV65z480jLPV3s4M968T+wuTyDEQSVTly2jaKQlThRUEHqAhYaKnszCvOX9ENuD2+CWWaWAJU329Uo0iNNFKZ9dOWUzz5Ad7EjBh8T2M7RmF0Ay4iFHN5jiwN+VvLsBT5bheVVQjXtgmhycR4U6fVlRM2B9hZEUWu8JDy9B7RpBMokLnZcc4iijadjiFk27d7Lo4eTjooOSbdOyywrDqiw==",
    certificatePath: null,
  };
  const environment = "sandbox";

  const mpesa = new Mpesa(credentials, environment);

  try {
    const response = await mpesa.lipaNaMpesaOnline({
      BusinessShortCode: 174379,
      Amount: 1 /* 1000 is an example amount */,
      PartyA: 254729842998,
      PhoneNumber: +254729842998,
      PartyB: 174379,
      CallBackURL: "https://3d15-105-160-74-188.ngrok.io/callback",
      AccountReference: "daktari  mobile app",
      passKey:
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
      TransactionType: "CustomerPayBillOnline",
    });
    io.emit("querying", response);
    if (response) {
      res.status(200).json({
        message: "Payment initiated successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/callback", async (req, res) => {
  const b = req.body.Body.stkCallback["ResultDesc"];
  if (b) {
    io.emit("queried", req.body.Body.stkCallback["ResultDesc"]);
  }

  res.json(b);
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
