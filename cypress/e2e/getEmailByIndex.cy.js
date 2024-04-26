/// <reference types="cypress" />
import emailData from "../fixtures/emails"

describe('tests getAllMail function', () => {
    before("Set config", ()=>{
        cy.imapConfig().then(config=>{
            cy.setConnectionConfig(config)
          })
    })
    
    it("deletes all mail", ()=>{
        cy.getEmailByIndex(3).then(mail=>{
            cy.log(mail.subject)
            cy.pasteHtml(mail.html)
        })
    })
})