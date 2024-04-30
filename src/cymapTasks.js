const ImapProxy = require("../src/ImapProxy")
const {getAllMail, deleteAllMail, getEmailByIndex, deleteEmailByIndex} = require("./commands")

module.exports={
    //1
    setConnectionConfig(config){
      ImapProxy.setConnectionConfig(config)
      return null
    },
    //2
    createConnection(){
      ImapProxy.createConnection()
      return null
    },
    //3
    destroyConnection(){
      ImapProxy.destroyConnection()
      return null
    },
    //4
    async getAllMail(){
      const mail = await getAllMail()
      return mail
    },
    //5 
    async deleteAllMail(){
      const areDeleted = await deleteAllMail()
      return areDeleted
    },
    //6
    async getEmailByIndex(index){
      const email = await getEmailByIndex(index)
      return email
    },
    //7
    async deleteEmailByIndex(index){
      const isDeleted = await deleteEmailByIndex(index)
      return isDeleted
    }
}