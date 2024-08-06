require('dotenv').config()
const { Bot, GrammyError, HttpError, Keyboard } = require('grammy')

const bot = new Bot(process.env.BOT_API_KEY);



bot.api.setMyCommands([
    {
        command: 'start', description: 'Запуск бота',
    },
    {
        command: 'hello', description: 'Получить приветствие ',
    },
]);

bot.command('mood', async (ctx) => {
    // way 1 to creating keyboards
    // const moodKeyboard = new Keyboard().text("хорошо").row().text("норм").row().text("плохо").resized()
    // way 2 new version to creating keyboards
    const moodLabels = ['хорошо', 'норм', 'плохо']
    const rows = moodLabels.map((labels) => {
        return [
            Keyboard.text(labels)
        ]
    })
    const moodKeyboard2 = Keyboard.from(rows).resized()

    await ctx.reply("как настроение ?", {
        reply_markup: moodKeyboard2
    })
})

bot.command("share", async (ctx) => {
    const shareKeyboard = new Keyboard().requestLocation('Геолокация !').requestContact("Контакт!").requestPoll("Опрос").resized()

    await ctx.reply('Чем хочешь поделится ?', {
        reply_markup: shareKeyboard
    })
})

bot.hears("хорошо", async (ctx) => {
    await ctx.reply("класс!", {
        reply_markup: {
            remove_keyboard: true
        }
    })
})

// bot.on("msg", async (ctx) =>{
//     console.log(ctx.me);
// })

bot.command('start', async (ctx) => {
    await ctx.reply('привет\\! я бот\\. Тг канал : [link](https://x-team.com/blog/coding-games)', {
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true
    })
})



bot.catch((err) => {
    const ctx = err.ctx
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    }
});

bot.start()