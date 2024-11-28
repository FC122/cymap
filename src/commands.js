const simpleParser = require("mailparser").simpleParser
const ImapProxy = require("./imapProxy")

const modifyError = (err) => {
  if (err.message.includes("ENOTFOUND")) {
    err.message = "Invalid host"
  }
  if (err.message.includes("Timed out while authenticating with server")) {
    err.message += ". Make sure that port and tls are set correctly."
  }
  if (err.message.includes("Timed out while connecting to server")) {
    err.message += ". Make sure that port and tls are set correctly."
  }
  return err
}

function getAllMail() {
  return new Promise((resolve, reject) => {
    ImapProxy.createConnection()
    const imap = ImapProxy.getConnectionInstance()
    let messages = []
    let parsedMessages = 0
    imap.once("ready", () => {
      imap.openBox("INBOX", true, (err, box) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        console.log(box)
        if (box.messages.total === 0) return resolve(messages)
        const imapFetch = imap.seq.fetch("1:*", { bodies: '', struct: true });
        imapFetch.on("message", (message, seqno) => {
          console.log(seqno)
          message.on("body", async (stream, info) => {
            simpleParser(stream, async (err, mail) => {
              console.log(mail)
              messages.push(mail)
              parsedMessages++;
              if (parsedMessages === box.messages.total) {
                console.log("All messages processed")
                imap.end()
                return resolve(messages)
              }
            });
          })
        })
        imapFetch.on("error", async (err) => {
          console.log(err)
          return reject(err)
        })
      })
    })
    imap.once('error', function(err) {
      console.log(err)
      return reject(modifyError(err))
    })
    imap.once("end", (err) => {
      console.log(err)
      if (err) return reject(err)
    })
    imap.connect()
  })
}

function getEmailByIndex(indexOfMailBottomUp = 1) {
  return new Promise((resolve, reject) => {
    if (indexOfMailBottomUp <= 0) return reject(new Error("Index cant be smaller than 1."))
    ImapProxy.createConnection()
    const imap = ImapProxy.getConnectionInstance()
    imap.once("ready", () => {
      imap.openBox("INBOX", true, (err, box) => {
        if (err) {
          console.log(err)
          return reject(err);
        }
        if (box.messages.total === 0) return reject(new Error("No emails in the mailbox."))
        let indexOfMailTopDown = box.messages.total - indexOfMailBottomUp + 1
        console.log("Index of mail top down:" + indexOfMailTopDown)
        console.log("Total:" + box.messages.total)
        const imapFetch = imap.seq.fetch(`${indexOfMailTopDown}:${box.messages.total}`, { bodies: '', struct: true });
        imapFetch.on("message", (message, seqno) => {
          console.log(seqno)
          message.on("body", async (stream, info) => {
            console.log(info)
            const mail = await simpleParser(stream)
            imap.end()
            resolve(mail)
          })
        })
        imapFetch.on("error", async (err) => {
          console.log(err)
          if (err) return reject(err);
        })
      })
    })
    imap.once('error', (err) => {
      console.log(err)
      return reject(modifyError(err))
    })
    imap.once("end", (err) => {
      console.log(err)
      if (err) return reject(err)
    })
    imap.connect()
  })
}

function getEmailBySubject(subject = "") {
  console.log("subject: ", subject)
  return new Promise((resolve, reject) => {
    if (!subject.length) return reject(new Error("Subject required but not provided"))
    ImapProxy.createConnection()
    const imap = ImapProxy.getConnectionInstance()
    imap.once("ready", () => {
      imap.openBox("INBOX", true, (err, box) => {
        if (err) {
          console.log(err)
          return reject(err);
        }
        if (box.messages.total === 0) return reject(new Error("No emails in the mailbox."))
        imap.seq.search([['HEADER', 'SUBJECT', subject]], (err, emailUIDArr) => {
          if (!emailUIDArr.length) return reject(new Error("No email matching the subject"))
          // console.log("uidArr: ", emailUIDArr)
          const emailSeqNumber = emailUIDArr[0]
          const imapFetch = imap.seq.fetch(`${emailSeqNumber}`, { bodies: '', struct: true });
          imapFetch.on("message", (message, seqno) => {
            console.log(seqno)
            message.on("body", async (stream, info) => {
              const mail = await simpleParser(stream)
              console.log("mail res", mail)

              imap.end()
              resolve(mail)
            })
          })
          imapFetch.on("error", async (err) => {
            console.log(err)
            if (err) return reject(err);
          })
          // imap.end()
          // resolve(resArr[0])
        });
      })
    })
    imap.once('error', (err) => {
      console.log(err)
      return reject(modifyError(err))
    })
    imap.once("end", (err) => {
      console.log(err)
      if (err) return reject(err)
    })
    imap.connect()
  })
}


function deleteAllMail() {
  return new Promise((resolve, reject) => {
    ImapProxy.createConnection()
    const imap = ImapProxy.getConnectionInstance()
    imap.once("ready", () => {
      imap.openBox("INBOX", false, (err, box) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        if (box.messages.total === 0) return resolve(true)
        console.log(box)
        imap.search(["ALL"], (err, results) => {
          if (err) return reject(err)
          console.log(results)
          for (const uid of results) {
            console.log(uid)
            imap.addFlags(uid, "Deleted")
          }
          imap.closeBox((err) => {
            console.log(err)
            if (err) return reject(err)
            imap.end()
            resolve(true)
          })
        })
      })
    })
    imap.once('error', (err) => {
      console.log(err)
      if (err) return reject(modifyError(err))
    });
    imap.once("end", (err) => {
      console.log(err)
      if (err) return reject(err)
    })
    imap.connect()
  })
}

function deleteEmailByIndex(indexOfMailBottomUp = 1) {
  return new Promise((resolve, reject) => {
    if (indexOfMailBottomUp < 0) return reject(new Error("Negative indexes are not allowed"))
    ImapProxy.createConnection()
    const imap = ImapProxy.getConnectionInstance()
    imap.once("ready", () => {
      imap.openBox("INBOX", false, (err, box) => {
        if (err) {
          console.log(err)
          return resolve(err)
        }
        if (box.messages.total === 0) return reject(new Error("Can't delete message, inbox empty."))
        if (indexOfMailBottomUp > box.messages.total) return reject(new Error("Can't find the message."))
        let indexOfMailTopDown = box.messages.total - indexOfMailBottomUp + 1
        console.log("Total:" + box.messages.total)
        console.log("Index of mail top down:" + indexOfMailTopDown)
        const imapFetch = imap.seq.fetch(`1:*`, { bodies: '', struct: true });
        imapFetch.on("message", (message, seqno) => {
          console.log(seqno)
          message.on("attributes", async (attr, info) => {
            console.log(info)
            if (seqno === indexOfMailTopDown) {
              imap.addFlags(attr.uid, "Deleted")
            }
          })
        })
        imapFetch.on("end", (err) => {
          console.log(err)
          if (err) return reject(err)
          imap.closeBox((err) => {
            if (err) {
              console.log(err)
              if (err) return reject(err)
            }
            imap.end()
            resolve(true)
          })
        })
      })
    })

    imap.once('error', (err) => {
      console.log(err)
      return reject(modifyError(err))
    })
    imap.once("end", (err) => {
      console.log(err)
      if (err) return reject(err)
    })
    imap.connect()
  })
}

function waitForMail() {
  return new Promise((resolve) => {
    ImapProxy.createConnection()
    const imap = ImapProxy.getConnectionInstance()
    let messages = []
    imap.once("mail", (numNewMessages) => {
      imap.openBox("INBOX", true, (err, box) => {
        if (err) {
          console.log(err)
        }
        const imapFetch = imap.seq.fetch(`1:${numNewMessages}`, { bodies: '', struct: true });
        imapFetch.on("message", (message, seqno) => {
          console.log(seqno)
          message.on("body", async (stream, info) => {
            console.log(info)
            const mail = await simpleParser(stream)
            messages.push(mail)
          })
        })
        imapFetch.on("error", async (err) => {
          console.log(err)
          if (err) throw err
        })

        imapFetch.on("end", async () => {
          resolve(messages)
        })
      })

    })
    imap.once('error', (err) => {
      console.log(err)
      if (err) throw err;
    });
    imap.once("end", (err) => {
      console.log(err)
      if (err) throw err;
    })
    imap.connect()
  })
}

module.exports = {
  getAllMail,
  deleteAllMail,
  getEmailByIndex,
  getEmailBySubject,
  deleteEmailByIndex,
  waitForMail
}
