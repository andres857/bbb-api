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
