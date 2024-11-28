export default {
  oneMoreTest: () => ({
    from: Cypress.env("user"),
    to: `${Cypress.env("localPart")}+moreTest${Cypress.env("domain")}`,
    subject: `One more test!!!`,
    text: `One more test for you!`,
    html: `<p>One more test for you!</p>`
  })
}
