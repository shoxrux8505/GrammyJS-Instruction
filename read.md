
**<!-- Lesson 1 
проект начинается с команды :
    npm init -y
----------------------------------------описание--------------------------------------------------------------
Команда npm init -y выполняет инициализацию нового проекта Node.js с помощью npm (Node Package Manager)
 и создает файл package.json с настройками по умолчанию. Это сокращенная версия команды npm init, 
 которая задает проекту несколько вопросов для настройки, таких как имя проекта, версия, описание, 
 точка входа, команда тестирования и т. д.

С флагом -y или --yes, команда использует значения по умолчанию для всех этих вопросов, 
создавая файл package.json без каких-либо дополнительных вводов от пользователя. 
Это удобно для быстрой инициализации проекта, когда вам не нужно настраивать параметры вручную.
*/

после этого у нас создается папка package.json 
в моём случае вот так вот : -->**
---------------------------------------------------------------------------------------------------------------
{
  "name": "grammylesson",
  "version": "1.0.0",
  "description": " Lesson 1" 
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

**welcome system for users**
  bot.command(['sey_hello', 'hello', 'sey_hi'], async (ctx) => {
    await ctx.reply("Hello")
})

// # command for reply to voice message
//  #first way 1
// bot.on('message:voice', async (ctx) => {
//     await ctx.reply('Получили голосовое !')

// })
<!-- // secend way 2 -->
// bot.on(':voice', async (ctx) => {
//     await ctx.reply('Получили голосовое !')

// })
// нужно для филтрации пользователей

      bot.on('msg').filter((ctx) => {
          return ctx.from.id === 5991528449
      }, async (ctx) => {
          await ctx.reply('hi admin')
      })

      step 2
      // command for reaction to url message 
      bot.on([":media", "::url"], async (ctx) => {
    await ctx.reply('Получили сылку  !')
    // await ctx.reply('Получили  голосовое  !')

})
bot.on('msg').filter((ctx) => {
    return ctx.from.id === 5991528449 
}, async (ctx) => {
    await ctx.reply('hi admin')
})

-------------------------------------------------------
// определённый ответ на определённый вопрос СТРОГО!
    bot.hears("пинг", async (ctx) =>{
        await ctx.reply('понг')
    })
    ещё варианты 
    bot.hears(["пинг", "ещё пинг"], async (ctx) => {
        await ctx.reply('понг')
    })
------------------------------------------
// в крвйнем случае если пользователь будет матерится или ругатся 
    bot.hears(/пипец/, async (ctx) => {
    await ctx.reply('Ругаемся ?')
})

-----------------------------------------
; Оброщаем внимание на эту команду 
        bot.on("msg", async (ctx) =>{
            console.log(ctx.msg);
        })
        здесь выводится информация с точки CTX (ctx.msg) 
        от сюда выводится инфо про сообщение сюда входит дата чат айди от куда идёт инфа и так далие 
        например: ('это инфа выводится в кансоле ') => console.log(ctx.msg);
          {
        message_id: 72,        
        from: {
          id: 5991528449,      
          is_bot: false,       
          first_name: 'LnD',   
          last_name: 'شيخ.',   
          username: 'woxmen_w',
          language_code: 'ru'  
        },
        chat: {
          id: 5991528449,
          first_name: 'LnD',
          last_name: 'شيخ.',
          username: 'woxmen_w',
          type: 'private'
        },
        date: 1722248269,
        text: '123'
      }
      если в место (msg) будет (from) то 
      выводится в кансоле 
       {
        id: 5991528449,
        is_bot: false,
        first_name: 'LnD',
        last_name: 'شيخ.',
        username: 'woxmen_w',
        language_code: 'ru'
      }

----------------------------------------------------
Верх указанными командами мы можем определить id пользователей и отправлять сообщение и так далие действие 
например: 
        bot.hears("ID", async (ctx) => {
            await ctx.reply(`Ваш ID: ${ctx.from.id}`)
        })

-----------------------------------------------------------------------------------------------
// Работа над контекстом отвечание на конкрентное сообщение (не просто отвечать а отвечать на определённое сообщение)
      bot.command('start', async (ctx) => {
    await ctx.reply('привет! я бот.', {
        reply_parameters:{message_id: ctx.msg.message_id}
        })
    })
  здесь мы оброщаем внимание на (reply_parameters) в этой функции бот отвечает на определённую сообщение 
  выглядит как обект 
  ну как говорится мы здесь работаем с CTX переводится как контекст 

--------------------------------------------------------------------------------------------------
Как использовать html теги на контексте ?
мы можем использовать html теги с помощью парсингга например:
        bot.command('start', async (ctx) => {
    await ctx.reply('привет! я бот. Тг канал : <a href="https://x-team.com/blog/coding-games">сылка</a>', {
       parse_mode:"HTML"
          })
      })
      как вы видете используется команда  (parse_mode:"HTML") и с помощью этой команды можем исползовать html теги  

----------------------------------------------------------------------------------
нужно добавить что в телеграме мы можем использовать споллера например вот так

bot.command('start', async (ctx) => {
    await ctx.reply('привет! я бот. Тг канал : <span class="tg-spoiler">link</span>', {
       parse_mode:"HTML"
    })
})
--------------------------------------------------------------------------------
                            MarkDownV2
--------------------------------------------------------------------------------
это часто сравнивают с гитхаб маркап и мы можем с вами увидеть это на примере 
как создать сылку на маркдавн В2:

          bot.command('start', async (ctx) => {
              await ctx.reply('привет\\! я бот\\. Тг канал : [link](https://x-team.com/blog/coding-games)', {
                  parse_mode: "MarkdownV2"
              })
          })
*text* ==== на жирный текст
_text_ ==== курсивный текст

https://core.telegram.org/bots/api#html-style болше инфа здесь 

-------------------------------------------------------------------------------
// step 3 keyboards
    1type custem keyboard 

    для создание клавиятуры на тг мы должны импортировать класс (Keyboard) и
    создаём async function например вот так :

    bot.command('mood', async (ctx) => {
    const moodKeyboard = new Keyboard().text("хорошо").row().text("норм").row().text("плохо").resized()
    await ctx.reply("как настроение ?", {
        reply_markup: moodKeyboard
          })
      })
    
    как вы видете мы используем класс создавая переменную добовляется функция text("внутри этой функции пишется текст и это отображается внутри кнопки в тг") 
    + функция row() сортирует кнопки на столбик 
    +  есть функция oneTime() для одноразовой выполненте функции 

    conclution: 
               мы посмотрели два вида создавание функции запроса кейборд

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
    --------------------------------------------------------------------

    а также мы можем запрость локацию и так т,д другие функции 
    например:
         const shareKeyboard = new Keyboard().requestLocation('Геолокация !')





    
  
    
