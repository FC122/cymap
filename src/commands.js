const ImapProxy = require("./ImapProxy")
const simpleParser = require("mailparser").simpleParser

function getAllMail(boxName="INBOX"){
    return new Promise((resolve, reject) => {
        const imap = ImapProxy.createConnection()
        const messages = []
        const openInbox=(callback) =>{
            imap.openBox(boxName, true, callback)
        }
        imap.once("ready", ()=>{
            openInbox((err, box)=>{
                if (err) throw err;
                const imapFetch = imap.seq.fetch('1:*', {
                    bodies: '',
                    struct: true
                });
            
                imapFetch.on("message", (message, seqno)=>{
                    message.on("body", async (stream, info)=>{
                        const mail = await simpleParser(
                            stream
                        )
                        messages.push(mail)
                    })
                })

                imapFetch.on("error", async (err)=>{                 
                    console.log(err)
                    reject(err)
                })

                imapFetch.on("end", async ()=>{                 
                   resolve(messages)
                })
            })
        })

        imap.once('error', function(err) {
            console.log(err);
            reject(err)
        });
      
        imap.connect()
    })
}

function getEmailById(){

}

function getEmailByIndex(){

}

function getEmailBySubject(){

}

function getUnseenEmails(){

}

function waitForEmail(){

}

function waitForEmailWithSubject(){

}

function deletAllMail(){

}

function deleteEmailById(){

}

function deleteUnseenMail(){

}

module.exports = {
    getAllMail
}