require('dotenv').config()

const bbb = require('bigbluebutton-js')
const crypto = require('crypto')
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
const http = bbb.http

let createUrlOne = api.administration.create("meeting-testing", crypto.randomUUID(), {
  duration: 5,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

let infosUrl = api.monitoring.getMeetings()

let run = async () => {
  await http(createUrlOne)
  let result = await http((infosUrl))
  let salasActivas = result.meetings.filter(running => running.running === true);

  console.log(`hay ${salasActivas.length} meeting activos`);
  console.log(result);
  // console.log(salasActivas[1].attendees);
  console.log('----------------------------*****-------------------------');
  console.log(moderatorUrl);
}

run()