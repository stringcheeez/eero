import { SlashCommandBuilder } from 'discord.js';
const muteCommand = new SlashCommandBuilder()
    .setName('mute')
    .setDescription('silence a user')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('the user you are going to mute')
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('the reason for the mute')
            .setRequired(true)
    )
    .addIntegerOption(option =>
        option
            .setName('duration')
            .setDescription('how long are you muting the user for')
            .setRequired(true)
    )
export default muteCommand.toJSON();