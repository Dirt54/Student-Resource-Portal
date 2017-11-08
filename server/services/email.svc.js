var mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN_KEY });

var from_who = 'covalenceportal@gmail.com';

exports.sendEmail = function (toAddress) {
    var data = {
        to: toAddress,     
        from: 'covalenceportal@gmail.com',
        subject: 'Covalence Portal Verification',
        html: 'Your Covalence Portal account has been verified. If you have any futher questions or concerns please contact Kimberly Demby at Kimberly@platypi.io.'
      };
       
      return mailgun.messages().send(data);
}