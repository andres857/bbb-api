require('dotenv').config()
const bbb = require('bigbluebutton-js')
const crypto = require('crypto')

let api = bbb.api(
    process.env.BBB_URL, 
    process.env.BBB_SECRET
  )

let http = bbb.http
let meetingID = crypto.randomUUID()
let passAttendeePW = 'invitedpass1234'
let passModeratorPW = 'secreetpass'

let meetingCreateUrl = api.administration.create('testing rooms 10', meetingID, {
  // duration: 1000,
  attendeePW: passAttendeePW,
  moderatorPW: passModeratorPW,
  logoutURL: "https://myzonego.com",
  welcome: "Welcome to your BigBlueButton meeting!",
  allowStartStopRecording: "true",
  autoStartRecording: "false",
  record: "false",
  lockSettingsDisablePublicChat: "true",
  bannerColor: "#FAE69E", 
  bannerText: "Saludos coordiales",
  muteOnStart: "true",
  allowModsToUnmuteUsers: "true",
  allowModsToEjectCameras: "true",

  remindRecordingIsOn: "true",
  notifyRecordingIsOn: "true"
  // meta_background: "https://www.myzonego.com/storage/tenant-8/W39xM43mUgiAJ6lpnqQg18onXkKizJiP49nwDeFD.jpg",
})

const meetingCreate = async() =>{
  let url_meeting = await http(meetingCreateUrl)
  console.log(url_meeting);
  if (url_meeting.returncode == 'SUCCESS' ){
     console.log('Meeting creado')
  }else{
     console.log('Error creando el meeting');
  }
  
  moderatorUrl = api.administration.join('adminandres', url_meeting.meetingID, passModeratorPW)
  attendeeUrl = api.administration.join('invitenandres', url_meeting.meetingID, passAttendeePW, {
    "userdata-bbb_skip_check_audio": "true",
    "userdata-bbb_show_public_chat_on_login": "false",
    // "userdata-bbb_hide_nav_bar": "true"
    "userdata-bbb_show_participants_on_login": "false",
    "userdata-bbb_hide_actions_bar": "true",
    "userdata-bbb_custom_style": ".hmnuRG{background-color:red !important;}"
  })
  console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
}

meetingCreate()
module.exports = meetingCreate


















// http(meetingCreateUrl).then((result) => {
 
//   let moderatorUrl = api.administration.join('moderator', meetingID, passAttendeePW)
//   let attendeeUrl = api.administration.join('attendee', meetingID, passModeratorPW)
//   console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
 
//   let meetingEndUrl = api.administration.end(meetingID, passModeratorPW)
//   console.log(`End meeting link: ${meetingEndUrl}`)
//   console.log(result)
// })