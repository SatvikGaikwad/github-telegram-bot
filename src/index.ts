import bodyParser from "body-parser";
import express from "express";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import fetch from "./fetch";

dotenv.config();

if (!process.env.TELEGRAM_BOT_TOKEN) throw new Error("Please add a bot token");
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to 🌟 Github Stars Bot 🌟"));

bot.hears("help", (ctx) => {
    ctx.replyWithMarkdown(`🌟 *Github Stars Bot* 🌟
*Commands:*
          /get - Get Github Stars Count
          /forks - Get Github Forks Count
          /help - Returns this message
*Usage:*
          /get:
            \`\`\` /get user/repo \`\`\`
            \`\`\` /get torvalds/linux \`\`\`
          /forks:
            \`\`\` /forks user/repo \`\`\`
            \`\`\` /forks torvalds/linux \`\`\`
  `);
});

bot.help((ctx) => {
    ctx.replyWithMarkdown(`🌟 *Github Stars Bot* 🌟
*Commands:*
          /get - Get Github Stars Count
          /forks - Get Github Forks Count
          /help - Returns this message
*Usage:*
          /get:
            \`\`\` /get user/repo \`\`\`
            \`\`\` /get torvalds/linux \`\`\`
          /forks:
            \`\`\` /forks user/repo \`\`\`
            \`\`\` /forks torvalds/linux \`\`\`
  `);
});

bot.command("get", async (ctx) => {
    // console.log(ctx);
    const repo = ctx.update.message.text.substring(5);
    if (!repo) ctx.reply(`try "/get torvalds/linux"`);
    else ctx.reply(await fetch(repo, "Stars"));
});

bot.command("forks", async (ctx) => {
    // console.log(ctx);
    const repo = ctx.update.message.text.substring(7);
    if (!repo) ctx.reply(`try "/forks torvalds/linux"`);
    else ctx.reply(await fetch(repo, "Forks"));
});

bot.launch();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
    res.send(
        `<a href="https://t.me/Get_Github_Stars_Bot">t.me/Get_Github_Stars_Bot</a>`
    );
});

app.get("/ping", async (req, res) => {
    res.json({ data: "pong" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
