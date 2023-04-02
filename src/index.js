import { config } from 'dotenv';
config();
import { Client, GatewayIntentBits, ActivityType, EmbedBuilder, Routes, REST, Embed, } from 'discord.js';
import helpCommand from './commands/help.js';
import msgCommand from './commands/msg.js';
import muteCommand from './commands/mute.js'; n  
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
const token = process.env.bot_token;
const client_id = process.env.client_id;
const guild_id = process.env.guild_id;
const channelId = '1091123488414248961';
client.on('guildMemberRemove', (member) => {
    const leaveEmbed = new EmbedBuilder()
    .setColor('Blue')
    .setDescription(`Goodbye <@${member.id}> Thank you for being a part of our community! `)
    const message = ({ embeds: [leaveEmbed]});
    const channel = member.guild.channels.cache.get(channelId);
    if (channel) {
      channel.send(message);
    }
  });
var list = [];
client.on("guildMemberAdd", async member => {
    var channel = member.guild.channels.cache.get('1091122754675290134');
    if (!channel) return console.warn("MEMBER MESSAGE CHANNEL IS MISSING.");
    if (list.includes(member.id)) return;
    const welcomeEmbed = new EmbedBuilder()
    .setColor('Blue')
    .setTitle('Welcome')
    .setDescription(`Welcome to the server <@${member.id}>!`)
    await channel.send({ embeds: [welcomeEmbed]}).then(() => list[list.length] = member.id).catch(e => {
        console.error("Couldn't send join message for: " + member.id);
    });
});
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`)

});
client.on('ready', () => {
    client.user.setActivity('EERO support server', { type: ActivityType.Watching })
});
const rest = new REST({ version: '10' }).setToken(token);
client.login(token);
async function main() {
    const commands = [
        helpCommand,
        msgCommand,
        muteCommand,
    ];
    try {
        console.log('Started refreshing application (/) commands');
        await rest.put(Routes.applicationCommands(client_id, guild_id), {
            body: commands,
        });
    } catch (err) {

    }
}
main();
client.on('interactionCreate', (interaction) => {
    if(interaction.commandName === 'help') {
        const helpEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('EERO Support')
        .setDescription('Make sure you follow the directions down below, this will guarentee the best support we can give to your needs :grin:')
        .addFields(
            { name: `Coming soon`, value: 'coming soon'},
        )
        interaction.reply({ embeds: [helpEmbed] })
    }
    if(interaction.commandName === 'msg') {
        const user = interaction.options.getMember('user')
        const message = interaction.options.getString('message')
        const msgEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`Message has been sent :white_check_mark:`)
        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`**${interaction.user.username}** sent a message`)
        .setDescription(`${message}`)
        interaction.reply({ embeds: [msgEmbed], ephemeral: true})
        client.users.send(`${user.id}`, {embeds: [dmEmbed]})
    }
    if(interaction.commandName === 'mute') {
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
        const time = interaction.options.getInteger('duration')
        user.timeout(time * 60000)
        const muteEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setDescription(`${user} was muted by <@${interaction.user.id}> for **${time}**m for **${reason}**`)
        .setTimestamp()
        interaction.reply({ embeds: [muteEmbed] })
        const dmEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`You were muted in **EERO SUPPORT SERVER** by **${interaction.user.username}** for **__${reason}__**`)
        client.users.send(`${user.id}`, { embeds: [dmEmbed] })
    }
});