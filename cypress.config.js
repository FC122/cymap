const { defineConfig } = require("cypress");
require('dotenv').config()
const cymapTasks = require("./src/cymapTasks")

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    fixturesFolder: false,
    defaultCommandTimeout: 1000,
    setupNodeEvents(on, config) {
      on('task', {
       ...cymapTasks
      })
    },
    env:{
        pass:process.env.pass,
        user:process.env.user
    }
  },
});
