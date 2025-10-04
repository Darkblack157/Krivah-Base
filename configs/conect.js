const pino = require('pino')
const readline = require('readline')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')

// Cria a interface apenas uma vez
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Função para ler do terminal
function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer.trim()))
    })
}

// Função principal exportável
async function baileys() {
    // garante que a pasta exista
    const qrcodePath = path.join(__dirname, '../database/qrcode')
    if (!fs.existsSync(qrcodePath)) {
        fs.mkdirSync(qrcodePath, { recursive: true })
    }

    const baileysModule = await import('@whiskeysockets/baileys')
    const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, DisconnectReason } = baileysModule

    const { state, saveCreds } = await useMultiFileAuthState(qrcodePath)
    const { version } = await fetchLatestBaileysVersion()
    const logger = pino({ level: 'silent' })

    const zyn = makeWASocket({
        version,
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        browser: ['Windows', 'Chrome', '10.0'],
        logger
    })

    zyn.ev.on('creds.update', saveCreds)

    // FLAG para pedir número apenas uma vez
    let numeroSolicitado = false

    zyn.ev.on('connection.update', async (update) => {
        const { connection, qr, lastDisconnect } = update

        // Solicita Pairing Code apenas se ainda não solicitou
        if ((connection === "connecting" || !!qr) && !numeroSolicitado) {
            numeroSolicitado = true
            const phoneNumber = await ask("Digite seu número (E.5511912345678 sem +): ")
            const code = await zyn.requestPairingCode(phoneNumber)
            console.log("📲 Seu código de emparelhamento:", code)
        }

        if (connection === "open") {
            console.log("✅ Bot conectado com sucesso!")
            rl.close() // fecha readline
        }

        if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Sessão encerrada, é necessário emparelhar novamente.")
                
                if (fs.existsSync(qrcodePath)) {
                    fs.rmSync(qrcodePath, { recursive: true, force: true })
                    console.log("🗑️ Sessão antiga apagada, execute novamente para gerar um novo código.")
                }
            } else {
                console.log("⚠️ Conexão perdida, tentando reconectar...")
                baileys()
            }
        }
    })

    return zyn
}

module.exports = baileys
