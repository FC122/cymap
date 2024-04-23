/// <reference types="cypress" />

describe('tests getAllMail function', () => {
  const setConfig = ()=>cy.setConnectionConfig({
    password: "nvcmgyebnclsrzhw",
    user: "testmailcica@gmail.com",
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  })

  it('can fetch all mail', () => {
    setConfig()
    cy.getAllMail().then(stream=>{
      cy.log(stream[0])
      cy.document().invoke('write', stream[0].html);
    })
  })

  it('returns parsed body')

  it('can get mail from other boxes')

  it('returns error on wrong password')

  it('returns error on wrong mail')

  it('returns error on wrong host')

  it('returns error on no tls')

  it('cant return error without using setConnectionConfigs')

  it('cant return mail after connection is destoryed')

  it('can return mail after configs were updated')
})