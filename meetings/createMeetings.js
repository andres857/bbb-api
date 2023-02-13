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
  logoutURL: "https://myzonego.com/live",
  welcome: "Welcome to your BigBlueButton meeting!",
  allowStartStopRecording: "true",
  autoStartRecording: "false",
  record: "true",
  lockSettingsDisablePublicChat: "true",
  // bannerColor: "#FAE69E", 
  // bannerText: "Saludos coordiales",
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
  
  const kwParamsjoin = {
    "userdata-bbb_skip_check_audio": "true",
    "userdata-bbb_show_public_chat_on_login": "false",
    // "userdata-bbb_hide_nav_bar": "true"
    "userdata-bbb_show_participants_on_login": "true",
    "userdata-bbb_hide_actions_bar": "false",

    "userdata-bbb_custom_style": `
    .sc-hZyDwR {
      background-image: url(https://www.myzonego.com/storage/tenant-8/W39xM43mUgiAJ6lpnqQg18onXkKizJiP49nwDeFD.jpg);
      background-size: cover; 
      border-left-width: 1px;
      border-color: grey;
      border-left-style: solid;
    }
    .bodyVw{
      background-color: transparent ;
    }
    .irODRp{
      background-color: transparent ;
    }
    /* recording-description */
    .jsEDqp { 
      background-color: #0d4d9a ;
      border-color: #227C9D ;
      padding: 7px 13px 7px 9px;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
    }
    .jsEDqp span {
      font-weight: bold;
    }
    .dcDKgv {
      font-weight: 600;
      color: #221212;
    }
    .cwAETT > span{
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
      background-color: #cfd2cde3 !important;
      border-width: 2px;
    }
    .jeAcue > span {
      background-color: #EE0056
    }
    .jeAcue:hover > span {
      background-color: #EE0056 
    }
    .jkgjts:focus, .buttonWrapper:focus[data-test="leaveVideo"].jkgjts{
      background-color: green
    }`
  };

  moderatorUrl = api.administration.join('adminandres', url_meeting.meetingID, passModeratorPW,kwParamsjoin)
  // attendeeUrl = api.administration.join('invitenandres', url_meeting.meetingID, passAttendeePW,kwParamsjoin )
  // console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
  console.log(`Moderator link: ${moderatorUrl}`)

}

meetingCreate()
module.exports = meetingCreate


// .jkgjts{
    //   background-color: #EE0056 !important
    // }















// http(meetingCreateUrl).then((result) => {
 
//   let moderatorUrl = api.administration.join('moderator', meetingID, passAttendeePW)
//   let attendeeUrl = api.administration.join('attendee', meetingID, passModeratorPW)
//   console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
 
//   let meetingEndUrl = api.administration.end(meetingID, passModeratorPW)
//   console.log(`End meeting link: ${meetingEndUrl}`)
//   console.log(result)
// })