# cymap
Enables basic IMAP functionalities in Cypress like fetching and deleting the mail. The point of this plugin is to make testing email content automaticaly in cypress easy.

## Install

```bash
npm i -D cymap
```

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
Needs to be called in before each.

#### Create connection
```js
cy.createConnection()
```
Implicitly called inside the email functions.


#### Destroy connection
```js
cy.destroyConnection()
```
Implicitly called inside the email functions.


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

#### Fetch a mail and paste it to dom
```js
 before("Set configs and add mail", ()=>{
    cy.setConnectionConfig(config)
  })

  it('returns parsed body', ()=>{
    cy.getEmailByIndex().then(email=>{
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

## TODO
waitForEmail()
