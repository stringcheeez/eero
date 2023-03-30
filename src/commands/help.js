import { SlashCommandBuilder } from "discord.js";
const helpCommand = new SlashCommandBuilder()
.setName('help')
.setDescription('Replies with what you may need help with')
export default helpCommand.toJSON();
