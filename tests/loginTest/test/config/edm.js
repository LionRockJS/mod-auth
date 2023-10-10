const {KohanaJS} = require('kohanajs');
module.exports = {
  mail:{
    admin:'admin@example.com',
    sender:'hello@example.com',
    templatePath : KohanaJS.EXE_PATH + '/../public/media/edm',
    activateCode : {
      subject : new Map([['', 'Verification email']]),
      text: new Map([['', '{{@url}}']]),
      html: new Map([['', 'activate.html']]),
      landing: new Map([['', 'account/activate']]),
    },
    resetPassword: {
      subject : new Map([['', 'Reset password request']]),
      text: new Map([['', '{{@url}}']]),
      html: new Map([['', 'reset-password.html']]),
      landing: new Map([['', 'reset-password']])
    },
    username: {
      subject : new Map([['', 'Your registered username']]),
      text: new Map([['', '{{@username}}']]),
      html: new Map([['', 'username.html']]),
    }
  }
};