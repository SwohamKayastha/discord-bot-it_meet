
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

const ALLOWED_ROLE_ID = '1299292137682112554';

let scheduledId = [];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  // welcome(client);

});


client.on("interactionCreate", async (interaction) => {
    try {
      interactionshandler(interaction)

      const { commandName } = interaction;

      if (commandName === 'registerevent') {
        
        // checks if the use has the required role.
        const hasRole = interaction.member.roles.cache.has(ALLOWED_ROLE_ID);
        if (!hasRole) {
          return interaction.reply({content: "you don't have permission", ephemeral: true});
         }

        // Collect event details from the slash command
        // const eventId = interaction.options.getString('id');
        const eventName = interaction.options.getString('event_name');
        const eventLocation = interaction.options.getString('event_location');
        const eventDate = interaction.options.getString('event_date');
        const eventTime = interaction.options.getString('event_time');
    

       /*  ID
       const idExists = scheduledId.some(n => n.id === eventId);
        if (idExists){
          return interaction.reply({ content: `the id ${eventId} is already in use. Please choose a different id.`, ephemeral: true});
        }
        */

        // Acknowledge the interaction
        await interaction.reply({content:`Event **${eventName}** has been registered! A reminder will be sent 30 minutes before the event starts.`, ephemeral: true });
    
        // Schedule the event reminder
        const channelId = '1298881128186384466'; // Replace with the ID of the channel where reminders should be sent
        eventNotifier.scheduleEventReminder(client, channelId, yeventName, eventLocation, eventDate, eventTime);
      }

     /*                   **REMOVE EVENT**
      if (interaction.commandName === 'removeevent') {

        const eventId = interaction.options.getString('id');

        const eventIndex = scheduledId.filter(n => n.id === eventId);
      if (eventIndex === -1){
        return interaction.reply({ content: "No notification found with that ID.", ephemeral: true });
      }
      
        clearTimeout(scheduledId[eventIndex].timeout);
        scheduledId.splice(eventNotifier, 1);

        // Notify the user that the notification has been removed
        await interaction.reply({ content: `Notification with ID '${eventId}' has been removed.`, ephemeral: true });
      }
      */

    } catch (error) {
      console.log(error);
    }
  });
client.login(process.env.TOKEN);
