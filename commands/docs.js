const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, } = require("discord.js");

const row = new ActionRowBuilder() 
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhuma linguagem selecionada")
            .addOptions({
                label: "Javascript",
                description: "Veja a documentação de Javascript",
                value: "javascript"
                },
                {
                    
                    label: "Python",
                    description: "Veja a documentação de Python",
                    value: "python"
                }, 
                {
                    
                    label: "Discord.js",
                    description: "Veja a documentação de discord.js",
                    value: "discordjs"
                } 
            )
    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Acesse a documentação da tecnologia que quiser"),

    async execute(interaction) {
        await interaction.reply({content: "Selecione uma das tecnologias abaixo:", components: [row]})
    }
}