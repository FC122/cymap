export default {
    helloWorld: (alias="", id="") => ({
        from: Cypress.env("user"),
        to: `${Cypress.env("localPart")}+${alias}${Cypress.env("domain")}`,
        subject: `Hello World-${id}`,
        text: `Hello World-${id}`,
        html: `<p>Hello World - ${id}</p>`
    })
}