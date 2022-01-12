import bodyParser from "body-parser";
import express from "express";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

/*
  TELEGRAM_BOT_TOKEN is an environment variable
  that should be configured on Railway
*/
if (!process.env.TELEGRAM_BOT_TOKEN) throw new Error("Please add a bot token");
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to 🌟 Github Stars Bot 🌟"));

bot.hears("hello", (ctx) => {
    ctx.reply("Hello to you too!");
});

bot.help((ctx) => {
    ctx.replyWithMarkdown(`
  🌟 *Github Stars Bot* 🌟

      *Commands:*
          /get - Get Github Stars
          /help - Get Help
      *Usage:*
          /get:
            \`\`\` /get user/repo \`\`\`
            \`\`\` /get torvalds/linux \`\`\`
          /help:
            \`\`\`
  /help
            \`\`\`
  `);
});

bot.command("get", (ctx) => {
    // console.log(ctx);
    const repo = ctx.update.message.text.substring(5);
    // console.log(repo);
    axios
        .get(`https://api.github.com/repos/${repo}`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data: any) => {
            const stars = data.data.stargazers_count;
            if (stars !== undefined) {
                ctx.reply(`Repo: ${repo} has ${stars} stars`);
            } else {
                ctx.reply("Enter a valid repository");
            }
        })
        .catch((error) => {
            console.log(error);
            ctx.reply("Enter a valid repository");
        });
});
bot.launch();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));

app.get("/", async (req, res) => {
    res.json({ Hello: "World" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
