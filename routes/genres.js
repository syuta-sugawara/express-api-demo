const express = require("express")
const router = express.Router();

const genres=[
    {id:1,name:"Action"},
    {id:2,name:"horror"},
]

router.get("/:id",(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("The genre with the given ID was not found")
    res.send(genre)
    })

router.post("/", (req,res) => {
    const schema ={
        name:Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema);

    if (result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const genre ={
        id:genres.length+1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})

router.delete("/:id",(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("THe genres with the given ID was not found")

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    
    res.send(genres)
})

module.exports = router;