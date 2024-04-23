const {getAllMail} = require("./commands")
const ImapProxy = require("./ImapProxy")
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
  async getAllMail(boxName){
    const stream = await getAllMail(boxName)
    return stream
  }     
}