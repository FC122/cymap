/// <reference types="cypress" />
import emails from "../support/emails"

describe('tests deleteAllMail function', () => {
    before("Set configs and add mail", ()=>{
        cy.imapConfig().then(config=>{
          cy.setConnectionConfig(config)
        })
    })

    it("returns true after deleting all mail", ()=>{
        cy.sendEmails(4, emails.helloWorld())
        cy.wait(5000)
        cy.deleteAllMail().then(isDeleted=>{
            expect(isDeleted).to.eq(true)
        })
    })

    it("returns true after mailbox is empty", ()=>{
        cy.deleteAllMail()
        cy.wait(5000)
        cy.deleteAllMail().then(isDeleted=>{
            expect(isDeleted).to.eq(true)
        })
    })

    it('throws an error on wrong credentials', ()=>{
        cy.setConnectionConfig({
          password:"wrongpass",
          user:"wronguser",
          host:'imap.gmail.com',
          port:993,
          tls:true,
          tlsOptions: { rejectUnauthorized: false }
        })
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Invalid credentials (Failure)")
        })
        cy.deleteAllMail()
      })
    
      it('throws an error on invalid host', ()=>{
        cy.setConnectionConfig({
          password:Cypress.env("pass"),
          user:Cypress.env("user"),
          host:'InvalidHost',
          port:993,
          tls:true,
          tlsOptions: { rejectUnauthorized: false }
        })
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Invalid host")
        })
        cy.deleteAllMail()
      })
    
      it('throws an error on invalid port', ()=>{
        cy.setConnectionConfig({
          password:Cypress.env("pass"),
          user:Cypress.env("user"),
          host:'imap.gmail.com',
          tls:true,
          tlsOptions: { rejectUnauthorized: false }
        })
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Timed out while connecting to server. Make sure that port and tls are set correctly.")
        })
        cy.deleteAllMail()
      })
    
      it('throws an error on invalid tls', ()=>{
        cy.setConnectionConfig({
          password:Cypress.env("pass"),
          user:Cypress.env("user"),
          host:'imap.gmail.com',
          port:993,
          tlsOptions: { rejectUnauthorized: false }
        })
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Timed out while authenticating with server. Make sure that port and tls are set correctly.")
        })
        cy.deleteAllMail()
      })
    
      it("throws an error on empty string pass", ()=>{
        cy.setConnectionConfig({
          password:"",
          user:Cypress.env("user"),
          host:'imap.gmail.com',
          port:993,
          tls:true,
          tlsOptions: { rejectUnauthorized: false }
        })
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("No supported authentication method(s) available. Unable to login.")
        })
        cy.deleteAllMail()
      })
    
      it("throws an error on empty string user", ()=>{
        cy.setConnectionConfig({
          password:"",
          user:Cypress.env("user"),
          host:'imap.gmail.com',
          port:993,
          tls:true,
          tlsOptions: { rejectUnauthorized: false }
        })
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("No supported authentication method(s) available. Unable to login.")
        })
        cy.deleteAllMail()
      })
    
      it("throws an error on empty string pass and empty string user", ()=>{
        cy.setConnectionConfig({
          password:"",
          user:"",
          host:'imap.gmail.com',
          port:993,
          tls:true,
          tlsOptions: { rejectUnauthorized: false }
        })
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("No supported authentication method(s) available. Unable to login.")
        })
        cy.deleteAllMail()
      })
    
      it('throws an error when setConnectionConfigs is not used', ()=>{
        cy.destroyConnection()
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Config object empty.")
        })
        cy.deleteAllMail()
      })
})