const Imap = require("imap")

class ImapProxy{
    static #imap
    static #config

    static setConnectionConfig(config){
        if(!config){
            throw new Error("Config object empty.")
        }
        this.#config = config
        console.log("Config set")
    }

    static createConnection(){
        if(!this.#config){
            throw new Error("Connection configuration not set.")
        }
        try{
            this.#imap = new Imap(this.#config)
        }catch(err){
            console.log(err)
        }
        console.log("Connection created")
    }

    /**
     * Retrieves the Imap instance.
     * @returns {Imap} The Imap instance.
     */
    static getConnectionInstance(){
        if(!this.#imap){
            throw new Error("Connection not created.")
        }
        return this.#imap
    }

    static destroyConnection(){
        this.#imap.destroy()
        this.#imap=undefined
        this.#config=undefined
        console.log("Connection destroyed")
    }
}

module.exports = ImapProxy