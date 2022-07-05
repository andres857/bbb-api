require('dotenv').config()
const bbb = require('bigbluebutton-js')
const crypto = require('crypto')

let api = bbb.api(
    process.env.BBB_URL, 
    process.env.BBB_SECRET
  )

let http = bbb.http
let meetingID = crypto.randomUUID()
let passAttendeePW = 'sosecret1234'
let passModeratorPW = 'dontsecreet'

let meetingCreateUrl = api.administration.create('testing rooms 10', meetingID, {
  duration: 1000,
  attendeePW: passAttendeePW,
  moderatorPW: passModeratorPW,
})

let meetingCreate = async() =>{
  let url_meeting = await http(meetingCreateUrl)
  if (url_meeting.returncode == 'SUCCESS'){
    console.log('Meeting creado')
  }else{
    console.log('Error creando el meeting');
  }
  console.log(url_meeting)
  moderatorUrl = api.administration.join('moderator', url_meeting.meetingID, passAttendeePW)
  console.log(moderatorUrl);
}

meetingCreate()


















// http(meetingCreateUrl).then((result) => {
 
//   let moderatorUrl = api.administration.join('moderator', meetingID, passAttendeePW)
//   let attendeeUrl = api.administration.join('attendee', meetingID, passModeratorPW)
//   console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
 
//   let meetingEndUrl = api.administration.end(meetingID, passModeratorPW)
//   console.log(`End meeting link: ${meetingEndUrl}`)
//   console.log(result)
// })