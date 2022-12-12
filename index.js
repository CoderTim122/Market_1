// Discord
const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
// İNTENTS
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember] });
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
// Database
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/altyapilar
// Lourity - discord.gg/altyapilar
global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs")
const config = require("./config.json");
const { TOKEN } = require("./config.json");
const { setTimeout } = require("timers");
readdirSync('./commands').forEach(f => {
  if (!f.endsWith(".js")) return;

  const props = require(`./commands/${f}`);

  client.commands.push({
    name: props.name.toLowerCase(),
    description: props.description,
    options: props.options,
    dm_permission: false,
    type: 1
  });

  console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
    eve(client, ...args)
  });
  console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

// Komutlar -----------------------------------------------------------------------------------|
// Bir Hata Oluştu
process.on("unhandledRejection", (reason, p) => {
  console.log(reason, p);
})

process.on("unhandledRejection", async (error) => {
  return console.log("Bir hata oluştu! " + error)
})

const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
  fetchGuilds: true,
  fetchVanity: true,
  fetchAuditLogs: true
});

// Lourity - discord.gg/altyapilar
// Lourity - discord.gg/altyapilar
client.on('interactionCreate', interaction => {
  if (!interaction.isButton()) return;

  const row = new ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setEmoji("🟩")
        .setLabel("Onayla")
        .setStyle(Discord.ButtonStyle.Success)
        .setCustomId("onayla")
    )
    .addComponents(
      new Discord.ButtonBuilder()
        .setEmoji("🟥")
        .setLabel("Reddet")
        .setStyle(Discord.ButtonStyle.Danger)
        .setCustomId("reddet")
    )
  // Lourity - discord.gg/altyapilar
  if (interaction.customId === "spotify" + interaction.user.id) {

    const kanal = config.SHOPLOG_CHANNEL
    const channel = client.channels.cache.get(kanal)

    if (!channel) return;

    const hata = new EmbedBuilder()
      .setColor("Red")
      .setDescription("Bunu yapmaya çalışırken bir sorun oluştu.")

    const kredi = louritydb.get(`kredi_${interaction.user.id}`)

    const basarisiz = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Dostum yeterli miktarda krediye (${kredi - 5000 || "5000"} $) sahip değilsin.\n💰 Kredi Miktarı: **${kredi || 0} Kredi**`)
    // Lourity - discord.gg/altyapilar

    if (kredi < 5000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true }).catch((e) => {
      return interaction.reply({ embeds: [hata], ephemeral: true })
    })

    const spotify = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Tebrikler! Spotify Premium satın aldınız.")
      .setDescription(`<:spotify:1048499914855948298> ${interaction.user.username} dostum bir spotify premium aldın! Özel mesajlarını kontrol et.`)
      .setImage("https://media1.tenor.com/images/e1fd4ff42613e8053b0f840f39a17df6/tenor.gif")
      .setFooter({ text: "Yetkililerimiz en yakın sürede sana hediyeni verecek dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })


    const spotifyFatura = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Faturanız:")
      .setURL("https://discord.gg/")
      .setDescription(`Alınan Ürün: <:spotify:1048499914855948298> Spotify Premium\nAlıcı: ${interaction.user.tag}\nSatıcı: Valf Dev\nÖdenen Kredi: 5000\n\n**Not:** Almış olduğun ürün **48 saat** içerisinde yetkililer tarafından **özel mesaj** olarak atılacaktır.`)

    interaction.user.send({ embeds: [spotifyFatura] }).catch((e) => { })
    // Lourity - discord.gg/altyapilar
    // Lourity - discord.gg/altyapilar
    louritydb2.push(`hediyeler_${interaction.user.id}`, "spotify")
    louritydb.add(`kredi_${interaction.user.id}`, -5000)
    interaction.reply({ embeds: [spotify] }).catch((e) => {
      return interaction.reply({ embeds: [hata], ephemeral: true })
    })


    const sell = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("Yeni bir satın alım!")
      .setDescription(`<:spotify:1048499914855948298> ${interaction.user.tag} adlı üye **spotify premium** satın aldı!`)
      .addFields(
        { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
        { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
      )
      .setThumbnail(interaction.user.avatarURL({ dynamic: true }))

    return channel.send({ content: `<@540194137950126080>`, embeds: [sell], components: [row] }).catch((e) => { })
  }
  // Lourity - discord.gg/altyapilar

  if (interaction.customId === "youtube" + interaction.user.id) {

    const kanal = config.SHOPLOG_CHANNEL
    const channel = client.channels.cache.get(kanal)

    if (!channel) return;

    const hata = new EmbedBuilder()
      .setColor("Red")
      .setDescription("Bunu yapmaya çalışırken bir sorun oluştu.")

    const kredi = louritydb.get(`kredi_${interaction.user.id}`)

    const basarisiz = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Dostum yeterli miktarda krediye (${kredi - 13000 || "13000"} $) sahip değilsin.\n💰 Kredi Miktarı: **${kredi || 0} Kredi**`)
    // Lourity - discord.gg/altyapilar
    // Lourity - discord.gg/altyapilar
    if (kredi < 13000 || !kredi) return interaction.reply({ embeds: [basarisiz], ephemeral: true })


    const youtube = new EmbedBuilder()
      .setColor("ff0000")
      .setTitle("Tebrikler! Youtube Premium satın aldınız.")
      .setDescription(`<:youtube:1048499916714020926> ${interaction.user.username} dostum bir youtube premium aldın! Özel mesajlarını kontrol et.`)
      .setImage("https://media1.giphy.com/media/13Nc3xlO1kGg3S/giphy.gif")
      .setFooter({ text: "Yetkililerimiz en yakın sürede sana hediyeni verecek dostum!", iconURL: interaction.user.avatarURL({ dynamic: true }) })


    const youtubeFatura = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Faturanız:")
      .setURL("https://discord.gg/")
      .setDescription(`Alınan Ürün: <:youtube:1048499916714020926> Youtube Premium\nAlıcı: ${interaction.user.tag}\nSatıcı: Valf Dev\nÖdenen Kredi: 13000\n\n**Not:** Almış olduğun ürün **48 saat** içerisinde yetkililer tarafından **özel mesaj** olarak atılacaktır.`)

    interaction.user.send({ embeds: [youtubeFatura] }).catch((e) => { })
    // Lourity - discord.gg/altyapilar
    // Lourity - discord.gg/altyapilar
    louritydb2.push(`hediyeler_${interaction.user.id}`, "youtube")
    louritydb.add(`kredi_${interaction.user.id}`, -13000)
    interaction.reply({ embeds: [youtube] }).catch((e) => {
      return interaction.reply({ embeds: [hata], ephemeral: true })
    })


    const sell = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("Yeni bir satın alım!")
      .setDescription(`<:youtube:1048499916714020926> ${interaction.user.tag} adlı üye **youtube premium** satın aldı!`)
      .addFields(
        { name: "Kullanıcı Adı:", value: `${interaction.user.tag}`, inline: true },
        { name: "Kullanıcı Etiket:", value: `<@${interaction.user.id}>`, inline: true }
      )
      .setThumbnail(interaction.user.avatarURL({ dynamic: true }))

    return channel.send({ content: `<@540194137950126080>`, embeds: [sell], components: [row] }).catch((e) => { })

  }
})
// Lourity - discord.gg/altyapilar
// Lourity - discord.gg/altyapilar
client.on('interactionCreate', interaction => {
  if (!interaction.isButton()) return;

  let yetkili = config.STAFF

  if (interaction.customId === "onayla") {

    const yetki = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Bunu yapabilmek için <@&${yetkili}> rolüne sahip olmalısın.`)

    if (!interaction.member.roles.cache.has(yetkili)) return interaction.reply({ embeds: [yetki], ephemeral: true })

    const onaylandi = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`${interaction.user.tag} adlı yetkili bir üyeye hediyesini verdi!`)
      .setTimestamp()

    interaction.message.delete().catch((e) => { })
    return interaction.reply({ embeds: [onaylandi] }).catch((e) => { })

  }
  // Lourity - discord.gg/altyapilar

  if (interaction.customId === "reddet") {

    const yetki = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`Bunu yapabilmek için <@&${yetkili}> rolüne sahip olmalısın.`)

    if (!interaction.member.roles.cache.has(yetkili)) return interaction.reply({ embeds: [yetki], ephemeral: true })

    const reddedildi = new EmbedBuilder()
      .setColor("Red")
      .setDescription(`${interaction.user.tag} adlı yetkili bir üyeye hediyesini vermedi!`)
      .setTimestamp()

    interaction.message.delete().catch((e) => { })
    return interaction.reply({ embeds: [reddedildi] }).catch((e) => { })
    // Lourity - discord.gg/altyapilar
  }
})
// Lourity - discord.gg/altyapilar