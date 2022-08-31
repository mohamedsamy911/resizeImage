const parseToJSON = (req , res) =>{
    try {
        let sentJson = []
        for(let size of req.body.size){
            sentJson.push(JSON.parse(size))
        }
        return sentJson
    } catch (error) {
        res.json({
            Error : error
        })
    }

}
module.exports = parseToJSON