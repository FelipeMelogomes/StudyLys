const { SlashCommandBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Ouça a melhor Playlist"),

    async execute(interaction) {
        await interaction.reply("https://open.spotify.com/playlist/4EEC4dpDegCrDzgOZx1dER?si=594e38630ede4ff3")
    }
}