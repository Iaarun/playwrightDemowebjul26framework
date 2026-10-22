function uniqueEmail(baseEmail){
    const[name, domain]= baseEmail.split("@")
    const uniqueid = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    return `${name}_${uniqueid}@${domain}`
}

module.exports={uniqueEmail}