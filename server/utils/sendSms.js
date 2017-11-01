import Nexmo from 'nexmo';
import dotenv from 'dotenv';

dotenv.load();
const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXTMO_API_SECRET
});
module.exports = (phoneNumbers, priority) => {
  if (priority === 'Critical') {
    phoneNumbers.forEach((number) => {
      nexmo.message.sendSms('PostIt', number,
        'Hey Buddy, You have a very Critical Message on PostIt',
        (error, response) => {
          if (error) {
            console.log(error);  // eslint-disable-line
          }
          console.log(response);  // eslint-disable-line
        }
      );
    });
  }
};
