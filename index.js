const baileys = require('./configs/conect')
const fs = require('fs')
const path = require('path');
const { Prefix, NumeroDono } = require('./configs/settings.json')

const prefix1 = Prefix;
const numberDono1 = NumeroDono

async function main() {
    const zyn = await baileys()

    // Lê prefixo do JSON
    let prefix = prefix1 
    const numberDono = numberDono1

    zyn.ev.on('messages.upsert', async ({ messages, type }) => {

        if (type !== 'notify') return;


        const info = messages[0]
        if (!info.message || info.key.fromMe) return


        const from = info.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const text = info.message.conversation || info.message.extendedTextMessage?.text
        if (!text) return

        const messageContent = info.message.conversation || info.message.extendedTextMessage?.text;

       const sender = info.key.participant || info.key.remoteJid; // garante que não seja undefined
const numeroDonoFull = numberDono;
const SoDono = numeroDonoFull;
         

         async function reply(text) {
      await zyn.sendMessage(from, { text }, { quoted: info });
}

//==============(BODY)================\\
 
let body = "";

if (type === "conversation") {
  body = info.message.conversation;
} else if (type === "viewOnceMessageV2") {
  const msg = info.message.viewOnceMessageV2?.message;
  body = msg?.imageMessage?.caption || msg?.videoMessage?.caption || "";
} else if (type === "imageMessage") {
  body = info.message.imageMessage?.caption || "";
} else if (type === "videoMessage") {
  body = info.message.videoMessage?.caption || "";
} else if (type === "extendedTextMessage") {
  body = info.message.extendedTextMessage?.text || "";
} else if (type === "viewOnceMessage") {
  const msg = info.message.viewOnceMessage?.message;
  body = msg?.videoMessage?.caption || msg?.imageMessage?.caption || "";
} else if (type === "documentWithCaptionMessage") {
  body = info.message.documentWithCaptionMessage?.message?.documentMessage?.caption || "";
} else if (type === "buttonsMessage") {
  body = info.message.buttonsMessage?.imageMessage?.caption || "";
} else if (type === "buttonsResponseMessage") {
  body = info.message.buttonsResponseMessage?.selectedButtonId || "";
} else if (type === "listResponseMessage") {
  body = info.message.listResponseMessage?.singleSelectReply?.selectedRowId || "";
} else if (type === "templateButtonReplyMessage") {
  body = info.message.templateButtonReplyMessage?.selectedId || "";
} else if (type === "groupInviteMessage") {
  body = info.message.groupInviteMessage?.caption || "";
} else if (type === "pollCreationMessageV3") {
  body = info.message.pollCreationMessageV3 || "";
} else if (type === "interactiveResponseMessage") {
  try {
    body = JSON.parse(info.message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson)?.id || "";
  } catch {
    body = "";
  }
} else if (type === "text") {
  body = info.text || "";
} 

    
if (!messageContent) return;

// Dentro do handler de mensagem, caso esteja em um grupo
let groupMembers = [];
let groupAdmins = [];

if (isGroup) {
  function getGroupAdmins(participants) {
    return participants.filter(participant => participant.isAdmin);
  }

  try {
    const groupMetadata = await zyn.groupMetadata(from);
    groupMembers = groupMetadata.participants;
    groupAdmins = getGroupAdmins(groupMembers);
  } catch (err) {
    console.error("Erro ao buscar metadata do grupo:", err);
  }
}



const yourBotNumber = '5528992742884@s.whatsapp.net';
const isBot = sender === yourBotNumber;  
const isnit = false;  
const issupre = false;
const ischyt = false;

const isQuotedVideo = !!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage;
const isQuotedAudio = !!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage;
const isQuotedDocument = !!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.documentMessage;
const isQuotedSticker = !!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage;
const isQuotedImage = !!info.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')

function getNumber(info) {
    // Se for grupo, pega do participant
    if (info.key.participant) {
        return info.key.participant.split('@')[0];
    }
    // Se for privado, pega do remoteJid
    if (info.key.remoteJid) {
        return info.key.remoteJid.split('@')[0];
    }
    return '';
}

// Só processa se começar com o prefixo
if (!text.startsWith(prefix)) return

const args = text.slice(prefix.length).trim().split(/ +/)
const command = args.shift().toLowerCase() // pega só a primeira palavra

const q = args.join(' ')


switch (command) { // pega apenas o comando principal
    case 'ping':
                await zyn.sendMessage(from, { text: 'Pong!' })
                console.log(`Respondido Pong! para ${from}`)
                break

case 'meunumero':               
const numero = from.split('@')[0]
await zyn.sendMessage(from, { text: `📲 Seu número é: ${numero}` })
console.log(`Número enviado para ${from}: ${numero}`)
break


    case 'setprefix':
                // Exemplo: "!setprefix $"
                const newPrefix = command.split(' ')[1]
                if (!newPrefix) {
                    await zyn.sendMessage(from, { text: 'Por favor, informe um prefixo válido.' })
                    return
                }
                prefix = newPrefix
                fs.writeFileSync(path, JSON.stringify({ Prefix: prefix }, null, 2))
                await zyn.sendMessage(from, { text: `Prefixo alterado para: ${prefix}` })
                console.log(`Prefixo alterado para ${prefix}`)
                break

case 'totag': {
    if (!SoDono) return reply("❌ Somente o dono pode usar");

    // Função para pegar apenas o número do sender
    function getNumber(info) {
        if (info.key.participant) return info.key.participant.split('@')[0];
        if (info.key.remoteJid) return info.key.remoteJid.split('@')[0];
        return '';
    }

    const numero1 = getNumber(info);

    let DFC = "";
    const rsm = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;

    // mensagens de mídia
    const pink   = isQuotedImage ? rsm?.imageMessage    : info.message?.imageMessage;
    const blue   = isQuotedVideo ? rsm?.videoMessage    : info.message?.videoMessage;
    const purple = isQuotedDocument ? rsm?.documentMessage : info.message?.documentMessage;
    const yellow = isQuotedDocW ? rsm?.documentWithCaptionMessage?.message?.documentMessage
                                : info.message?.documentWithCaptionMessage?.message?.documentMessage;
    const aud_d  = isQuotedAudio ? rsm?.audioMessage   : "";
    const figu_d = isQuotedSticker ? rsm?.stickerMessage : "";

    // texto simples (resposta ou digitado)
    let red = "";
    if (isQuotedMsg && rsm?.conversation) {
        red = rsm.conversation;
    } else if (!aud_d && !figu_d && !pink && !blue && !purple && !yellow && info.message?.conversation) {
        red = q.length > 1 ? q.trim() : "";
    }

    // texto extendido (resposta ou digitado)
    let green = "";
    if (rsm?.extendedTextMessage?.text) {
        green = rsm.extendedTextMessage.text;
    } else if (info?.message?.extendedTextMessage?.text) {
        green = q.length > 1 ? q.trim() : "";
    }

    const MRC_TD = groupMembers.map(i => i.id);

    // IMAGEM
    if (pink && !aud_d && !purple) {
        DFC = pink;
        pink.caption = q.length > 1
            ? "Marcação do Adm: " + q
            : `Marcação do Adm: ${numero1}\n\n${pink.caption || ""}`;
        pink.image = { url: pink.url };
        pink.mentions = MRC_TD;

    // VÍDEO
    } else if (blue && !aud_d && !purple) {
        DFC = blue;
        blue.caption = q.length > 1
            ? "Marcação do Adm: " + q.trim()
            : `Marcação do Adm: ${numero1}\n\n${blue.caption || ""}`;
        blue.video = { url: blue.url };
        blue.mentions = MRC_TD;

    // TEXTO normal
    } else if (red && !aud_d && !purple) {
        DFC = { text: `Marcação do Adm: ${numero1}\n\n${red}`, mentions: MRC_TD };

    // TEXTO extendido
    } else if (!aud_d && !figu_d && green && !purple) {
        DFC = { text: `Marcação do Adm: ${numero1}\n\n${green}`, mentions: MRC_TD };

    // DOCUMENTO
    } else if (purple) {
        DFC = purple;
        purple.document = { url: purple.url };
        purple.mentions = MRC_TD;

    // DOCUMENTO COM LEGENDA
    } else if (yellow && !aud_d) {
        DFC = yellow;
        yellow.caption = q.length > 1
            ? "Marcação do Adm: " + q.trim()
            : `Marcação do Adm: ${numero1}\n\n${yellow.caption || ""}`;
        yellow.document = { url: yellow.url };
        yellow.mentions = MRC_TD;

    // FIGURINHA
    } else if (figu_d && !aud_d) {
        DFC = figu_d;
        figu_d.sticker = { url: figu_d.url };
        figu_d.mentions = MRC_TD;

    // ÁUDIO
    } else if (aud_d) {
        DFC = aud_d;
        aud_d.audio = { url: aud_d.url };
        aud_d.mentions = MRC_TD;
        aud_d.ptt = true;
    }

    await zyn.sendMessage(from, DFC).catch(e => console.log(e));
    break;
}





            default:
                await zyn.sendMessage(from, {
                    text: `❌ Comando "${command}" não encontrado!\nUse ${prefix}menu para ver a lista de comandos.`
                })
                break
        }
    })
}

main()
