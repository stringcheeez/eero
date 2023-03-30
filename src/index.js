import { config } from 'dotenv';
config();
import { Client, GatewayIntentBits, ActivityType, EmbedBuilder, Routes, REST, Embed, } from 'discord.js';
import helpCommand from './commands/help.js';
import msgCommand from './commands/msg.js';
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
    .setDescription(`Goodbye <@${member.id}> Thank you for being apart of our community! `)
    const message = ({ embeds: [leaveEmbed]});
    const channel = member.guild.channels.cache.get(channelId);
    if (channel) {
      channel.send(message);
    }
  });
var list = [];
client.on("guildMemberAdd", async member => {
    // I don't know what you want to do here, so I'll default to sending a very basic message in chat.
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
        const MSGEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(':white_check_mark:')
        .setDescription('SENT')
        interaction.reply({ embeds: [MSGEmbed], ephmeral: true})
        const msgEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle(`From ${interaction.user.username}`)
        .setDescription(`${message}`)
        client.users.send(`${user.id}`, { embeds: [msgEmbed]})
    }
});