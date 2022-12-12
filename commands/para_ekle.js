const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const louritydb = require("croxydb")

module.exports = {
    name: "para-ekle",
    description: 'Kullanıcıya Valf Coin eklersin.',
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Valf Coin eklenecek kullanıcıyı yaz",
            type: 6,
            required: true
        },
        {
            name: "miktar",
            description: "Ne kadar Valf Coin ekleneceğini yaz",
            type: 3,
            required: true
        },
    ],
    run: async (client, interaction) => {

        if (interaction.member.id !== "540194137950126080") return interaction.reply({ content: "Kurucum değilsin", ephemeral: true })

        let kullanici = interaction.options.getUser('kullanıcı')
        let miktar = interaction.options.getString('miktar')

        const gecersiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Dostum girdiğin bir sayı değil.")

        if (isNaN(miktar)) return interaction.reply({ embeds: [gecersiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

        const basarili = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`${kullanici} adlı kullanıcıya başarıyla **${miktar}** valf coin ekledim!`)

        interaction.reply({ embeds: [basarili] })

        louritydb.add(`kredi_${kullanici.id}`, miktar)

    }
};