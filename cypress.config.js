const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
   baseUrl:'https://viacep.com.br',
  },
  fixturesFolder: false,
  video: false,
});
