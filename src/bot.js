require("dotenv").config();

const axios = require("axios");
const { Client, GatewayIntentBits } = require("discord.js");
const validateCommand = require("./validateCommand.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (validateCommand(message).isValid) {
    try {

      message.channel.send('Generating QR Code...');

      const response = await axios.get(
        "http://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(validateCommand(message).arg) + "!&size=300x300",
        {
          responseType: "arraybuffer",
        }
      );
      const imageBuffer = Buffer.from(response.data, "binary");
      message.channel.send({
        files: [
          {
            attachment: imageBuffer,
            name: "image.jpg",
            description: 'QR Code for text: ' + validateCommand(message).arg
          },
        ],
      });
    } catch (error) {
      console.error(error);
      message.channel.send("Error occurred while generating QR code :(");
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
