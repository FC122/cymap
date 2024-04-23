const Imap = require("imap")

class ImapProxy{
    static #imap
    static #config

    static setConnectionConfig(config){
        console.log(config)
        if(!this.#config && !config){
            throw new Error("No config")
        }
        this.#config = config
    }

    /**
     * Retrieves the Imap instance.
     * @returns {Imap} The Imap instance.
     */
    static createConnection(){
        if(!this.#imap){
            this.#imap = new Imap(this.#config)
        }
        return this.#imap
    }

    static getConnectionInstance(){
        return this.#imap
    }

    static destroyConnection(){
        this.#imap=undefined
    }
}

module.exports = ImapProxy