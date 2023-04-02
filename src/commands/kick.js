import { SlashCommandBuilder } from 'discord.js';
const kickCommand = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick a user from the server')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('choose the user you are going to kick')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('why are you kicking this user')
            .setRequired(true)
    )
export default kickCommand.toJSON();