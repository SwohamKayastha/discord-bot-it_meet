const fs = require('fs');
const csv = require('csv-parser');
const Discord = require("discord.js");



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
    ChannelType,
    PermissionFlagsBits,
} = require("discord.js");


//All Sub-Modules Imports Goes Here 



require("dotenv").config();
module.exports = async (interaction) => {

    //Add The Conditionals for Interaction Identifier Here and Send Flow to the Function Directly if no Race Condition Asynchronously if has a Race Condition
    // if (interaction.commandName==='createrole'){
    //     createrole(interaction)
    //     return;
    // }
    //Example Use
    
};
