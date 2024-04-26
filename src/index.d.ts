declare namespace Cypress {
    interface Chainable {
      pasteHtml(html:any):Chainable<null>
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
      * Makes connection based on set configs
      */
     createConnection():Chainable<null>
     //3
     /**
      * Destroys connection, after using this it is required to 
      * call setConnectionConifg if you want to use mail functions
      */
     destroyConnection():Chainable<null>
     //4
     /**
      * Fetches all email from the mailbox
      * @example
      * cy.getAllMail().then(mails=>{
      * })
      * @returns {Mail}
      */
     getAllMail():Chainable<Array<Object>>
      //5
     /**
      Deletes all email from the mailbox
      * @example
      * cy.deleteAllMail().then(areDeleted=>{
      *   expect(areDeleted).to.eq(true)
      * })
      * @returns {bool}
      */
     deleteAllMail():Chainable<bool>
     //6
     /**
      * Fetchs email based on index top down
      * @param index by default 1 the function will fetch mail on top
      * @returns {Object}
      */
     getEmailByIndex(index:Number):Chainable<Object>
     //7
     /**
      * Deletes email based on index top down
      * @param index by default 1 the function will fetch mail on top
      * @returns {Object}
      */
     deleteEmailByIndex(index:Number=1):Chainable<Object>
  }
}