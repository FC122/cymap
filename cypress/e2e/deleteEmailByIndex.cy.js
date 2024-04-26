/// <reference types="cypress" />
import emailData from "../fixtures/emails"

describe('tests getAllMail function', () => {
    before("Set config", ()=>{
        cy.imapConfig().then(config=>{
            cy.setConnectionConfig(config)
          })
    })
    
    it("deletes all mail", ()=>{
        cy.deleteEmailByIndex(4).then(isDeleted=>{
            expect(isDeleted).to.eq(true)
        })
    })
})