import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
const msgCommand = new SlashCommandBuilder()
.setName('msg')
.setDescription('message a user within the server')
.addUserOption(option =>
    option
    .setName('user')
    .setDescription('the user you are going to message')
    .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('message')
        .setDescription('type the message you want to send')
        .setRequired(true)
        )
export default msgCommand.toJSON();