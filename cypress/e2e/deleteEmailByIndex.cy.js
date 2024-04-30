/// <reference types="cypress" />
import emails from "../support/emails"

describe('tests deleteEmailByIndex function', () => {
    before("Set configs and add mail", ()=>{
        cy.imapConfig().then(config=>{
          cy.setConnectionConfig(config)
        })
    })

    it("deletes email by index", ()=>{
        cy.deleteAllMail().then(()=>{
            cy.sendEmails(4, emails.helloWorld()).then(()=>{
                cy.wait(1000)
                cy.deleteEmailByIndex(2).then(()=>{
                    cy.wait(1000)
                    cy.getAllMail().then(emails=>{
                        expect(emails.length).to.eq(3)
                    })
                })
            })
        })
    })

    it("throws an error if email is not found",()=>{
        cy.deleteAllMail().then(()=>{
            cy.wait(1000)
            cy.on("fail", (err)=>{
                expect(err.message).to.contain("Can't delete message, inbox empty.")
              })
            cy.deleteEmailByIndex()
        })
    })

    it("throws an error if index is out of bounds", ()=>{
        cy.deleteAllMail().then(()=>{
            cy.sendEmails(4, emails.helloWorld()).then(()=>{
                cy.wait(1000)
                cy.on("fail", (err)=>{
                    expect(err.message).to.contain("Can't find the message.")
                })
                cy.deleteEmailByIndex(5)
            })
        })
    })

    it("throws an error if index is negative", ()=>{
        cy.deleteAllMail().then(()=>{
            cy.sendEmails(4, emails.helloWorld()).then(()=>{
                cy.wait(1000)
                cy.on("fail", (err)=>{
                    expect(err.message).to.contain("Negative indexes are not allowed")
                })
                cy.deleteEmailByIndex(-5)
            })
        })
    })

    it("returns true after deleting a mail", ()=>{
        cy.sendEmails(4, emails.helloWorld())
        cy.wait(5000)
        cy.deleteAllMail().then(isDeleted=>{
            expect(isDeleted).to.eq(true)
        })
    })

    it("getAllMail returns one less after deleteEmailByIndex is called", ()=>{
      cy.sendEmails(2, emails.helloWorld()).then(()=>{
        cy.wait(5000)
        cy.getAllMail().then((emails)=>{
          expect(emails.length).to.be.gt(0)
          cy.deleteAllMail().then(()=>{
            cy.wait(1000)
            cy.getAllMail().then(emails=>{
              expect(emails.length).to.eq(0)
            })
          })
        })
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
        cy.destroyConnection()
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
        cy.destroyConnection()
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
        cy.destroyConnection()
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
        cy.destroyConnection()
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
        cy.destroyConnection()
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
        cy.destroyConnection()
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
        cy.destroyConnection()
      })
    
      it('throws an error when setConnectionConfigs is not used', ()=>{
        cy.destroyConnection()
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Config object empty.")
        })
        cy.deleteAllMail()
      })
})