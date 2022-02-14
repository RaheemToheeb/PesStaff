const fs = require("fs")
const writeFile=(filePath,data)=>{
    fs.writeFileSync(filePath,data, "utf-8" ,(error)=>{
        if(error){
            console.log("Could not find file")
        }
        
    })
}

module.exports={writeFile}