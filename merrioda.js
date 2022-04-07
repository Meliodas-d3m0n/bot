// ~ BAILEYS ~ //
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
// END  ~ BAILEYS ~ END //


// ~ MÓDULOS NODEJS ~ //
const spin = require('spinnies')
const chalk = require('chalk')
const crypto = require('crypto')
const axios = require('axios')
const fetch = require('node-fetch')
const cfonts = require('cfonts')
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
// ~ MÓDULOS ~ //



const botName = `Super Xandão`
const moment = require('moment-timezone')
// ~ ENVIO DE VCARD ~ //
const vcard = 'BEGIN:VCARD\n'
  + 'VERSION:3.0\n' 
  + 'FN:Meliodas\n' // Seu nome
  + 'ORG:Super Xandão;\n' // Nome do Bot
  + 'TEL;type=CELL;type=VOICE;waid=558981029418:+55 89 81029418\n' // Numero do Whatsapp
  + 'END:VCARD'
// END  ~ VCARD ~ END //
prefix = "*"
bloqueados = []

// ~ JSON ~ //
const list = JSON.parse(fs.readFileSync('./list.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const modobrincadeira = JSON.parse(fs.readFileSync('./json/brincadeira.json'))
const welkome = JSON.parse(fs.readFileSync('./json/welcome.json'))
const _level = JSON.parse(fs.readFileSync('./database/usuario/level.json'))
// ~ JSON ~ //


// ~ JOGO DA VELHA ~ //
const tictactoe = JSON.parse(fs.readFileSync('./TTT/tictactoe.json'))
const infos = JSON.parse(fs.readFileSync('./TTT/settings.json'))
const { cdd, ammoff, crconfig, crlv, crh, crtt } = infos
const { ttthelp } = require('./TTT/TTTconfig/ttthelp')
const { tttme } = require('./TTT/TTTconfig/tttme')
var tttset = require('./TTT/TTTconfig/tttset.json')
var esp = require('./TTT/TTTconfig/tttframe.json')
const daily = JSON.parse(fs.readFileSync('./TTT/diario.json'))
// END ~ JOGO DA VELHA ~ END //


// ~ DEFINIÇÕES NECESSÁRIAS ~ //
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
   .then(response => response.json())
   .then(json => {
  resolve(json)
   })
   .catch((err) => {
  reject(err)
   })
})
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
const banner1 = cfonts.render(('meliodas'), {
  font: "tiny",
  align: "center",
  colors: ["yellow"],
  lineHeight: 1
})
const banner2 = cfonts.render(('Super Xandão'), {
  font: 'block',
    color: ['rainbow'],
    align: 'center',
    gradient: ["red","red"],
    lineHeight: 1
})
const getBuffer = async (url, options) => {
  try {
    options ? options : {}
    const res = await axios({
 method: "get",
 url,
 headers: {
 	'DNT': 1,
 	'Upgrade-Insecure-Request': 1
 },
 ...options,
 responseType: 'arraybuffer'
		})
		return res.data
  } catch(e){
    console.log(e)
  }
}
const spinner = { 
  "interval": 50,
  "frames": [
    "⠋", 
    "⠙", 
    "⠹", 
    "⠸", 
    "⠼", 
    "⠴", 
    "⠦", 
    "⠧", 
    "⠇", 
    "⠏"
    ]}

let globalSpinner;
const getGlobalSpinner = (disableSpins = false) => {
  if(!globalSpinner) globalSpinner = new spin({ color: 'green', succeedColor: 'green', spinner, disableSpins});
  return globalSpinner;
}
spins = getGlobalSpinner(false)
const start = (id, text) => {
	spins.add(id, {text: text})
	}
	const success = (id, text) => {
	spins.succeed(id, {text: text})

	}
// END ~ DEFINIÇÕES NECESSÁRIAS ~ END //




// ~ TIC TAC TOE CONFIG BY: RESEN ~ //

//_TESTE PARA VITÓRIA DE ❌
const WinnerX = () => {
    if (
   (esp.a1=="❌"&&esp.a2=="❌"&&esp.a3=="❌") || (esp.b1=="❌"&&esp.b2=="❌"&&esp.b3=="❌") || (esp.c1=="❌"&&esp.c2=="❌"&&esp.c3=="❌") || 
   (esp.a1=="❌"&&esp.b1=="❌"&&esp.c1=="❌") || (esp.a2=="❌"&&esp.b2=="❌"&&esp.c2=="❌") || (esp.a3=="❌"&&esp.b3=="❌"&&esp.c3=="❌") ||
   (esp.a1=="❌"&&esp.b2=="❌"&&esp.c3=="❌") || (esp.a3=="❌"&&esp.b2=="❌"&&esp.c1=="❌")
    ) {
   return true
    } else {
   return false
    }
}

//TESTE PARA VITÓRIA DE ⭕
const WinnerO = () => {
    if (
   (esp.a1=="⭕"&&esp.a2=="⭕"&&esp.a3=="⭕") || (esp.b1=="⭕"&&esp.b2=="⭕"&&esp.b3=="⭕") || (esp.c1=="⭕"&&esp.c2=="⭕"&&esp.c3=="⭕") || 
   (esp.a1=="⭕"&&esp.b1=="⭕"&&esp.c1=="⭕") || (esp.a2=="⭕"&&esp.b2=="⭕"&&esp.c2=="⭕") || (esp.a3=="⭕"&&esp.b3=="⭕"&&esp.c3=="⭕") ||
   (esp.a1=="⭕"&&esp.b2=="⭕"&&esp.c3=="⭕") || (esp.a3=="⭕"&&esp.b2=="⭕"&&esp.c1=="⭕")
    ) {
   return true
    } else {
   return false
    }
}

//TESTE PARA EMPATE
const Tie = () => {
    if (esp.a1!="🔲"&&esp.a2!="🔲"&&esp.a3!="🔲"&&esp.b1!="🔲"&&esp.b2!="🔲"&&esp.b3!="🔲"&&esp.c1!="🔲"&&esp.c2!="🔲"&&esp.c3!="🔲") {
   return true
    } else {
   return false
    }
}

const IA = () => {
    if (WinnerX() || WinnerO() || Tie()) {
   tttset.reActivate1 = "off"
//INICIO DO MODO IMPOSSIVEL
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" && ( 
   //TESTE PARA TENTATIVA DE VITÓRIA
   (esp.a1=="⭕"&&esp.a2=="⭕"&&esp.a3=="🔲") || (esp.a1=="⭕"&&esp.a2=="🔲"&&esp.a3=="⭕") || (esp.a1=="🔲"&&esp.a2=="⭕"&&esp.a3=="⭕") ||
   (esp.b1=="⭕"&&esp.b2=="⭕"&&esp.b3=="🔲") || (esp.b1=="⭕"&&esp.b2=="🔲"&&esp.b3=="⭕") || (esp.b1=="🔲"&&esp.b2=="⭕"&&esp.b3=="⭕") ||
   (esp.c1=="⭕"&&esp.c2=="⭕"&&esp.c3=="🔲") || (esp.c1=="⭕"&&esp.c2=="🔲"&&esp.c3=="⭕") || (esp.c1=="🔲"&&esp.c2=="⭕"&&esp.c3=="⭕") ||
   (esp.a1=="⭕"&&esp.b1=="⭕"&&esp.c1=="🔲") || (esp.a1=="⭕"&&esp.b1=="🔲"&&esp.c1=="⭕") || (esp.a1=="🔲"&&esp.b1=="⭕"&&esp.c1=="⭕") ||
   (esp.a2=="⭕"&&esp.b2=="⭕"&&esp.c2=="🔲") || (esp.a2=="⭕"&&esp.b2=="🔲"&&esp.c2=="⭕") || (esp.a2=="🔲"&&esp.b2=="⭕"&&esp.c2=="⭕") ||
   (esp.a3=="⭕"&&esp.b3=="⭕"&&esp.c3=="🔲") || (esp.a3=="⭕"&&esp.b3=="🔲"&&esp.c3=="⭕") || (esp.a3=="🔲"&&esp.b3=="⭕"&&esp.c3=="⭕") ||
   (esp.a1=="⭕"&&esp.b2=="⭕"&&esp.c3=="🔲") || (esp.a1=="⭕"&&esp.b2=="🔲"&&esp.c3=="⭕") || (esp.a1=="🔲"&&esp.b2=="⭕"&&esp.c3=="⭕") ||
   (esp.a3=="⭕"&&esp.b2=="⭕"&&esp.c1=="🔲") || (esp.a3=="⭕"&&esp.b2=="🔲"&&esp.c1=="⭕") || (esp.a3=="🔲"&&esp.b2=="⭕"&&esp.c1=="⭕") ||
   //TESTE PARA TENTATIVA DE BLOQUEIO
   (esp.a1=="❌"&&esp.a2=="❌"&&esp.a3=="🔲") || (esp.a1=="❌"&&esp.a2=="🔲"&&esp.a3=="❌") || (esp.a1=="🔲"&&esp.a2=="❌"&&esp.a3=="❌") ||
   (esp.b1=="❌"&&esp.b2=="❌"&&esp.b3=="🔲") || (esp.b1=="❌"&&esp.b2=="🔲"&&esp.b3=="❌") || (esp.b1=="🔲"&&esp.b2=="❌"&&esp.b3=="❌") ||
   (esp.c1=="❌"&&esp.c2=="❌"&&esp.c3=="🔲") || (esp.c1=="❌"&&esp.c2=="🔲"&&esp.c3=="❌") || (esp.c1=="🔲"&&esp.c2=="❌"&&esp.c3=="❌") ||
   (esp.a1=="❌"&&esp.b1=="❌"&&esp.c1=="🔲") || (esp.a1=="❌"&&esp.b1=="🔲"&&esp.c1=="❌") || (esp.a1=="🔲"&&esp.b1=="❌"&&esp.c1=="❌") ||
   (esp.a2=="❌"&&esp.b2=="❌"&&esp.c2=="🔲") || (esp.a2=="❌"&&esp.b2=="🔲"&&esp.c2=="❌") || (esp.a2=="🔲"&&esp.b2=="❌"&&esp.c2=="❌") ||
   (esp.a3=="❌"&&esp.b3=="❌"&&esp.c3=="🔲") || (esp.a3=="❌"&&esp.b3=="🔲"&&esp.c3=="❌") || (esp.a3=="🔲"&&esp.b3=="❌"&&esp.c3=="❌") ||
   (esp.a1=="❌"&&esp.b2=="❌"&&esp.c3=="🔲") || (esp.a1=="❌"&&esp.b2=="🔲"&&esp.c3=="❌") || (esp.a1=="🔲"&&esp.b2=="❌"&&esp.c3=="❌") ||
   (esp.a3=="❌"&&esp.b2=="❌"&&esp.c1=="🔲") || (esp.a3=="❌"&&esp.b2=="🔲"&&esp.c1=="❌") || (esp.a3=="🔲"&&esp.b2=="❌"&&esp.c1=="❌")
    )){
   tttset.reActivate1 = "off"
   IAmove1()
    //JOGADAS PROGRAMADAS ABAIXO
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "⭕") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "❌" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "⭕") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "❌" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "❌" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "🔲"))) {
 tttset.reActivate1 = "off"
 esp.a1 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "❌" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "❌") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "❌" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "❌") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "🔲"))) {
 tttset.reActivate1 = "off"
 esp.a2 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "❌") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "❌" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "❌" && esp.c3 == "⭕") ||
 (esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "❌"))) {
 tttset.reActivate1 = "off"
 esp.a3 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "❌" && esp.c3 == "🔲") ||
 (esp.a1 == "⭕" && esp.a2 == "❌" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "❌"))) {
 tttset.reActivate1 = "off"
 esp.b1 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "❌" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "❌" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "❌" && esp.c3 == "⭕") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "❌" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "⭕") ||
 (esp.a1 == "⭕" && esp.a2 == "❌" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "❌" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "❌" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "❌" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "⭕") ||
 (esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "❌") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "❌" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "❌" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "❌" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "⭕") ||
 (esp.a1 == "🔲" && esp.a2 == "❌" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "⭕") ||
 (esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "❌" && esp.c3 == "🔲") ||
 (esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "❌" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "❌" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "❌" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "❌") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲"))) {
 tttset.reActivate1 = "off"
 esp.b2 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "❌" && esp.c3 == "⭕") ||
 (esp.a1 == "🔲" && esp.a2 == "❌" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "🔲"))) {
 tttset.reActivate1 = "off"
 esp.b3 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "❌" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "❌" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "⭕") ||
 (esp.a1 == "⭕" && esp.a2 == "❌" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "❌"))) {
 tttset.reActivate1 = "off"
 esp.c1 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
    ((esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "❌" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "❌" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "❌" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "⭕"))) {
 tttset.reActivate1 = "off"
 esp.c2 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" &&
  ((esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "🔲" && esp.b2 == "🔲" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "⭕" && esp.a2 == "🔲" && esp.a3 == "🔲" && esp.b1 == "🔲" && esp.b2 == "❌" && esp.b3 == "🔲" && esp.c1 == "🔲" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "🔲" && esp.a3 == "❌" && esp.b1 == "❌" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "⭕" && esp.c2 == "🔲" && esp.c3 == "🔲") ||
 (esp.a1 == "🔲" && esp.a2 == "❌" && esp.a3 == "⭕" && esp.b1 == "🔲" && esp.b2 == "⭕" && esp.b3 == "🔲" && esp.c1 == "❌" && esp.c2 == "🔲" && esp.c3 == "🔲"))) {
 tttset.reActivate1 = "off"
 esp.c3 = "⭕"
    } else if (tttset.tttdifficulty == "IMPOSSIBLE" && (esp.a1 ==  "🔲" || esp.a3 ==  "🔲" || esp.b2 ==  "🔲" || esp.c1 ==  "🔲" || esp.c3 ==  "🔲")) {
   //PRIORIZAR CANTOS E CENTRO
   tttset.reActivate1 = "off"
   while (tttset.reActivate3 == "on") {
  priorityC()
   }
   tttset.reActivate3 = "on"
//FIM DO MODO IMPOSSIVEL
    } else if (tttset.tttdifficulty == "HARD" && ( 
   //TESTE PARA TENTATIVA DE VITÓRIA
   (esp.a1=="⭕"&&esp.a2=="⭕"&&esp.a3=="🔲") || (esp.a1=="⭕"&&esp.a2=="🔲"&&esp.a3=="⭕") || (esp.a1=="🔲"&&esp.a2=="⭕"&&esp.a3=="⭕") ||
   (esp.b1=="⭕"&&esp.b2=="⭕"&&esp.b3=="🔲") || (esp.b1=="⭕"&&esp.b2=="🔲"&&esp.b3=="⭕") || (esp.b1=="🔲"&&esp.b2=="⭕"&&esp.b3=="⭕") ||
   (esp.c1=="⭕"&&esp.c2=="⭕"&&esp.c3=="🔲") || (esp.c1=="⭕"&&esp.c2=="🔲"&&esp.c3=="⭕") || (esp.c1=="🔲"&&esp.c2=="⭕"&&esp.c3=="⭕") ||
   (esp.a1=="⭕"&&esp.b1=="⭕"&&esp.c1=="🔲") || (esp.a1=="⭕"&&esp.b1=="🔲"&&esp.c1=="⭕") || (esp.a1=="🔲"&&esp.b1=="⭕"&&esp.c1=="⭕") ||
   (esp.a2=="⭕"&&esp.b2=="⭕"&&esp.c2=="🔲") || (esp.a2=="⭕"&&esp.b2=="🔲"&&esp.c2=="⭕") || (esp.a2=="🔲"&&esp.b2=="⭕"&&esp.c2=="⭕") ||
   (esp.a3=="⭕"&&esp.b3=="⭕"&&esp.c3=="🔲") || (esp.a3=="⭕"&&esp.b3=="🔲"&&esp.c3=="⭕") || (esp.a3=="🔲"&&esp.b3=="⭕"&&esp.c3=="⭕") ||
   (esp.a1=="⭕"&&esp.b2=="⭕"&&esp.c3=="🔲") || (esp.a1=="⭕"&&esp.b2=="🔲"&&esp.c3=="⭕") || (esp.a1=="🔲"&&esp.b2=="⭕"&&esp.c3=="⭕") ||
   (esp.a3=="⭕"&&esp.b2=="⭕"&&esp.c1=="🔲") || (esp.a3=="⭕"&&esp.b2=="🔲"&&esp.c1=="⭕") || (esp.a3=="🔲"&&esp.b2=="⭕"&&esp.c1=="⭕") ||
   //TESTE PARA TENTATIVA DE BLOQUEIO
   (esp.a1=="❌"&&esp.a2=="❌"&&esp.a3=="🔲") || (esp.a1=="❌"&&esp.a2=="🔲"&&esp.a3=="❌") || (esp.a1=="🔲"&&esp.a2=="❌"&&esp.a3=="❌") ||
   (esp.b1=="❌"&&esp.b2=="❌"&&esp.b3=="🔲") || (esp.b1=="❌"&&esp.b2=="🔲"&&esp.b3=="❌") || (esp.b1=="🔲"&&esp.b2=="❌"&&esp.b3=="❌") ||
   (esp.c1=="❌"&&esp.c2=="❌"&&esp.c3=="🔲") || (esp.c1=="❌"&&esp.c2=="🔲"&&esp.c3=="❌") || (esp.c1=="🔲"&&esp.c2=="❌"&&esp.c3=="❌") ||
   (esp.a1=="❌"&&esp.b1=="❌"&&esp.c1=="🔲") || (esp.a1=="❌"&&esp.b1=="🔲"&&esp.c1=="❌") || (esp.a1=="🔲"&&esp.b1=="❌"&&esp.c1=="❌") ||
   (esp.a2=="❌"&&esp.b2=="❌"&&esp.c2=="🔲") || (esp.a2=="❌"&&esp.b2=="🔲"&&esp.c2=="❌") || (esp.a2=="🔲"&&esp.b2=="❌"&&esp.c2=="❌") ||
   (esp.a3=="❌"&&esp.b3=="❌"&&esp.c3=="🔲") || (esp.a3=="❌"&&esp.b3=="🔲"&&esp.c3=="❌") || (esp.a3=="🔲"&&esp.b3=="❌"&&esp.c3=="❌") ||
   (esp.a1=="❌"&&esp.b2=="❌"&&esp.c3=="🔲") || (esp.a1=="❌"&&esp.b2=="🔲"&&esp.c3=="❌") || (esp.a1=="🔲"&&esp.b2=="❌"&&esp.c3=="❌") ||
   (esp.a3=="❌"&&esp.b2=="❌"&&esp.c1=="🔲") || (esp.a3=="❌"&&esp.b2=="🔲"&&esp.c1=="❌") || (esp.a3=="🔲"&&esp.b2=="❌"&&esp.c1=="❌")
    )){
   //HARD
   tttset.reActivate1 = "off"
   IAmove1()
    } else if (tttset.tttdifficulty == "NORMAL" && ( 
   //TESTE PARA TENTATIVA DE VITÓRIA
   (esp.a1=="⭕"&&esp.a2=="⭕"&&esp.a3=="🔲") || (esp.a1=="⭕"&&esp.a2=="🔲"&&esp.a3=="⭕") || (esp.a1=="🔲"&&esp.a2=="⭕"&&esp.a3=="⭕") ||
   (esp.b1=="⭕"&&esp.b2=="⭕"&&esp.b3=="🔲") || (esp.b1=="⭕"&&esp.b2=="🔲"&&esp.b3=="⭕") || (esp.b1=="🔲"&&esp.b2=="⭕"&&esp.b3=="⭕") ||
   (esp.c1=="⭕"&&esp.c2=="⭕"&&esp.c3=="🔲") || (esp.c1=="⭕"&&esp.c2=="🔲"&&esp.c3=="⭕") || (esp.c1=="🔲"&&esp.c2=="⭕"&&esp.c3=="⭕") ||
   (esp.a1=="⭕"&&esp.b1=="⭕"&&esp.c1=="🔲") || (esp.a1=="⭕"&&esp.b1=="🔲"&&esp.c1=="⭕") || (esp.a1=="🔲"&&esp.b1=="⭕"&&esp.c1=="⭕") ||
   (esp.a2=="⭕"&&esp.b2=="⭕"&&esp.c2=="🔲") || (esp.a2=="⭕"&&esp.b2=="🔲"&&esp.c2=="⭕") || (esp.a2=="🔲"&&esp.b2=="⭕"&&esp.c2=="⭕") ||
   (esp.a3=="⭕"&&esp.b3=="⭕"&&esp.c3=="🔲") || (esp.a3=="⭕"&&esp.b3=="🔲"&&esp.c3=="⭕") || (esp.a3=="🔲"&&esp.b3=="⭕"&&esp.c3=="⭕") ||
   (esp.a1=="⭕"&&esp.b2=="⭕"&&esp.c3=="🔲") || (esp.a1=="⭕"&&esp.b2=="🔲"&&esp.c3=="⭕") || (esp.a1=="🔲"&&esp.b2=="⭕"&&esp.c3=="⭕") ||
   (esp.a3=="⭕"&&esp.b2=="⭕"&&esp.c1=="🔲") || (esp.a3=="⭕"&&esp.b2=="🔲"&&esp.c1=="⭕") || (esp.a3=="🔲"&&esp.b2=="⭕"&&esp.c1=="⭕") ||
   //TESTE PARA TENTATIVA DE BLOQUEIO
   (esp.a1=="❌"&&esp.a2=="❌"&&esp.a3=="🔲") || (esp.a1=="❌"&&esp.a2=="🔲"&&esp.a3=="❌") || (esp.a1=="🔲"&&esp.a2=="❌"&&esp.a3=="❌") ||
   (esp.b1=="❌"&&esp.b2=="❌"&&esp.b3=="🔲") || (esp.b1=="❌"&&esp.b2=="🔲"&&esp.b3=="❌") || (esp.b1=="🔲"&&esp.b2=="❌"&&esp.b3=="❌") ||
   (esp.c1=="❌"&&esp.c2=="❌"&&esp.c3=="🔲") || (esp.c1=="❌"&&esp.c2=="🔲"&&esp.c3=="❌") || (esp.c1=="🔲"&&esp.c2=="❌"&&esp.c3=="❌") ||
   (esp.a1=="❌"&&esp.b1=="❌"&&esp.c1=="🔲") || (esp.a1=="❌"&&esp.b1=="🔲"&&esp.c1=="❌") || (esp.a1=="🔲"&&esp.b1=="❌"&&esp.c1=="❌") ||
   (esp.a2=="❌"&&esp.b2=="❌"&&esp.c2=="🔲") || (esp.a2=="❌"&&esp.b2=="🔲"&&esp.c2=="❌") || (esp.a2=="🔲"&&esp.b2=="❌"&&esp.c2=="❌") ||
   (esp.a3=="❌"&&esp.b3=="❌"&&esp.c3=="🔲") || (esp.a3=="❌"&&esp.b3=="🔲"&&esp.c3=="❌") || (esp.a3=="🔲"&&esp.b3=="❌"&&esp.c3=="❌") ||
   (esp.a1=="❌"&&esp.b2=="❌"&&esp.c3=="🔲") || (esp.a1=="❌"&&esp.b2=="🔲"&&esp.c3=="❌") || (esp.a1=="🔲"&&esp.b2=="❌"&&esp.c3=="❌") ||
   (esp.a3=="❌"&&esp.b2=="❌"&&esp.c1=="🔲") || (esp.a3=="❌"&&esp.b2=="🔲"&&esp.c1=="❌") || (esp.a3=="🔲"&&esp.b2=="❌"&&esp.c1=="❌")
    )){
   //NORMAL
   tttset.reActivate1 = "off"
   let randomNORMAL = Math.floor(Math.random() * 3)
   if (randomNORMAL == 0 || randomNORMAL == 1) {
  IAmove1()
   } else {
  while (tttset.reActivate2 == "on") {
 IAalter()
  }
   }
   tttset.reActivate2 = "on"
    } else {
   //EASY / RANDOM
   let randomALL = Math.floor(Math.random() * 9)
   switch (randomALL) {
  case 0:
 if (esp.a1 == "🔲") {
 tttset.reActivate1 = "off"
 esp.a1 = "⭕"
 }
  break
  case 1:
 if (esp.a2 == "🔲") {
 tttset.reActivate1 = "off"
 esp.a2 = "⭕"
 }
  break
  case 2:
 if (esp.a3 == "🔲") {
 tttset.reActivate1 = "off"
 esp.a3 = "⭕"
 }
  break
  case 3:
 if (esp.b1 == "🔲") {
 tttset.reActivate1 = "off"
 esp.b1 = "⭕"
 }
  break
  case 4:
 if (esp.b2 == "🔲") {
 tttset.reActivate1 = "off"
 esp.b2 = "⭕"
 }
  break
  case 5:
 if (esp.b3 == "🔲") {
 tttset.reActivate1 = "off"
 esp.b3 = "⭕"
 }
  break
  case 6:
 if (esp.c1 == "🔲") {
 tttset.reActivate1 = "off"
 esp.c1 = "⭕"
 }
  break
  case 7:
 if (esp.c2 == "🔲") {
 tttset.reActivate1 = "off"
 esp.c2 = "⭕"
 }
  break
  case 8:
 if (esp.c3 == "🔲") {
 tttset.reActivate1 = "off"
 esp.c3 = "⭕"
 }
  break
   }
    }
}

const IAmove1 = () => {
    //JOGADA PARA VITÓRIA
    if (esp.a1=="⭕"&&esp.a2=="⭕"&&esp.a3=="🔲") {
   esp.a3 = "⭕"
    } else if (esp.a1=="⭕"&&esp.a2=="🔲"&&esp.a3=="⭕") {
   esp.a2 = "⭕"
    } else if (esp.a1=="🔲"&&esp.a2=="⭕"&&esp.a3=="⭕") {
   esp.a1 = "⭕"
    } else if (esp.b1=="⭕"&&esp.b2=="⭕"&&esp.b3=="🔲") {
   esp.b3 = "⭕"
    } else if (esp.b1=="⭕"&&esp.b2=="🔲"&&esp.b3=="⭕") {
   esp.b2 = "⭕"
    } else if (esp.b1=="🔲"&&esp.b2=="⭕"&&esp.b3=="⭕") {
   esp.b1 = "⭕"
    } else if (esp.c1=="⭕"&&esp.c2=="⭕"&&esp.c3=="🔲") {
   esp.c3 = "⭕"
    } else if (esp.c1=="⭕"&&esp.c2=="🔲"&&esp.c3=="⭕") {
   esp.c2 = "⭕"
    } else if (esp.c1=="🔲"&&esp.c2=="⭕"&&esp.c3=="⭕") {
   esp.c1 = "⭕"
    } else if (esp.a1=="⭕"&&esp.b1=="⭕"&&esp.c1=="🔲") {
   esp.c1 = "⭕"
    } else if (esp.a1=="⭕"&&esp.b1=="🔲"&&esp.c1=="⭕") {
   esp.b1 = "⭕"
    } else if (esp.a1=="🔲"&&esp.b1=="⭕"&&esp.c1=="⭕") {
   esp.a1 = "⭕"
    } else if (esp.a2=="⭕"&&esp.b2=="⭕"&&esp.c2=="🔲") {
   esp.c2 = "⭕"
    } else if (esp.a2=="⭕"&&esp.b2=="🔲"&&esp.c2=="⭕") {
   esp.b2 = "⭕"
    } else if (esp.a2=="🔲"&&esp.b2=="⭕"&&esp.c2=="⭕") {
   esp.a2 = "⭕"
    } else if (esp.a3=="⭕"&&esp.b3=="⭕"&&esp.c3=="🔲") {
   esp.c3 = "⭕"
    } else if (esp.a3=="⭕"&&esp.b3=="🔲"&&esp.c3=="⭕") {
   esp.b3 = "⭕"
    } else if (esp.a3=="🔲"&&esp.b3=="⭕"&&esp.c3=="⭕") {
   esp.a3 = "⭕"
    } else if (esp.a1=="⭕"&&esp.b2=="⭕"&&esp.c3=="🔲") {
   esp.c3 = "⭕"
    } else if (esp.a1=="⭕"&&esp.b2=="🔲"&&esp.c3=="⭕") {
   esp.b2 = "⭕"
    } else if (esp.a1=="🔲"&&esp.b2=="⭕"&&esp.c3=="⭕") {
   esp.a1 = "⭕"
    } else if (esp.a3=="⭕"&&esp.b2=="⭕"&&esp.c1=="🔲") {
   esp.c1 = "⭕"
    } else if (esp.a3=="⭕"&&esp.b2=="🔲"&&esp.c1=="⭕") {
   esp.b2 = "⭕"
    } else if (esp.a3=="🔲"&&esp.b2=="⭕"&&esp.c1=="⭕") {
   esp.a3 = "⭕"
    //JOGADA PARA BLOQUEIO
    } else if (esp.a1=="❌"&&esp.a2=="❌"&&esp.a3=="🔲") {
   esp.a3 = "⭕"
    } else if (esp.a1=="❌"&&esp.a2=="🔲"&&esp.a3=="❌") {
   esp.a2 = "⭕"
    } else if (esp.a1=="🔲"&&esp.a2=="❌"&&esp.a3=="❌") {
   esp.a1 = "⭕"
    } else if (esp.b1=="❌"&&esp.b2=="❌"&&esp.b3=="🔲") {
   esp.b3 = "⭕"
    } else if (esp.b1=="❌"&&esp.b2=="🔲"&&esp.b3=="❌") {
   esp.b2 = "⭕"
    } else if (esp.b1=="🔲"&&esp.b2=="❌"&&esp.b3=="❌") {
   esp.b1 = "⭕"
    } else if (esp.c1=="❌"&&esp.c2=="❌"&&esp.c3=="🔲") {
   esp.c3 = "⭕"
    } else if (esp.c1=="❌"&&esp.c2=="🔲"&&esp.c3=="❌") {
   esp.c2 = "⭕"
    } else if (esp.c1=="🔲"&&esp.c2=="❌"&&esp.c3=="❌") {
   esp.c1 = "⭕"
    } else if (esp.a1=="❌"&&esp.b1=="❌"&&esp.c1=="🔲") {
   esp.c1 = "⭕"
    } else if (esp.a1=="❌"&&esp.b1=="🔲"&&esp.c1=="❌") {
   esp.b1 = "⭕"
    } else if (esp.a1=="🔲"&&esp.b1=="❌"&&esp.c1=="❌") {
   esp.a1 = "⭕"
    } else if (esp.a2=="❌"&&esp.b2=="❌"&&esp.c2=="🔲") {
   esp.c2 = "⭕"
    } else if (esp.a2=="❌"&&esp.b2=="🔲"&&esp.c2=="❌") {
   esp.b2 = "⭕"
    } else if (esp.a2=="🔲"&&esp.b2=="❌"&&esp.c2=="❌") {
   esp.a2 = "⭕"
    } else if (esp.a3=="❌"&&esp.b3=="❌"&&esp.c3=="🔲") {
   esp.c3 = "⭕"
    } else if (esp.a3=="❌"&&esp.b3=="🔲"&&esp.c3=="❌") {
   esp.b3 = "⭕"
    } else if (esp.a3=="🔲"&&esp.b3=="❌"&&esp.c3=="❌") {
   esp.a3 = "⭕"
    } else if (esp.a1=="❌"&&esp.b2=="❌"&&esp.c3=="🔲") {
   esp.c3 = "⭕"
    } else if (esp.a1=="❌"&&esp.b2=="🔲"&&esp.c3=="❌") {
   esp.b2 = "⭕"
    } else if (esp.a1=="🔲"&&esp.b2=="❌"&&esp.c3=="❌") {
   esp.a1 = "⭕"
    } else if (esp.a3=="❌"&&esp.b2=="❌"&&esp.c1=="🔲") {
   esp.c1 = "⭕"
    } else if (esp.a3=="❌"&&esp.b2=="🔲"&&esp.c1=="❌") {
   esp.b2 = "⭕"
    } else if (esp.a3=="🔲"&&esp.b2=="❌"&&esp.c1=="❌") {
   esp.a3 = "⭕"
    }
}

//MOVIMENTO ALTERNATIVO
const IAalter = () => {
    let randomALTER = Math.floor(Math.random() * 9)
    switch (randomALTER) {
   case 0:
  if (esp.a1 == "🔲") {
 tttset.reActivate2 = "off"
 esp.a1 = "⭕"
  }
   break
   case 1:
  if (esp.a2 == "🔲") {
 tttset.reActivate2 = "off"
 esp.a2 = "⭕"
  }
   break
   case 2:
  if (esp.a3 == "🔲") {
 tttset.reActivate2 = "off"
 esp.a3 = "⭕"
  }
   break
   case 3:
  if (esp.b1 == "🔲") {
 tttset.reActivate2 = "off"
 esp.b1 = "⭕"
  }
   break
   case 4:
  if (esp.b2 == "🔲") {
 tttset.reActivate2 = "off"
 esp.b2 = "⭕"
  }
   break
   case 5:
  if (esp.b3 == "🔲") {
 tttset.reActivate2 = "off"
 esp.b3 = "⭕"
  }
   break
   case 6:
  if (esp.c1 == "🔲") {
 tttset.reActivate2 = "off"
 esp.c1 = "⭕"
  }
   break
   case 7:
  if (esp.c2 == "🔲") {
 tttset.reActivate2 = "off"
 esp.c2 = "⭕"
  }
   break
   case 8:
  if (esp.c3 == "🔲") {
 tttset.reActivate2 = "off"
 esp.c3 = "⭕"
  }
   break
    }
}

//JOGAR NOS CANTOS E CENTRO - IMPOSSIVEL
const priorityC = () => {
    let randomPriC = Math.floor(Math.random() * 5)
    switch (randomPriC) {
   case 0 :
  if (esp.a1 == "🔲") {
 tttset.reActivate3 = "off"
 esp.a1 = "⭕"
  }
   break
   case 1 :
  if (esp.a3 == "🔲") {
 tttset.reActivate3 = "off"
 esp.a3 = "⭕"
  }
   break
   case 2 :
  if (esp.b2 == "🔲") {
 tttset.reActivate3 = "off"
 esp.b2 = "⭕"
  }
   break
   case 3 :
  if (esp.c1 == "🔲") {
 tttset.reActivate3 = "off"
 esp.c1 = "⭕"
  }
   break
   case 4 :
  if (esp.c3 == "🔲") {
 tttset.reActivate3 = "off"
 esp.c3 = "⭕"
  }
   break
    }
}
// END  ~ TIC TAC TOE CONFIG BY: RESEN ~ END //


// ~ SISTEMA ~ //
const addTTTId = (userId) => {
    const obj = {jid: userId, wins: 0, defeats: 0, ties: 0, points: 0}
    tictactoe.push(obj)
    fs.writeFileSync('./TTT/tictactoe.json', JSON.stringify(tictactoe))
}

const addTTTwin = (userId, amount) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   tictactoe[position].wins += amount
   fs.writeFileSync('./TTT/tictactoe.json', JSON.stringify(tictactoe))
    }
}

const addTTTdefeat = (userId, amount) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   tictactoe[position].defeats += amount
   fs.writeFileSync('./TTT/tictactoe.json', JSON.stringify(tictactoe))
    }
}

const addTTTtie = (userId, amount) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   tictactoe[position].ties += amount
   fs.writeFileSync('./TTT/tictactoe.json', JSON.stringify(tictactoe))
    }
}

const addTTTpoints = (userId, amount) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   tictactoe[position].points += amount
   fs.writeFileSync('./TTT/tictactoe.json', JSON.stringify(tictactoe))
    }
}

const getTTTId = (userId) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   return tictactoe[position].jid
    }
}

const getTTTwins = (userId) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   return tictactoe[position].wins
    }
}

const getTTTdefeats = (userId) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   return tictactoe[position].defeats
    }
}

const getTTTties = (userId) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   return tictactoe[position].ties
    }
}

const getTTTpoints = (userId) => {
    let position = false
    Object.keys(tictactoe).forEach((i) => {
   if (tictactoe[i].jid === userId) {
  position = i
   }
    })
    if (position !== false) {
   return tictactoe[position].points
    }
}
const addLimit = (userId, _dir) => {
    const obj = { id: userId, time: Date.now() }
    _dir.push(obj)
    fs.writeFileSync('./TTT/diario.json', JSON.stringify(_dir))
}

const getLimit = (userId, _dir) => {
    let position = false
    Object.keys(_dir).forEach((i) => {
   if (_dir[i].id === userId) {
  position = i
   }
    })
    if (position !== false) {
   return _dir[position].time
    }
}  
// END ~ SISTEMA ~ END //


// ~ LEVELING ~ //
const getLevelingXp = (userId) => {
  let position = false
  Object.keys(_level).forEach((i) => {
 if (_level[i].usuario === userId) {
 position = i
 }
  })
  if (position !== false) {
 return _level[position].xp
  }
   }


 const getLevelingLevel = (userId) => {
 let position = false
  Object.keys(_level).forEach((i) => {
 if (_level[i].usuario === userId) {
 position = i
 }
  })
  if (position !== false) {
 return _level[position].level
  }
   }   

   const getLevelingId = (userId) => {
  let position = false
  Object.keys(_level).forEach((i) => {
 if (_level[i].usuario === userId) {
 position = i
 }
  })
  if (position !== false) {
 return _level[position].jid
  }
   }

   const addLevelingXp = (userId, amount) => {
  let position = false
  Object.keys(_level).forEach((i) => {
 if (_level[i].usuario === userId) {
 position = i
 }
  })
  if (position !== false) {
 _level[position].xp += amount
 fs.writeFileSync('./database/usuario/level.json', JSON.stringify(_level))
  }
   }

   const addLevelingLevel = (userId, amount) => {
  let position = false
  Object.keys(_level).forEach((i) => {
 if (_level[i].usuario === userId) {
 position = i
 }
  })
  if (position !== false) {
 _level[position].level += amount
 fs.writeFileSync('./database/usuario/level.json', JSON.stringify(_level))
  }
   }

   const addLevelingId = (userId) => {
  const obj = {usuario: userId, xp: 1, level: 1}
  _level.push(obj)
  fs.writeFileSync('./database/usuario/level.json', JSON.stringify(_level))
   }
 
// END ~ LEVELING ~ END //

async function starts() {
  const client = new WAConnection()
  client.logger.level = 'warn'
console.log(banner1.string)
console.log(banner2.string)
  client.on('qr',() => {
    console.log('escaneie o código qr')
  })
  fs.existsSync('./Meliodas-rai.json') && client.loadAuthInfo('./Meliodas-rai.json')
  client.on('connecting', () => {
    start('2', 'Conectando...')
  })
  client.on('open', () => {
    success('2', 'Conectado!')
  })
  
  await client.connect({timeoutMs: 30*1000})
  fs.writeFileSync('./Meliodas-rai.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
  
  client.on('CB:Blocklist', json => {
  if (bloqueados.length > 2) return
	    for (let i of json[1].blocklist) {
	    	bloqueados.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
	
	// ~ BEM VINDO ~ //
	client.on('group-participants-update', async (anu) => {
	  const mdata = await client.groupMetadata(anu.jid)
if (!welkome.includes(anu.jid)) return
try {
  num = anu.participants[0]
if (anu.action == 'add') {
var ini_user = client.contacts[num]
try {
var pegar_foto = await client.getProfilePicture(`${num.split("@")[0]}@c.us`)
} catch (e) {
  var pegar_foto = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60`
}
var imagem_do_cara = await getBuffer(pegar_foto)
menssagem = `
━━━━━━❰⊰❰⊰✾⊱❱⊱❱━━━━━━
Bem Vindo Ao Grupo!\nOlhe As Regras Do grupo Para Não Ser Banido
━━━━━━❰⊰❰⊰✾⊱❱⊱❱━━━━━━`
client.sendMessage(mdata.id, imagem_do_cara, MessageType.image, {caption: menssagem})
} else if(anu.action == 'remove') {
  var num = anu.participants[0]
try {
var get_Foto = await client.getProfilePicture(`${num.split("@")[0]}@c.us`)
} catch (e) {
  var get_Foto = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60`
}
var ine_img = await getBuffer(get_Foto)
texto_de_saida = `
━━━━━━❰⊰❰⊰✾⊱❱⊱❱━━━━━━

Que pena...

━━━━━━❰⊰❰⊰✾⊱❱⊱❱━━━━━━`

client.sendMessage(mdata.id, ine_img, MessageType.image, {caption: texto_de_saida})
}
} catch (e) {
console.log(e)
}
})
// END ~ BEM VINDO ~ END //
	
	
	
	// ~ INÍCIO... ~ //
  client.on('chat-update', async (msg) => {
    try {
 if(!msg.hasNewMessage) return 
 msg = JSON.parse(JSON.stringify(msg)).messages[0]
 if(!msg.message) return
 if (msg.key && msg.key.remoteJid == 'status@broadcast') return
 if(msg.key.fromMe) return
const thumb = await getBuffer(`https://i.ibb.co/mDStb7w/Remini20220331214152343.jpg`)
 global.prefix
 global.bloqueados
 const verificado = ["0@s.whatsapp.net"]
 const content = JSON.stringify(msg.message)
 const from = msg.key.remoteJid 
 const type = Object.keys(msg.message)[0]
 const { text, extendedText, contact, location, liveLocation, image, video, sticker, gif, document, audio, product } = MessageType
 const body = (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption.startsWith(prefix) ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption.startsWith(prefix) ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : ''
		  const	budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
		  var pes = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ''
		  const menssagemRecebida = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
		  const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
 const args = body.trim().split(/ +/).slice(1)
 const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
 const isCmd = body.startsWith(prefix)
 const insom = from.endsWith('@g.us')
 const nameReq = insom ? msg.participant : msg.key.remoteJid
 const pushname = client.contacts[nameReq] != undefined ? client.contacts[nameReq].vname || client.contacts[nameReq].notify : undefined
 const getGroupAdmins = (participants) => {
	 admins = []
	 for (let i of participants) {
		 i.isAdmin ? admins.push(i.jid) : ''
	 }
	 return admins
 }

function horarios(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var Horas = Math.floor(seconds / (60*60));
  var Minutos = Math.floor(seconds % (60*60) / 60);
  var Segundos = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(Horas)} Horas ${pad(Minutos)} Minutos ${pad(Segundos)} Segundos`
}

 const porcentagem = Math.floor(Math.random() * 100 + 0)
 const bot_number = client.user.jid
 const Numero_dono = ["558981029418@s.whatsapp.net", "5521981589231@s.whatsapp.net"]
 const premium_List = JSON.parse(fs.readFileSync('./json/premium.json'))
 const grupo = from.endsWith('@g.us')
 const sender = grupo ? msg.participant : msg.key.remoteJid
 const groupMetadata = grupo ? await client.groupMetadata(from) : ''
 const groupName = grupo ? groupMetadata.subject : ''
 const groupMembers = grupo ? groupMetadata.participants : ''
 const groupAdmins = grupo ? getGroupAdmins(groupMembers) : ''
 const adminsGroup = grupo ? getGroupAdmins(groupMembers) : ''
 const dono = Numero_dono.includes(sender)
 const premium = premium_List.includes(sender)
 const isBotGroupAdmins = groupAdmins.includes(bot_number) || false
 const isBemVindo = grupo ? welkome.includes(from) : false
 const grupoAdmin = groupAdmins.includes(sender) || false
 const groupId = grupo ? groupMetadata.jid : ''
 const isLevelingOn = grupo ? _leveling.includes(from) : false
 const isUrl = (url) => {return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
 const isModobrincadeira = grupo ? modobrincadeira.includes(from) : false


// ~ MESSAGES ~ //
 const verify = (menssagem, tipo, msg1, msg2) => {
  client.sendMessage(from, menssagem, tipo, {quoted: {key: {fromMe: false, participant: `${msg1}`, ...(from ? {remoteJid: from}: {})}, message: {conversation: `${msg2}` }}})
  }
  
 const reply2 = (txt) => {
   verify(txt, text, verificado, `${botName}`, {thumbnail: thumb})
 }
 const reply = (txt) => {
   client.sendMessage(from, txt, text, {quoted: msg, thumbnail: thumb})
 }
 const verify2 = (txt) => {
   client.sendMessage(from, txt, text, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ... {}}, message: { "contactMessage": { "displayName": `${pushname}`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, thumbnail: thumb }}}})
 }
 
 const mentions = (ahh, tchere, id) => {
 	(id == null || id == undefined || id == false) ? client.sendMessage(from, ahh.trim(), extendedText, {contextInfo: {"mentionedJid": tchere}}) : client.sendMessage(from, ahh.trim(), extendedText, {quoted: msg, contextInfo: {"mentionedJid": tchere}})
 }
 // END ~ MESSAGES ~ END //
 
 // ~ LEVELING ~ //
if (grupo && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 10000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await reply(`*「 LEVEL UP 」*\n\n➸ *Nome*: ${pushname}\n➸ *XP*: ${getLevelingXp(sender)}\n➸ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n\nParabéns!!  🎉🎉`)
                }
            } catch (err) {
                console.error(err)
            }
        }	       
// END ~ LEVELING ~ END //
 
 
// ~ AUTO-END-TIME ~ //
    if (tttset.tttstatus == "off" && tttset.autoEndTime == "on") {
tttset.autoEndTime = "off"
} else if (tttset.tttstatus == "on" && tttset.autoEndTime == "on") {
if (isLevelingOn) {
const randomEndTTTXP = 0 - (Math.floor(Math.random() * 75) + 75)
addLevelingXp(tttset.player, randomEndTTTXP)
const checkTTTIdEnd = getTTTId(tttset.player)
if (checkTTTIdEnd === undefined) addTTTId(tttset.player)
addTTTpoints(tttset.player, randomEndTTTXP)
client.sendMessage(tttset.local,`❌ O TEMPO DE JOGO EXPIROU ❌\n\n➣  PUNIÇÃO: ${randomEndTTTXP} XP 🔮`, text, {quoted: tttset.mentionPlayer})
} else {
client.sendMessage(tttset.local,`❌ O TEMPO DE JOGO EXPIROU ❌`, text, {quoted: tttset.mentionPlayer})
}
esp.a1 = "🔲"; esp.a2 = "🔲"; esp.a3 = "🔲"
esp.b1 = "🔲"; esp.b2 = "🔲"; esp.b3 = "🔲"
esp.c1 = "🔲"; esp.c2 = "🔲"; esp.c3 = "🔲"
tttset.tttstatus = "off"
tttset.autoEndTime = "off"
}
// END ~ AUTO-END-TIME ~ END //


 // ~ AUTOMATE MESSAGES ~ //
 if(budy == 'oi' || budy == "OI" || budy == "Oi"){
   respostas = [
 "oi?",
 "eae lek",
 "qfoi porra",
 `oi ${pushname}`
 ]
 tpm = respostas[Math.floor(Math.random() * respostas.length)]
   reply(tpm)
 }
 if(budy == 'fds?' || budy == "Fds?" || budy == "vsfd" || budy == "Vsfd"){
   respostas = [
 "va tu porra",
 `vou foder sua mãe ${pushname}`,
 "vsfd mlk",
 "mó corno vc",
 "desfoda-se?"
 ]
 tpm = respostas[Math.floor(Math.random() * respostas.length)]
   reply(tpm)
 }
 // END ~ AUTOMATE MESSAGES ~ END //
 
 
 // ~ MESS ~ //
 mess = {
   espere: `pera ae`,
   sucesso: `feito`,
   error: {
 stick: `ocorreu um erro ;-;`,
 iv: `link inválido`
   },
   geral: {
 brincadeira: `ative o modo brincadeira ${pushname}`,
 grupo: `este comando só pode ser usado em grupos`,
 premium: `este comando só esta disponível para usuarios premiums`,
 admins: `somente administradores de grupo podem usar este comando...`,
 criador: `somente o criador do bot pode usar este comando`
   }
 }
 // END ~ MESS ~ END //

// ~ CONSOLE ~ //
 const isMedia = (type === 'imageMessage' || type === 'videoMessage')
 const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
 const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
 const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
 if (!grupo && isCmd) {
   console.log(chalk.hex('#f30aff').bold('EXE - ', chalk.hex('#ff0d0d').bold(`${command}`, chalk.hex('#f30aff').bold(`DE`, chalk.hex('#ff0d0d').bold(`${sender.split("@")[0]}`, chalk.hex('#f30aff').bold('PRIVADO'))))))
 }
 if (!grupo && !isCmd) {
   console.log(chalk.hex('#f30aff').bold('MSG - DE', chalk.hex('#ff0d0d').bold(`${sender.split("@")[0]}`, chalk.hex('#f30aff').bold('PRIVADO'))))
 }
 if (isCmd && grupo) {
   console.log(chalk.hex('#f30aff').bold('EXE - ', chalk.hex('#ff0d0d').bold(`${command}`, chalk.hex('#f30aff').bold(`DE`, chalk.hex('#ff0d0d').bold(`${sender.split("@")[0]}`)))))
 }
 if (!isCmd && grupo) {
   console.log(chalk.hex('#f30aff').bold('MSG - DE', chalk.hex('#ff0d0d').bold(`${sender.split("@")[0]}`, chalk.hex('#f30aff').bold(`NO GRUPO ${groupName}`))))
 }
 // END ~ CONSOLE ~ END //

// ~ COMANDOS ~ //
 switch(command){
 case 'menu':
   const chats = await client.chats.all()
   var chat = `${chats.length}`
   uptime = process.uptime()
   var horario = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
   buffer = await getBuffer(`https://i.ibb.co/rFwksfz/${botName}.jpg`)
   menu = `
${"\u200B".repeat(4000)}
╭───「 INFO 」───
│    
┣⊱ Dono:   
│Meliodas
│    
┣⊱ Nmr do Dono: 
│ wa.me/5589981029418
│    
┣⊱ Seu link:
│ wa.me/${sender.split("@")[0]}   
│    
┣⊱data e hora: 
│${moment().format('LTS')}
│
┣⊱Trabalhando à:    
│${horarios(uptime)}
│
┣⊱Total de chats: ${chat}
│
╰─────────────────────
╭───「  𝗖𝗥𝗜𝗔𝗗𝗢𝗥 」──
┣⊱${prefix}addprem (@)
┣⊱${prefix}block (@)
┣⊱${prefix}unblock (@)
╰───────────────────
╭───「 𝗚𝗥𝗨𝗣𝗢 」───
┣⊱${prefix}corno
┣⊱${prefix}leveling (on/off)
┣⊱${prefix}casal
┣⊱${prefix}gado
┣⊱${prefix}perfil
╰─────────────────────
╭───「 𝗔𝗗𝗠 」───
┣⊱${prefix}hidetag (txt)
┣⊱${prefix}modobrincadeira (on/off)
┣⊱${prefix}grupof (fecha o grupo)
┣⊱${prefix}grupoa (abre o grupo)
┣⊱${prefix}nomegp (txt) 
┣⊱${prefix}promover (@)
┣⊱${prefix}rebaixar (@)
┣⊱${prefix}add (número)
┣⊱${prefix}banir (@)
╰──────────────────
╭───「 𝗠𝗘𝗡𝗨 」───
┣⊱${prefix}sticker
┣⊱${prefix}criarlista
┣⊱${prefix}addlist (txt)
┣⊱${prefix}mylist
┣⊱${prefix}ttthelp
┣⊱${prefix}googleimage (txt)
╰──────────────────
`
   client.sendMessage(from, buffer, image, {quoted:msg, caption: menu})
   break
case 'criarlista':
 // var list = JSON.parse(fs.readFileSync('./list.json'))
  const addIdOfUser = (idDoUsuario) => {
    const obj = {dono: idDoUsuario, texto: ""}
    list.push(obj)
    fs.writeFileSync('./list.json', JSON.stringify(list))
}
addIdOfUser(sender)
  break
case 'mylist':
  const getDonoOfList = (dono) => {
    var position = false
    let diretorio = JSON.parse(fs.readFileSync('./list.json'))
    Object.keys(diretorio).forEach((i) => {
   if (diretorio[i].dono === dono) {
 position = i
   }
    })
    if (position !== false) {
   return reply(diretorio[position].texto)
    } 
  }
  getDonoOfList(sender)
  break
case 'addlist':
  const addToMyList = (dono, texto) => {
    let position = false
    Object.keys(list).forEach((i) => {
   if (list[i].dono === dono) {
  position = i
   }
    })
    if (position !== false) {
   list[position].texto += `${texto}\n`
   fs.writeFileSync('./list.json', JSON.stringify(list))
    }
}
  addToMyList(sender, `${body.slice(8)}`)
  break
case 'googleimage':
  var gis = require('g-i-s')
gis(`${body.slice(12)}`, logResults)
var arrai = []
sexo = body.slice(12)
arrai.push(sexo)
async function logResults(error, results) {
  if (error) {
    console.log(error)
  }
  else {
    var cu = await getBuffer(results[0].url)
    client.sendMessage(from, cu, image, {quoted: msg, caption: `PESQUISA: ${body.slice(12)}\nPor: ${pushname}\nLink: ${results[0].url}`, thumbnail: thumb})
    }
  }
  break
case 'marcar':
  if(!dono) return
if(!grupo) return reply2(mess.geral.grupo)
const teste = (thx) => {
  async function teste (){
  mem = []
  var gruppo = await client.groupMetadata(from)
  var membros = gruppo['participants']
  membros.map(async adm => {
    mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
 })
  opcoes = {
    text: thx, 
    contextInfo: {mentionedJid: mem},
    quoted: msg
  }
  client.sendMessage(from, opcoes, text)
}
teste()
}
teste(`${body.slice(6)}`)
  break
case 'msg':
mem = [`5521981589231@s.whatsapp.net`, `558981029418@s.whatsapp.net`]
  client.sendMessage(from, `${JSON.stringify(msg,null,"\t")}`, text, {quoted: msg, contextInfo: {mentionedJid: mem}})
  break
case 'leveling':
 		if (!grupo) return reply(mess.geral.grupo)
 		if (!adminsGroup) return reply(mess.geral.admins)
 		if (args.length < 1) return reply('on/off')
 		if (args[0] === 'on') {
 if (isLevelingOn) return reply('*O comando de level já esta ativo*')
 _leveling.push(from)
 fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
 reply2(`level agora está ativo...`)
 		} else if (args[0] === 'off') {
 _leveling.splice(from, 1)
 fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
 reply2(`level agora esta desativado...`)
 		} else {
 		reply(` Use ${prefix}leveling on para ativar e  ${prefix}leveling off para desativar`)
 		}
 		break
//_JOGO DA VELHA By: Resen
//INICIO DO JOGO DA VELHA ❌ ⭕ 🔲
case 'ttt':
const limitrl = getLimit(sender, daily)
if (!grupo) {
reply(mess.geral.grupo)
} else if (tttset.tttstatus == "on") {
reply(`Alguém já está jogando no momento\nPor favor aguarde um instante...`)
} else if (tttset.waitingTime == "on") {
reply(`Alguém jogou recentemente\nPor favor aguarde o tempo de espera...`)
} else if (args == 0 || (args != 'easy' && args != 'Easy' && args != 'EASY' && args != 'normal' && args != 'Normal' && args != 'NORMAL' && args != 'hard' && args != 'Hard' && args != 'HARD'&& args != 'impossible'&& args != 'Impossible' && args != 'IMPOSSIBLE')) {
reply(`Defina a dificuldade\nEx.: ${prefix}ttt easy\n\nDificuldades: easy, normal, hard e impossible`)
} else if (limitrl !== undefined && cdd - (Date.now() - limitrl) > 0) {
reply('Opa, deixe seus abigos jogarem também, tente novamente em 8 minutos.')
} else {
tttset.tttstatus = "on"
tttset.player = sender
tttset.playerName = pushname
tttset.mentionPlayer = msg
tttset.local = from
if (args == 'easy' || args == 'Easy' || args == 'EASY') {
tttset.tttdifficulty = "EASY"
} else if (args == 'normal' || args == 'Normal' || args == 'NORMAL') {
tttset.tttdifficulty = "NORMAL"
} else if (args == 'hard' || args == 'Hard' || args == 'HARD') {
tttset.tttdifficulty = "HARD"
} else if (args == 'impossible' || args == 'Impossible' || args == 'IMPOSSIBLE') {
tttset.tttdifficulty = "IMPOSSIBLE"
}
const randomStartIA = Math.floor(Math.random() * 3)
if (randomStartIA == 0) {
IA()
tttset.reActivate1 = "on"   
}
reply2(`O jogo começou!!!\nModo: ${tttset.tttdifficulty}`, text, verificado, crtt)
client.sendMessage(from, `🌀1️⃣2️⃣3️⃣\n🅰️${esp.a1}${esp.a2}${esp.a3}\n🅱️${esp.b1}${esp.b2}${esp.b3}\n©️${esp.c1}${esp.c2}${esp.c3}`,text )
client.sendMessage(from,`Caso não saiba como jogar digite: ${prefix}ttthelp`, text) 
setTimeout( () => {
tttset.waitingTime = "off"
tttset.autoEndTime = "off"
}, 10000) //4 minutos
addLimit(sender, daily)
}
break

case 'ttthelp':
client.sendMessage(from, ttthelp(prefix), text)
break

case 'tttme':
if (!grupo) return reply(mess.geral.grupo)
const checkTTTIdMe = getTTTId(sender)
if (checkTTTIdMe === undefined) addTTTId(sender)
client.sendMessage(from, tttme(pushname, getTTTwins(sender), getTTTdefeats(sender), getTTTties(sender), getTTTpoints(sender)), text, {quoted:msg})
break

case 'tttrank':
if (!grupo) return reply(mess.geral.grupo)
//if (tictactoe.length < 3) return reply(`Humm, é necessário que no mínimo 3 pessoas tenham jogado...`)
tictactoe.sort((a, b) => (a.points < b.points) ? 1 : -1)
mentioned_jid = []
let board = '【 TTT RANKS 】\n\n'
try {
for (let i = 0; i < 3; i++) {
if (i == 0) {board += `${i + 1}º 🥇 : @${tictactoe[i].jid.split('@')[0]}\n╭╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸\n│ ➣ Vitórias: ${tictactoe[i].wins} 🎊\n│ ➣ Derrotas: ${tictactoe[i].defeats} 💥\n│ ➣ Empates: ${tictactoe[i].ties} 🌀\n│ ➣ Pontos: ${tictactoe[i].points} ✨\n╰╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸\n\n`
} else if (i == 1) {board += `${i + 1}º 🥈 : @${tictactoe[i].jid.split('@')[0]}\n╭╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸\n│ ➣ Vitórias: ${tictactoe[i].wins} 🎊\n│ ➣ Derrotas: ${tictactoe[i].defeats} 💥\n│ ➣ Empates: ${tictactoe[i].ties} 🌀\n│ ➣ Pontos: ${tictactoe[i].points} ✨\n╰╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸\n\n`
} else if (i == 2) {board += `${i + 1}º 🥉 : @${tictactoe[i].jid.split('@')[0]}\n╭╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸\n│ ➣ Vitórias: ${tictactoe[i].wins} 🎊\n│ ➣ Derrotas: ${tictactoe[i].defeats} 💥\n│ ➣ Empates: ${tictactoe[i].ties} 🌀\n│ ➣ Pontos: ${tictactoe[i].points} ✨\n╰╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸\n\n`
}
mentioned_jid.push(tictactoe[i].jid)
} 
mentions(board, mentioned_jid, true)
} catch (err) {
console.log(err)
await client.sendMessage(from, `Humm, é necessário que no mínimo 3 pessoas tenham jogado...`, text, {quoted: msg})
}
break

case 'coord' :
tttset.playertest = sender
if (!grupo) {
reply(mess.geral.grupo)
} else if (tttset.tttstatus == "off") {
reply(`Você ainda não iniciou o jogo\nDigite ${prefix}ttt [DIFICULDADE] para iniciar`)
} else if (tttset.player != tttset.playertest) {
reply(`Alguém já está jogando no momento\nPor favor aguarde um instante...`)
} else if (tttset.tttantibug == "on") {
reply(`Aguarde a ação anterior ser concluída...`)
} else {
tttset.tttantibug = "on"
const coordX = args
if (coordX != 'a1' && coordX != 'a2' && coordX != 'a3' &&
coordX != 'b1' && coordX != 'b2' && coordX != 'b3' &&
coordX != 'c1' && coordX != 'c2' && coordX != 'c3') {
reply(`Digite o comando com uma coordenada\nExemplo: ${prefix}coord a1`)
tttset.tttantibug = "off"
} else {
switch (args[0]) {
case 'a1':
if (esp.a1 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.a1 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'a2':
if (esp.a2 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.a2 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'a3':
if (esp.a3 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.a3 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'b1':
if (esp.b1 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.b1 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'b2':
if (esp.b2 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.b2 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'b3':
if (esp.b3 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.b3 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'c1':
if (esp.c1 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.c1 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'c2':
if (esp.c2 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.c2 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
case 'c3':
if (esp.c3 != "🔲") {
reply('O espaço já foi ocupado\nTente outra coordenada')
} else {
esp.c3 = "❌"
while (tttset.reActivate1 == "on") {
IA()
}
}
break
}
tttset.reActivate1 = "on"
reply(`🌀1️⃣2️⃣3️⃣\n🅰️${esp.a1}${esp.a2}${esp.a3}\n🅱️${esp.b1}${esp.b2}${esp.b3}\n©️${esp.c1}${esp.c2}${esp.c3}`)
var randomTTTXP = 0
if (WinnerX()) {
if (isLevelingOn) {
switch (tttset.tttdifficulty) {
case "EASY":
randomTTTXP = Math.floor(Math.random() * 25) + 25
addLevelingXp(tttset.player, randomTTTXP)
break
case "NORMAL":
randomTTTXP = Math.floor(Math.random() * 75) + 75
addLevelingXp(tttset.player, randomTTTXP)
break
case "HARD":
randomTTTXP = Math.floor(Math.random() * 200) + 200
addLevelingXp(tttset.player, randomTTTXP)
break
case "IMPOSSIBLE":
randomTTTXP = Math.floor(Math.random() * 1000) + 1000
addLevelingXp(tttset.player, randomTTTXP)
break
}
client.sendMessage(from, `🎉🎉 VITÓRIA DO JOGADOR 🎉🎉\n\n➣  RECOMPENSA: +${randomTTTXP} XP 🔮`, text)
} else {
client.sendMessage(from, `🎉🎉 VITÓRIA DO JOGADOR 🎉🎉`, text)
}
const currentTTTwins = getTTTwins(tttset.player)
const checkTTTIdWin = getTTTId(tttset.player)
if (currentTTTwins === undefined && checkTTTIdWin === undefined) addTTTId(tttset.player)
addTTTwin(tttset.player, 1)
addTTTpoints(tttset.player, randomTTTXP)
esp.a1 = "🔲"; esp.a2 = "🔲"; esp.a3 = "🔲"
esp.b1 = "🔲"; esp.b2 = "🔲"; esp.b3 = "🔲"
esp.c1 = "🔲"; esp.c2 = "🔲"; esp.c3 = "🔲"
tttset.tttstatus = "off"
tttset.waitingTime = "off"
} else if (WinnerO()) {
if (isLevelingOn) {
switch (tttset.tttdifficulty) {
case "EASY":
randomTTTXP = 0 - (Math.floor(Math.random() * 200) + 200)
addLevelingXp(tttset.player, randomTTTXP)
break
case "NORMAL":
randomTTTXP = 0 - (Math.floor(Math.random() * 75) + 75)
addLevelingXp(tttset.player, randomTTTXP)
break
case "HARD":
randomTTTXP = 0 - (Math.floor(Math.random() * 25) + 25)
addLevelingXp(tttset.player, randomTTTXP)
break
case "IMPOSSIBLE":
randomTTTXP = 0
addLevelingXp(tttset.player, randomTTTXP)
break
}   
client.sendMessage(from, `🎉🎉 ${botName} GANHOU 🎉🎉\n\n➣  PUNIÇÃO: ${randomTTTXP} XP 🔮`, text)
} else {
client.sendMessage(from, `🎉🎉 ${botName} GANHOU 🎉🎉`, text)
}
const currentTTTdefeats = getTTTdefeats(tttset.player)
const checkTTTIdDefeat = getTTTId(tttset.player)
if (currentTTTdefeats === undefined && checkTTTIdDefeat === undefined) addTTTId(tttset.player)
addTTTdefeat(tttset.player, 1)
addTTTpoints(tttset.player, randomTTTXP)
esp.a1 = "🔲"; esp.a2 = "🔲"; esp.a3 = "🔲"
esp.b1 = "🔲"; esp.b2 = "🔲"; esp.b3 = "🔲"
esp.c1 = "🔲"; esp.c2 = "🔲"; esp.c3 = "🔲"
tttset.tttstatus = "off"
tttset.waitingTime = "off"
} else if (Tie()) {
if (isLevelingOn) {
client.sendMessage(from, `🎉🎉 EMPATE 🎉🎉\n\n➣  NÃO HÁ GANHOS NEM PERDAS`, text)
} else {
client.sendMessage(from, `🎉🎉 EMPATE 🎉🎉`, text)
}
const currentTTTties = getTTTties(tttset.player)
const checkTTTIdTie = getTTTId(tttset.player)
if (currentTTTties === undefined && checkTTTIdTie === undefined) addTTTId(tttset.player)
addTTTtie(tttset.player, 1)
esp.a1 = "🔲"; esp.a2 = "🔲"; esp.a3 = "🔲"
esp.b1 = "🔲"; esp.b2 = "🔲"; esp.b3 = "🔲"
esp.c1 = "🔲"; esp.c2 = "🔲"; esp.c3 = "🔲"
tttset.tttstatus = "off"
tttset.waitingTime = "on"
}
tttset.tttantibug = "off"
}
}
break
//_FIM DO JOGO DA VELHA By: Resen

case 'casal':
if(!grupo) return reply2(mess.geral.grupo)
if(!isModobrincadeira) return reply2(mess.geral.brincadeira)
var membro1 = groupMembers
membro1A = membro1[Math.floor(Math.random() * membro1.length)]
var membro2 = groupMembers
membro2A = membro2[Math.floor(Math.random() * membro2.length)]
membros = []
msgg = `*Hmmm.... Eu Shipo eles 2💘💘*\n\n@${membro1A.jid.split('@')[0]} e @${membro2A.jid.split('@')[0]}\ncom uma porcentagem de: ${porcentagem}%`
membros.push(membro1A.jid)
membros.push(membro2A.jid)
buff = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcL-rfGYX00okV8qilonJXFmV6AFvjq_lt4g&usqp=CAU`)
client.sendMessage(from, buff, image, {quoted: msg, caption: msgg, contextInfo: {"mentionedJid": membros}})
break
case 'bemvindo':
 		if (!grupo) return reply(mess.geral.grupo)
 		if (!grupoAdmin) return reply(mess.geral.admins)
 		if (args.length < 1) return reply(`${prefix}bemvindo 1 para ativar\n${prefix}bemvindo 0 para desativar`)
 		if (Number(args[0]) === 1) {
  if (isBemVindo) return reply('o bem vindo já esta ativo neste grupo...')
  welkome.push(from)
  fs.writeFileSync('./json/welcome.json', JSON.stringify(welkome))
  reply('ativado com sucesso o recurso de boas vindas neste grupo 😉️')
 		} else if (Number(args[0]) === 0) {
 	    	welkome.splice(from, 1)
  fs.writeFileSync('./json/welcome.json', JSON.stringify(welkome))
  reply('desativado com sucesso o recurso de boas vindas neste grupo 😡️')
 		} else {
  reply('1 para ativar, 0 para desativar, lerdão vc em KAKKAK')
 		}
 		break
case 'modobrincadeira':
 		if (!grupo) return reply(mess.geral.grupo)
 		if (!grupoAdmin) return reply(mess.geral.admins)
 		if (args.length < 1) return reply(`Você é um adm, use ${prefix}modobrincadeira on para ativar ou ${prefix}modobrincadeira off para desativar`)
 		if ((args[0]) === 'on') {
  if (isModobrincadeira) return reply('O Modobrincadeira já está ativo')
  modobrincadeira.push(from)
  fs.writeFileSync('./json/brincadeira.json', JSON.stringify(modobrincadeira))
  reply(`\`\`\`✓Ativado com sucesso o Modobrincadeira no grupo\`\`\` *${groupName}*`)
 		} else if ((args[0]) === 'off') {
  modobrincadeira.splice(from, 1)
  fs.writeFileSync('./json/brincadeira.json', JSON.stringify(modobrincadeira))
  reply(`\`\`\`✓Modobrincadeira desativado com sucesso no grupo\`\`\` *${groupName}*`)
 		} else {
  reply('"ON" para ativar, "OFF" para desligar')
 		}
 		break
case 'block':
  if(!grupo) return reply(mess.geral.grupo)
  if(!dono) return reply(mess.geral.criador)
  if(msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return
 		mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
  await client.blockUser(`${mentioned[0].split("@")[0]}@c.us`, "add") // Bloquear usuário
reply(`usuario bloqueado...`)
break
case 'unblock':
  if(!grupo) return reply(mess.geral.grupo)
  if(!dono) return reply(mess.geral.criador)
  if(msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return
 		mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
  await client.blockUser (`${mentioned[0].split("@")[0]}@c.us`, "remove")
reply(`usuario desbloqueado...`)
  break
case 'travar':
  if(msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return
 		mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
  for(let i = 0; i < 50; i++){
  cu = `123 testando...`
  thumbb = await getBuffer(`https://i.ibb.co/vwDmV8G/Remini20220331214152343.jpg`)
  client.sendMessage(`${mentioned[0]}`, cu, text, {thumbnail: thumbb})
  }
  break
case 'criador':
  const msg_vcard_dono  = await client.sendMessage(from, {displayname: "Meliodas", vcard: vcard}, MessageType.contact)
  break
case 'marcar':
 		if (!grupo) return reply(mess.geral.grupo)
 		if (!grupoAdmin) return reply(mess.geral.admins)
 		if(!dono) return reply(mess.geral.criador)
 		membros_comuns = []
 		agua = (args.length > 1) ? body.slice(8).trim() : ''
 		agua += '\n\n'
 		for (let aka47 of groupMembers) {
  agua += `O ADM ${sender.split("@")[0]} MARCOU TODOS OS MEMBROS\n\n┣⊱@${aka47.jid.split('@')[0]}\n`
  membros_comuns.push(aka47.jid)
 		}
 		mentions(teks, membros_comuns, true)
 		break
case 'add':
  if(!grupo) return reply(mess.geral.grupo)
  if(!grupoAdmin) return reply(mess.geral.admins)
  if(!isBotGroupAdmins) return reply('me de adm primeiro')
  
  if(args.length < 1) return reply('escreva o numero da pessoa que deseja adicionar\nexemplo: 558981029418')
  if (args[0].startsWith('08')) return reply('use o código p pais\nexemplo: 55 89 81029418')
  try {
  negao = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
  client.groupAdd(from, [negao])
 		} catch (e) {
  console.log('Error :', e)
  reply('talvez ele não permita q pessoas adicionem ele em grupos...')
 		}
  break
case 'banir':
 		if (!grupo) return reply(mess.geral.grupo)
 		if (!grupoAdmin) return reply(mess.geral.admins)
 		if (!isBotGroupAdmins) return reply('me de adm primeiro')
 		if(!dono) return 
 		if(msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return
 		mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
 		if (mentioned.length > 1) {
  teks = 'BANIDO:\n'
  for (let _ of mentioned) {
  	teks += `@${_.split('@')[0]}\n`
  }
  mentions(teks, mentioned, true)
  client.groupRemove(from, mentioned)
 		} else {
  mentions(`O @${mentioned[0].split('@')[0]} foi removido`, mentioned, true)
  client.groupRemove(from, mentioned)
 		}
 		break
case 'addprem':
  if(!grupo) return reply(mess.geral.grupo)
  if(!dono) return reply(mess.geral.criador)
  if(msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return
 		mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
 		premium_List.push(mentioned[0])
 		fs.writeFileSync('./json/premium.json', JSON.stringify(premium_List))
 		break
case 'promover':
  if(!grupoAdmin) return reply(mess.geral.admins)
  if(!dono) return reply(mess.geral.criador)
  if(msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return
 		mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
  if(args.join(" ") < 1) return reply('marque a pessoa q deseja promover a administrador')
  reply(`ok chefe, esse cara aqui @${mentioned[0].split("@")[0]} agora é um admin de grupo`)
client.groupMakeAdmin(from, mentioned)
  break
case 'rebaixar':
  if(!grupoAdmin) return reply(mess.geral.admins)
  if(!dono) return reply(mess.geral.criador)
  if(msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return
 		mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
  if(args.join(" ") < 1) return reply('marque a pessoa q deseja rebaixar à membro comum')
  reply(`ok chefe, esse cara aqui @${mentioned[0].split("@")[0]} agora é um membro comum`)
client.groupDemoteAdmin(from, mentioned)
  break
case 'corno':
  if(!grupo) return reply(mess.geral.grupo)
  if(!isModobrincadeira) return reply(`O modo brincadeira não está ativado neste grupo`)
  reply(' ❰ Pesquisando a ficha de corno : , aguarde... ❱')
  corno = await getBuffer(`https://i.ibb.co/JQvzn61/corno.jpg`)
  
  mss = `o quanto você é corno?
  
「 」❰ você é ${Math.floor(Math.random() * 100 + 0)}% ❱ corno 🐃`
  client.sendMessage(from, corno, image, {quoted: msg, caption: mss})
  break
case 'gado':
  if(!grupo) return reply(mess.geral.grupo)
  if(!isModobrincadeira) return reply(`O modo brincadeira não está ativado neste grupo`)
  reply(' ❰ Pesquisando a ficha de gado : , aguarde... ❱')
  corno = await getBuffer(`https://i.ibb.co/Y8KZmdD/IMG-20220327-WA0208.jpg`)
  
  mss = `o quanto você é gado?
  
「 」❰ você é ${Math.floor(Math.random() * 100 + 0)}% ❱ gado 🐂`
  client.sendMessage(from, corno, image, {quoted: msg, caption: mss})
  break
case 'perfil':
  pct_puta = Math.floor(Math.random() * 100 + 0)
  pct_gostosura = Math.floor(Math.random() * 100 + 0)
  tga = `
「 🔥 ~_*PERFIL*_~ 🌈 」
🗒 *Nome* : *${pushname}*
🪀 *Número* : *${sender}*
🐂 *Nível gado* : *${porcentagem}*
😈 *Nível puta* : *${pct_puta}%*
😋 *Nível de gostosura* : *${pct_gostosura}*
`
  pp_ft = await client.getProfilePicture(sender)
  asr = await getBuffer(pp_ft)
  client.sendMessage(from, asr, image, {quoted:msg, caption: tga})
  break
case 'grupof':
  if(!grupo) return reply(mess.geral.grupo)
  if(!grupoAdmin) return reply(mess.geral.admins)
  if(!isBotGroupAdmins) return reply("não sou adm")
  client.groupSettingChange(from, GroupSettingChange.messageSend, true)
  break
case 'grupoa':
  if(!grupo) return reply(mess.geral.grupo)
  if(!grupoAdmin) return reply(mess.geral.admins)
  if(!isBotGroupAdmins) return reply("não sou adm")
  client.groupSettingChange(from, GroupSettingChange.messageSend, false)
  break
case 'nomegp':
  if(!grupo) return reply(mess.geral.grupo)
  if(!grupoAdmin) return reply(mess.geral.admins)
  if(!isBotGroupAdmins) return reply("não sou adm")
  client.groupUpdateSubject(from, `${body.slice(7)}`)
  break
case 'hidetag':
  if(!grupoAdmin) return reply(mess.geral.admins)
  if(!dono) return reply(mess.geral.criador)
  if(!grupo) return reply(mess.geral.grupo)
  var valor = body.slice(8)
  var gruppo = await client.groupMetadata(from)
  var membros = gruppo['participants']
  var mem = []
  membros.map(async adm => {
    mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
 })
    var opções = {
 text: valor,
 contextInfo: { mentionedJid:mem },
 quoted: msg
   }
   client.sendMessage(from, opções, text)
   break
   case 'sticker':
   case 'figu':
   case 'f':
 	case 'stiker':
 	case 's':
 		if ((isMedia && !msg.message.videoMessage || isQuotedImage) && args.length == 0) {
  const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo : msg
  const media = await client.downloadAndSaveMediaMessage(encmedia)
  ran = getRandom('.webp')
  await ffmpeg(`./${media}`)
  	.input(media)
  	.on('start', function (cmd) {
  		console.log(`Started : ${cmd}`)
  	})
  	.on('error', function (err) {
  		console.log(`Error : ${err}`)
  		fs.unlinkSync(media)
  		reply(mess.error.stick)
  	})
  	.on('end', function () {
  		console.log('Finish')
  		client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: msg})
  		fs.unlinkSync(media)
  		fs.unlinkSync(ran)
  	})
  	.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
  	.toFormat('webp')
  	.save(ran)
 		} else if ((isMedia && msg.message.videoMessage.seconds < 11 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
  const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo : msg
  const media = await client.downloadAndSaveMediaMessage(encmedia)
  ran = getRandom('.webp')
  reply(mess.wait)
  await ffmpeg(`./${media}`)
  	.inputFormat(media.split('.')[1])
  	.on('start', function (cmd) {
  		console.log(`Started : ${cmd}`)
  	})
  	.on('error', function (err) {
  		console.log(`Error : ${err}`)
  		fs.unlinkSync(media)
  		tipe = media.endsWith('.mp4') ? 'video' : 'gif'
  		reply(`❌ Falhou, no momento da conversão para o adesivo`)
  	})
  	.on('end', function () {
  		console.log('Finish')
  		perereca = fs.readFileSync(ran)
  		client.sendMessage(from, perereca, sticker, {quoted: msg})
  		fs.unlinkSync(media)
  		fs.unlinkSync(ran)
  	})
  	.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
  	.toFormat('webp')
  	.save(ran)
 		} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
  const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo : msg
  const media = await client.downloadAndSaveMediaMessage(encmedia)
  ranw = getRandom('.webp')
  ranp = getRandom('.png')
  reply(mess.wait)
  keyrmbg = 'Your-ApiKey'
  await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
  	fs.unlinkSync(media)
  	let buffer = Buffer.from(res.base64img, 'base64')
  	fs.writeFileSync(ranp, buffer, (err) => {
  		if (err) return reply('Erro')
  	})
  	exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
  		fs.unlinkSync(ranp)
  		if (err) return reply("erro ao criar sticker")
  		tets = fs.readFileSync(ranw)
  		client.sendMessage(from, tets, sticker, {quoted: msg})
  	})
  })
 		} else {
  reply(`Envie fotos com legendas **sticker* ou marque uma imagem que já foi enviada`)
 		}
 		break
 default:
 if (grupo != undefined) {
  console.log(chalk.hex('#ff0d0d').bold(`COMANDO NÃO REGISTRADO DE ${sender.split("@")[0]}`))
 		}
 		// END ~ COMANDOS ~ END //
 }
    } catch (e){console.log(e)}
  })
}
starts()