//utils
Cypress.Commands.add("pasteHtml", ()=>{})
Cypress.Commands.add("findHref", ()=>{})
Cypress.Commands.add("parsePdf", ()=>{})//?
Cypress.Commands.add("parseWord", ()=>{})//?
Cypress.Commands.add("parseImage", ()=>{})//?

//1
Cypress.Commands.add("setConnectionConfig", (config)=>{
    cy.task("setConnectionConfig", config)
})
//2
Cypress.Commands.add("createConnection", ()=>{
    cy.task("createConnection")
})
//3
Cypress.Commands.add("destroyConnection", (config)=>{
    cy.task("setConnectionConfig", )
})
//4
Cypress.Commands.add("getAllMail", (boxName="INBOX")=>{
    return cy.task("getAllMail")
})
