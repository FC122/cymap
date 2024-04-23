declare namespace Cypress {
    interface Chainable {
      //1
      /**
      * Sets configs for imap connection.
      * @example
      * setConnectionConfig({
          user: 'mygmailname@gmail.com',
          password: 'mygmailpassword',
          host: 'imap.gmail.com',
          port: 993,
          tls: true
        })
      */
     setConnectionConfig(config:any):Chainable<null>
     //2
     /**
      * Fetches all email from the mailbox
      * @param boxName name of the mailbox, by default set to INBOX
      * @example
      * cy.getAllMail().then(streamArray=>{
      * })
      */
     getAllMail(boxName:String="INBOX"):Chainable<Array<ReadableStream>>
  
  }
}