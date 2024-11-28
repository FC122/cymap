/// <reference types="cypress" />
import emails from "../support/emails"

describe('tests getEmailBySubject function', () => {
  before("Set configs and add mail", () => {
    cy.imapConfig().then(config => {
      cy.setConnectionConfig(config)
    })
  })

  it("fetches email by subject", () => {
    cy.smtpConfig().then(config => {
      cy.deleteAllMail()
      for (let i = 1; i <= 4; i++) {
        cy.sendMail(config, emails.helloWorld(i, i))
        cy.wait(2000)
      }
    }).then(() => {
      cy.getEmailBySubject(`Hello World-${2}`).then(email => {
        console.log("email", email)
        expect(email.to.text).to.contain(2)
        expect(email).to.have.property('attachments').that.is.an('array');
        expect(email).to.have.property('headers').that.is.an('object');
        expect(email).to.have.property('headerLines').that.is.an('array').with.lengthOf.at.least(1);
        expect(email).to.have.property('html').that.is.a('string').and.equals(emails.helloWorld(2, 2).html);
        expect(email).to.have.property('text').that.is.a('string').and.equals(emails.helloWorld(2, 2).text);
        expect(email).to.have.property('textAsHtml').that.is.a('string')
        expect(email).to.have.property('subject').that.is.a('string').and.equals(emails.helloWorld(2, 2).subject);
        expect(email).to.have.property('date').that.is.a('string')
        expect(email).to.have.property('to').that.is.an('object').and.has.property('value').that.is.an('array').with.lengthOf(1);
        expect(email.to.value[0]).to.have.property('address').that.is.a('string').and.equals(emails.helloWorld(2).to);
        expect(email.to.value[0]).to.have.property('name').that.is.a('string').and.equals("");
        expect(email).to.have.property('from').that.is.an('object').and.has.property('value').that.is.an('array').with.lengthOf(1);
        expect(email.from.value[0]).to.have.property('address').that.is.a('string').and.equals(emails.helloWorld(2).from);
        expect(email.from.value[0]).to.have.property('name').that.is.a('string').and.equals("");
        expect(email).to.have.property('messageId').that.is.a('string')
      })
    })
  })

  it("throws an error if email is not found", () => {
    cy.on("fail", (err) => {
      expect(err.message).to.contain("No email matching the subject")
    })
    cy.getEmailBySubject("Hello World-0")
  })

  it("throws an error if no subject is provided", () => {
    cy.on("fail", (err) => {
      expect(err.message).to.contain("Subject required but not provided")
    })
    cy.getEmailBySubject()
  })
})
