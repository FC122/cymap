const { defineConfig } = require("cypress");
require('dotenv').config()
const cymapTasks = require("./src/cymapTasks")
const nodemailer = require('nodemailer');

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 1000,
    setupNodeEvents(on, config) {
      on('task', {
       ...cymapTasks,
       sendMail({config, data}){
        console.log(config)
        console.log(data)
          let transporter = nodemailer.createTransport(config);
          transporter.verify((err, success) => {
              console.log(success)
              if (err) throw err   
              transporter.sendMail(data, (err, info) => {
                  console.log(info)    
                  if (err) throw err
              });
          });
          return null
        }
      })
    },
    env:{
        pass:process.env.PASS,
        user:process.env.USER,
        localPart:"testmailcica",
        domain:"@gmail.com",
        host: 'imap.gmail.com',
        sendPort: 465,
        receivePort:993,
        secure: true
    }
  },
});
