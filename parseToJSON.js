const parseToJSON = (req , res) =>{
    try {
        let sentJson = []
        for(let size of req.body.size){
            sentJson.push(JSON.parse(size))
        }
        return sentJson
    } catch (error) {
        res.status(500).json({
            Error : "Pleasse check Size"
        })
    }

}
module.exports = parseToJSON