require('dotenv').config()
const axios = require('axios');
const crypto = require('crypto')

const bbbURL = process.env.BBB_URL;
const bbbSecret = process.env.BBB_SECRET;

let meetingID = crypto.randomUUID()


// Example API call: create meeting
const createMeeting = async (name, meetingID, attendeePW, moderatorPW) => {
    const createString = `create${name}&meetingID=${meetingID}&attendeePW=${attendeePW}&moderatorPW=${moderatorPW}${bbbSecret}`;
    const checksum = crypto
    .createHash('sha1')
    .update(createString)
    .digest('hex');

    const response = await axios.get(`${bbbURL}/api`, {
        params: {
            // action: 'create',
            name,
            meetingID,
            attendeePW,
            moderatorPW,
            checksum,
        },
    });
    return response;
    };

async function main (){
    const response = await createMeeting('soyElmeeting',meetingID,'secret123','muysecret')
    console.log(response);
}
main()


.cwAETT > span{
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    background-color: #d4d7d2 !important;
    border-width: 2px;
  }

  /*
  .cwAETT:hover > span{
      background-color: yellow !important;
  }
  */

  .cwAETT:active > span{
    background-color: #EA6B23 !important;
  }
  .jeAcue > span {
    background-color: #EE0056
  }
  .jeAcue:hover > span {
    background-color: #EE0056 
  }
  .jkgjts:focus, .buttonWrapper:focus[data-test="leaveVideo"].jkgjts{
    background-color: green
  }

      /* Espanol */
      :root #ActionsBar button:[aria-label="De-silenciar"] span {
        background: #EA6B23 !important;
      }
    
      :root #ActionsBar button:focus:not([aria-label="De-silenciar"]) span {
          background: #EA6B23 !important;
      }
    
      :root #ActionsBar button:[aria-label="Silenciar"] span {
          background: #d4d7d2 !important;
      }
    
      :root #ActionsBar button:focus:not([aria-label="Silenciar"]) span {
          background: #d4d7d2 !important;
      }
  
      /* English */
      :root #ActionsBar button:[aria-label="Unmute"] span {
        background: #EA6B23 !important;
      }
    
      :root #ActionsBar button:focus:not([aria-label="Unmute"]) span {
          background: #EA6B23 !important;
      }
    
      :root #ActionsBar button:[aria-label="Mute"] span {
          background: #d4d7d2 !important;
      }
    
      :root #ActionsBar button:focus:not([aria-label="Mute"]) span {
          background: #d4d7d2 !important;
      }