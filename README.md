# cymap ![cypress version](https://img.shields.io/badge/cypress-13.8.0-brightgreen) [![test](https://github.com/FC122/cymap/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/FC122/cymap/actions/workflows/test.yml)

Cypress plugin for accessing mail from email servers.

The purpose of this plugin is to use existing email servers instead of deploying your. Cymap leverages the capabilities of IMAP protocol.

By using cymap:
- you are not dependant on an email server nor its REST API
- you have no need to deploy your own email server, you can use gmail or any other similar service
- if you have your own email server it will work with it to since IMAP is standardized
- you can access mail from multiple clients

## Install

```bash
npm i cymap
```

Import cymap tasks in cypress.config.js. and put cymapTasks object in on task.
```js
const { defineConfig } = require("cypress");
const cymapTasks = require("cymap/src/cymapTasks")
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task",{
        ...cymapTasks
      })
      // implement node event listeners here
    },
  },
});

```

Import cymap index in e2e.js
```JS
// Import commands.js using ES2015 syntax:
import './commands'
import "cymap/src/index"
```
### Gmail <IMAP> setup
Gmail IMAP can be used only with the app password. There are a few steps you need to do to generate the app password. It is required by google for security reasons.
#### Steps
1. Go to your inbox
2. In the upper right corner click the settings icon
3. Then click "See all settings"
4. Click on "Forwarding and POP/IMAP"
5. Scroll down and click "Enable IMAP"
6. Go to https://myaccount.google.com/u/2/security 
7. Click on 2-step verification and turn it on
    - Chose any of the given methods and implement it 
8. At the bottom og the 2-step verification screen "App passwords" article should be shown.
9. Go to App passwords screen and create a new password
10. Remember that password
    That password along with your email will be used to access emails programmatically

## Use
### Functions
#### Set configuration data
```js
cy.setConnectionConfig( {
  password:"socadscjfa",
  user:"some.gmail@gmail.com",
  host:'imap.gmail.com',
  port:993,
  tls:true,
  tlsOptions: { rejectUnauthorized: false }
})
```
Ideally called in before each.

#### Fetch all mail
```js
cy.getAllMail()
```
Fetches all mail from the INBOX


#### Delete all mail
```js
cy.deleteAllMail()
```
Deletes all mail from the INBOX. For gmail the mail is moved to Waste box


#### Get email by index
```js
cy.getEmailByIndex(1)
```
Fetches email by index top down. Top email in the INBOX is under index 1.

#### Get email by subject
```js
cy.getEmailBySubject("Hello World")
```
Fetches email by subject.

#### Delete email by index
```js
cy.deleteEmailByIndex(1)
```
Deletes email by index top down. Top email in the INBOX is under index 1.


```js
cy.pasteHtml(html)
```
Pastes HTML to the DOM

### Email
Email body example:
```json
{
    "attachments": [],
    "headers": {},
    "headerLines": [...],
    "html": "<p>Hello World </p>",
    "text": "Hello World",
    "textAsHtml": "<p>Hello World</p>",
    "subject": "Hello World",
    "date": "2024-04-30T16:15:16.000Z",
    "to": {
        "value": [
            {
                "address": "some.gmail@gmail.com",
                "name": ""
            }
        ],
        "html": "<span class=\"mp_address_group\"><a href=\"mailto:some.gmail@gmail.com\" class=\"mp_address_email\">some.gmail@gmail.com.com</a></span>",
        "text": "some.gmail@gmail.com"
    },
    "from": {
        "value": [
            {
                "address": "some.gmail@gmail.com",
                "name": ""
            }
        ],
        "html": "<span class=\"mp_address_group\"><a href=\"mailto:some.gmail@gmail.com\" class=\"mp_address_email\">some.gmail@gmail.com</a></span>",
        "text": "some.gmail@gmail.com"
    },
    "messageId": "<sdf@gmail.com>"
}
```
### Examples
#### Fetch all mail
```js
describe('tests getAllMail function', () => {
  before("Set configs and add mail", ()=>{
    cy.setConnectionConfig(config)
  })

  it('returns parsed body', ()=>{
    cy.getAllMail().then(mail=>{
      expect(mail.length).to.eq(4)
      mail.forEach(email=>{
        expect(email[0].subject).to.contain("Hello World")
      })
    })
  })
})
```

#### Fetch email and paste it to dom
```js
 before("Set configs and add mail", ()=>{
    cy.setConnectionConfig(config)
  })

  it('returns parsed body', ()=>{
    cy.getEmailByIndex(1).then(email=>{
        cy.pasteHtml(email.html)
        cy.contains("Hello World").should("be.visible")
    })
  })
```

#### Delete all mail
```js
before("Set configs and add mail", ()=>{
    cy.setConnectionConfig(config)
})

it('returns parsed body', ()=>{
    cy.deleteAllMail().then(isDeleted=>{
       cy.expect(isDeleted).to.eq(true)
    })
})
```

#### Delete email by index
```js
before("Set configs and add mail", ()=>{
    cy.setConnectionConfig(config)
})

it('returns parsed body', ()=>{
    cy.deleteEmailByIndex(1).then(isDeleted=>{
       cy.expect(isDeleted).to.eq(true)
    })
})
```

## Contributors
Filip Cica

Sean Auditor

## TODO
Add getEmailBySubject()

Add methods for parsing various attachments

Add waitForEmail()
