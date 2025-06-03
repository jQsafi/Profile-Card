const config = require('./tailwind.config.ts').default;
module.exports = config;
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#your-color-here',
      },
    },
  },
};