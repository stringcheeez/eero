import { SlashCommandBuilder } from 'discord.js';
const msgCommand = new SlashCommandBuilder()
.setName('msg')
.setDescription('messaging with fun')
.addUserOption(option => 
    option
    .setName('user')
    .setDescription('Who are you going to message')
    .setRequired(true)
    )
    .addStringOption(option =>
        option
    .setName('message')
    .setDescription('Type the message you want to send here')
    .setRequired(true)
        )
        export default msgCommand.toJSON();