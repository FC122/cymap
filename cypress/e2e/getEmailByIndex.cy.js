/// <reference types="cypress" />
import emails from "../support/emails"

describe('tests deleteEmailByIndex function', () => {
    before("Set configs and add mail", ()=>{
        cy.imapConfig().then(config=>{
          cy.setConnectionConfig(config)
        })
    })

    it("fetches email by index", ()=>{
      cy.smtpConfig().then(config=>{
        for(let i=1;i<=4;i++){
            cy.sendMail(config, emails.helloWorld(i))
            cy.wait(2000)
        }
      }).then(()=>{
        cy.getEmailByIndex(2).then(email=>{
          expect(email.to.text).to.contain(3)
          expect(email).to.have.property('attachments').that.is.an('array');
          expect(email).to.have.property('headers').that.is.an('object');
          expect(email).to.have.property('headerLines').that.is.an('array').with.lengthOf.at.least(1);
          expect(email).to.have.property('html').that.is.a('string').and.equals(emails.helloWorld(3).html);
          expect(email).to.have.property('text').that.is.a('string').and.equals(emails.helloWorld(3).text);
          expect(email).to.have.property('textAsHtml').that.is.a('string')
          expect(email).to.have.property('subject').that.is.a('string').and.equals(emails.helloWorld(3).subject);
          expect(email).to.have.property('date').that.is.a('string')
          expect(email).to.have.property('to').that.is.an('object').and.has.property('value').that.is.an('array').with.lengthOf(1);
          expect(email.to.value[0]).to.have.property('address').that.is.a('string').and.equals(emails.helloWorld(3).to);
          expect(email.to.value[0]).to.have.property('name').that.is.a('string').and.equals("");
          expect(email).to.have.property('from').that.is.an('object').and.has.property('value').that.is.an('array').with.lengthOf(1);
          expect(email.from.value[0]).to.have.property('address').that.is.a('string').and.equals(emails.helloWorld(3).from);
          expect(email.from.value[0]).to.have.property('name').that.is.a('string').and.equals("");
          expect(email).to.have.property('messageId').that.is.a('string')
        })
      })
    })

    it("throws an error if email is not found", ()=>{
      cy.deleteAllMail().then(()=>{
        cy.wait(2000)
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("No emails in the mailbox.")
        })
        cy.getEmailByIndex(1)
      })
    })

    it("throws an error if index is negative", ()=>{
      cy.deleteAllMail().then(()=>{
        cy.wait(2000)
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Index cant be smaller than 1.")
        })
        cy.getEmailByIndex(-1)
      })
    })

    it("throws an error if index is 0", ()=>{
      cy.deleteAllMail().then(()=>{
        cy.wait(2000)
        cy.on("fail", (err)=>{
          expect(err.message).to.contain("Index cant be smaller than 1.")
        })
        cy.getEmailByIndex(0)
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
      cy.smtpConfig().then(config=>{
        cy.sendMail(config, emails.helloWorld()).then(()=>{
          cy.getEmailByIndex(1)
          cy.destroyConnection()
        })
      })
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
      cy.smtpConfig().then(config=>{
        cy.sendMail(config, emails.helloWorld()).then(()=>{
          cy.getEmailByIndex(1)
          cy.destroyConnection()
        })
      })      
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
      cy.smtpConfig().then(config=>{
        cy.sendMail(config, emails.helloWorld()).then(()=>{
          cy.getEmailByIndex(1)
          cy.destroyConnection()
        })
      })      
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
    cy.smtpConfig().then(config=>{
      cy.sendMail(config, emails.helloWorld()).then(()=>{
        cy.getEmailByIndex(1)
        cy.destroyConnection()
      })
    })      
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
    cy.smtpConfig().then(config=>{
      cy.sendMail(config, emails.helloWorld()).then(()=>{
        cy.getEmailByIndex(1)
        cy.destroyConnection()
      })
    })
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
    cy.smtpConfig().then(config=>{
      cy.sendMail(config, emails.helloWorld()).then(()=>{
        cy.getEmailByIndex(1)
        cy.destroyConnection()
      })
    })      
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
    cy.smtpConfig().then(config=>{
      cy.sendMail(config, emails.helloWorld()).then(()=>{
        cy.getEmailByIndex(1)
        cy.destroyConnection()
      })
    })      
  })

  it('throws an error when setConnectionConfigs is not used', ()=>{
    cy.destroyConnection()
    cy.on("fail", (err)=>{
      expect(err.message).to.contain("Config object empty.")
    })
    cy.smtpConfig().then(config=>{
      cy.sendMail(config, emails.helloWorld()).then(()=>{
        cy.getEmailByIndex(1)
      })
    })      
  })
})