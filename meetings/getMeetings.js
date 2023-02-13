require('dotenv').config()
const bbb = require('bigbluebutton-js')
const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)

const http = bbb.http

let getMeetings = async () => {
  let meetings = await http(api.monitoring.getMeetings())
  // let meetingsRunning = meetings.meetings.filter(running => running.running === true);
  return meetings
}

  module.exports = {
    getMeetings
  }