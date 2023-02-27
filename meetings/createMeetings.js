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
    "userdata-bbb_custom_style": `
    .sc-hZyDwR {
      background-image: url(https://bbb-assets.nyc3.cdn.digitaloceanspaces.com/backimagetest.jpg);
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

  moderatorUrl = api.administration.join('adminandres', url_meeting.meetingID, passModeratorPW, kwParamsjoin)
  // attendeeUrl = api.administration.join('invitenandres', url_meeting.meetingID, passAttendeePW,kwParamsjoin )
  // console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
  console.log(`Moderator link: ${moderatorUrl}`)

}

meetingCreate()
module.exports = meetingCreate