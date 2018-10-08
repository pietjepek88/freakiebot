const discord = require("discord.js");
const botConfig = require("./botconfig.json")


const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("can't find extra files");
        return;
    }

    



    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`the file ${f} is loaded`);

        bot.commands.set(fileGet.help.name, fileGet);


    })




});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("Soon!", { type: "playing" });

})

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot,message, arguments);

    // if (command === `${prefix}youtube`) {

    //     return message.channel.send("https://www.youtube.com/channel/UCPFAYPRZQcdzRr3PTHWYDwg");


    // }


    // if (command === `${prefix}info`) {

    //     var botIcon = bot.user.displayAvatarURL;


    //     var botEmbed = new discord.RichEmbed()
    //         .setDescription("discord bot info")
    //         .setColor("#003bff")
    //         .setThumbnail(botIcon)
    //         .addField("Bot naam", bot.user.username)
    //         .addField("gemaakt op", bot.user.createdAt)





    //     return message.channel.send(botEmbed);

    // }


    // if (command === `${prefix}serverinfo`) {


    //     var Icon = message.guild.iconURL;

    //     var serverEmbed = new discord.RichEmbed()
    //         .setDescription("server info")
    //         .setColor("#003bff")
    //         .setThumbnail(Icon)
    //         .addField("Bot naam", bot.user.username)
    //         .addField("je bent gejoind op", message.member.joinedAt)
    //         .addField("totaal members", message.guild.memberCount);




    //     return message.channel.send(serverEmbed);
    // }


    // if (command === `${prefix}kick`) {


    //     // !kick @pietjepek88 reden hier

    //     var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    //     if (!kickUser) return message.channel.send("can't find this player");

    //     var reason = arguments.join(" ").slice(22);


    //     if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you are not alowed to do that!");

    //     if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you can't kick staff!")


    //     var kick = new discord.RichEmbed()

    //         .setDescription("kick")
    //         .setColor("#003bff")
    //         .addField("kicked User", kickUser)
    //         .addField("kicked by", message.author)
    //         .addField("reason", reason);

    //     var kickChannel = message.guild.channels.find(`name`, "🚩notenfication");
    //     if (!kickChannel) return message.guild.send("can't find the channel!!");

    //     message.guild.member(kickUser).kick(reason);


    //     kickChannel.send(kick);



    //     return;
    // }


    // if (command === `${prefix}ban`) {

    //     var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    //     if (!banUser) return message.channel.send("can't find this player");

    //     var reason = arguments.join(" ").slice(22);


    //     if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you are not alowed to do that!");

    //     if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you can't ban staff!")


    //     var ban = new discord.RichEmbed()

    //         .setDescription("ban")
    //         .setColor("#003bff")
    //         .addField("baned User", banUser)
    //         .addField("baned by", message.author)
    //         .addField("reason", reason);

    //     var banChannel = message.guild.channels.find(`name`, "🚩notenfication");
    //     if (!banChannel) return message.guild.send("can't find the channel!!");

    //     message.guild.member(banUser).ban(reason);


    //     banChannel.send(ban);



    //     return;
    // }






});

bot.login(botConfig.token);