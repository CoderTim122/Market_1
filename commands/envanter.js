const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/altyapilar
module.exports = {
    name: "envanter",
    description: "Bakalım nelerin var?",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")

        let kredi = louritydb.get(`kredi_${interaction.user.id}`)
        let davet = louritydb.get(`davet_${interaction.user.id}`)
        let mesaj = louritydb.get(`mesaj_${interaction.user.id}`)
        let hediyeler = louritydb2.get(`hediyeler_${interaction.user.id}`)

        const param = new EmbedBuilder()
            .setColor("Random")
            .setTitle("> Valf Market | Discord'un ücretsiz marketi")
            .addFields(
                { name: "💰 Kredi Miktarı:", value: `${kredi || "0"} Kredi`, inline: true },
                { name: "🎁 Aldığın Hediyeler:", value: `${hediyeler || "Hiç Hediyen Yok"}`, inline: true },
            )
            .setFooter({ text: `İnsanları Valf'a davet et/sohbet et, kredi kazan ve /market ile harca 😉` })

        interaction.reply({ embeds: [param] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })
    }
};