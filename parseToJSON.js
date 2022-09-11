// const parseToJSON = (req , res) =>{
//     try {
//         console.log('sizeeeeee' , JSON.parse(req.body.size));
//         let sentJson = []
//         for(let size of JSON.parse(req.body.size)){
//             sentJson.push(JSON.parse(size))
//             console.log(sentJson);
//         }
        
//         return sentJson
//     } catch (error) {
//         res.status(500).json({
//             Error : "Please check Size"
//         })
//     }

// }
// module.exports = parseToJSON