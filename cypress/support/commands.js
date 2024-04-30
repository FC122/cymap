Cypress.Commands.add('sendMail', (config, data) => { 
    return cy.task("sendMail", {config:config, data:data})
})

Cypress.Commands.add('alias', (alias) => { 
    return Cypress.env("localPart") + alias + Cypress.env("domain")
})

Cypress.Commands.add("imapConfig", ()=>{
    return {
        password:Cypress.env("pass"),
        user:Cypress.env("user"),
        host:'imap.gmail.com',
        port:993,
        tls:true,
        tlsOptions: { rejectUnauthorized: false }
    }
})

Cypress.Commands.add("smtpConfig", (alias="")=>{
    return  {
        auth:{
          pass: Cypress.env("pass"),
          user:Cypress.env("localPart") + alias + Cypress.env("domain")
        },
        host: 'imap.gmail.com',
        port: 465,
        secure: true
      }
})

Cypress.Commands.add("sendEmails", (n, email)=>{
    cy.smtpConfig().then(config=>{
        for(let i=1;i<=n;i++){
            cy.sendMail(config, email)
            cy.wait(2000)
        }
    })
})

Cypress.Commands.add("catchStdout", (callback)=>{
    return cy.task("catchStdout", callback)
})
