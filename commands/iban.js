const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/altyapilar
module.exports = {
    name: "iban",
    description: "İBAN Bilgilerini gösterir",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")

        const param = new EmbedBuilder()
            .setColor("Random")
            .setTitle("> Valf Market | İBAN Bilgileri")
            .addFields(
                { name: "💰 Akbank:", value: `İBAN`, inline: true },
                { name: "<:papara:977911095731826718> Papara:", value: `İBAN`, inline: true },
            )

        interaction.reply({ embeds: [param] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })
    }
};