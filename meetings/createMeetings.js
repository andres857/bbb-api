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

let meetingCreateUrl = api.administration.create('MyZoneGo Meetings', meetingID, {
  // duration: 1000,
  attendeePW: passAttendeePW,
  moderatorPW: passModeratorPW,
  logoutURL: "https://myzonego.com",
  welcome: "Welcome to MyZoneGo!",
  allowStartStopRecording: "true",
  autoStartRecording: "false",
  record: "true",
  lockSettingsDisablePublicChat: "false",
  // bannerColor: "#FAE69E", 
  // bannerText: "Saludos coordiales",
  muteOnStart: "false",
  allowModsToUnmuteUsers: "true",
  allowModsToEjectCameras: "true",

  meetingLayout: 'PRESENTATION_FOCUS', // CUSTOM_LAYOUT, SMART_LAYOUT, PRESENTATION_FOCUS, VIDEO_FOCUS
  learningDashboardCleanupDelayInMinutes: 0,
  presentationUploadExternalDescription: 'Ejercicios Capitulo 1',
  presentationUploadExternalUrl: 'https://bbb-assets.nyc3.cdn.digitaloceanspaces.com/Romms%20background.pdf',
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
    "userdata-bbb_show_public_chat_on_login": "false", //esconde el chat
    "userdata-bbb_hide_nav_bar": "false",// esconde el icono para mostrar o esconder el navbar de users
    "userdata-bbb_show_participants_on_login": "false",// esconde el navbar al inicio de la session 
    "userdata-bbb_hide_actions_bar": "false",
    "remindRecordingIsOn": "true",//pendiente por revisar
    "notifyRecordingIsOn": "true",//pendiente por revisar
    // "userdata-bbb_custom_style_url": "https://bbb-assets.nyc3.cdn.digitaloceanspaces.com/v2.6%2Fstyles26.css",
    "userdata-bbb_custom_style": `
    #layout{
      background-size: cover;
      border-left-width: 1px;
      border-color: grey;
      border-left-style: solid;
      background-image: url(https://bbb-assets.nyc3.cdn.digitaloceanspaces.com/Litmus-Cross-stitch-Zoom.png);
    }
    .fBCzXv{
      background-color: transparent;
    }
    .cwPRvw{
      background-color: transparent;
    }
    /* recording-description */
    .hAlawd { 
      background-color: #0d4d9a ;
      border-color: #227C9D ;
      padding: 12px 17px;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
    }
    .gPhyOv span {
      font-weight: bold;
    }
    .kxUSjt {
      font-weight: 800;
      color:#ffffff;
    }
    .cwAETT > span{
      background-color: #cfd2cd !important;
      border: 2px solid white !important;
    }
    .cwAETT > span:hover{
      background-color: #c3c3c2 !important;
    }

    /* More Actions */
    .buttonWrapper[data-test="actionsButton"] span{
      background-color: #EE0056 !important;
    }

    .buttonWrapper[data-test="actionsButton"] span:hover{
      background-color: #EE0056 !important;
    }
    /*Audio*/
    .buttonWrapper[data-test="muteMicButton"] span{
      background-color: #EA6B23 !important;
    }
    .buttonWrapper[data-test="muteMicButton"] span:hover{
      background-color: #EA6B23 !important;
    }
    .buttonWrapper[data-test="leaveListenOnly"] span{
      background-color: #EA6B23 !important;
    }
    .buttonWrapper[data-test="leaveListenOnly"] span:hover{
      background-color: #EA6B23 !important;
    }
    /* Web Cam */
    .buttonWrapper[data-test="leaveVideo"] span{
      background-color: #46DD38 !important;
    }
    .jkgjts:active, .jkgjts:focus{
      outline: #6e6e6e solid 2px !important;
    }
    header[id="Navbar"] {
      background-color: #ffffff00 !important;
  }
  section[id="ActionsBar"] {
    background-color: #ffffff00 !important;
  }
  div[data-test="presentationContainer"] {
    background-color: #ffffff00 !important;
  }
    `
  };

  moderatorUrl = api.administration.join('adminandres', url_meeting.meetingID, passModeratorPW, kwParamsjoin)
  // attendeeUrl = api.administration.join('invitenandres', url_meeting.meetingID, passAttendeePW,kwParamsjoin )
  // console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
  console.log(`Moderator link: ${moderatorUrl}`)

}

meetingCreate()
module.exports = meetingCreate