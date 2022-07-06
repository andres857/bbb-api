require('dotenv').config()

const bbb = require('bigbluebutton-js')
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
const http = bbb.http


let getMeetings = async () => {
  let meetings = await http(api.monitoring.getMeetings())
  console.log(meetings.meetings);
  moderatorUrl = api.administration.join('moderator', '3e390a4f-1fce-4e2a-b571-23f343024514', 'dontsecreet')
  console.log(moderatorUrl);
}

getMeetings()



  // let salasActivas = result.meetings.filter(running => running.running === true);

  // console.log(`hay ${salasActivas.length} meeting activos`);
  // console.log(result);
  // // console.log(salasActivas[1].attendees);
  // console.log('----------------------------*****-------------------------');
  // console.log(moderatorUrl);