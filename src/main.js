
require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");


//This is Where you Import Any Other files You may need ( Reccomended to Connect Functions within Interaction Handler rather than In Main)
const interactionshandler=require("../Modules/Interactionhandler.js")
const eventNotifier = require("../Modules/EventNotifier.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    
  ],
 
});



client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  // welcome(client);

});


client.on("interactionCreate", async (interaction) => {
    try {
      interactionshandler(interaction)

      const { commandName } = interaction;

      if (commandName === 'registerevent') {
        // Collect event details from the slash command
        const eventName = interaction.options.getString('event_name');
        const eventLocation = interaction.options.getString('event_location');
        const eventDate = interaction.options.getString('event_date');
        const eventTime = interaction.options.getString('event_time');
    
        // Acknowledge the interaction
        await interaction.reply({content:`Event **${eventName}** has been registered! A reminder will be sent 30 minutes before the event starts.`, ephemeral: true });
    
        // Schedule the event reminder
        const channelId = '1298881128186384466'; // Replace with the ID of the channel where reminders should be sent
        eventNotifier.scheduleEventReminder(client, channelId, eventName, eventLocation, eventDate, eventTime);
      }


    } catch (error) {
      console.log(error);
    }
  });
client.login(process.env.TOKEN);
