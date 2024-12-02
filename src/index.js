//utils
Cypress.Commands.add("pasteHtml", (html) => {
  cy.document().invoke('write', html);
})
//1
Cypress.Commands.add("setConnectionConfig", (config) => {
  cy.task("setConnectionConfig", config)
})
//2
Cypress.Commands.add("createConnection", () => {
  cy.task("createConnection")
})
//3
Cypress.Commands.add("destroyConnection", (config) => {
  cy.task("setConnectionConfig")
})
//4
Cypress.Commands.add("getAllMail", () => {
  return cy.task("getAllMail")
})
//5
Cypress.Commands.add("deleteAllMail", () => {
  return cy.task("deleteAllMail")
})
//6
Cypress.Commands.add("getEmailByIndex", (index = 1) => {
  return cy.task("getEmailByIndex", index)
})
//7
Cypress.Commands.add("deleteEmailByIndex", (index = 1) => {
  return cy.task("deleteEmailByIndex", index)
})

//8
Cypress.Commands.add("getEmailBySubject", (subject) => {
  return cy.task("getEmailBySubject", subject)
})
