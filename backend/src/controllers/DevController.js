const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');
module.exports={
    async show(req,res){
        const id = req.params.id;
        const dev = await Dev.findById(id);
        if(!dev){
            res.json({Message: 'nenhum dev encontrado'});
        }

        return res.json(dev);
    },

    async index(req, res){
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res){
        const {github_username, techs, latitude, longitude} = req.body;
        let dev = await Dev.findOne({github_username});
        if(!dev){

            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio} = response.data;
            const techsArray = parseStringAsArray(techs);
        
            const location ={
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });

            //filtrar conexões por techs e 10km de distancia
            const sendSocketMessageTo = findConnections({latitude, longitude}, techsArray);
            sendMessage(sendSocketMessageTo, 'newDev', dev)
        }
        return res.json(dev);
    },

    //TODO rotear o update e o destroy.

    async update(req, res){
        const id = req.params.id;
        const {name, bio, techs, latitude, longitude} = req.body;
        const location ={
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        const techsArray = parseStringAsArray(techs);
        let devUpdate = await Dev.findById(id);
        if(!devUpdate){
            res.json({message: "Não foi encontrado usuário com o id requisitado"});
        }
        devUpdate = await Dev.findByIdAndUpdate(id, {
            name,
            bio,
            techs:techsArray,
            location
        }, {new:true});
        
        return res.json(devUpdate);
    },

    async destroy(req, res){
        const id = req.params.id
        
        let devDel = await Dev.findById(id);
        if(!devDel){
            res.json({message: "Esse usuário não existe ou já foi deletado!"});
        }
        devDel = await Dev.findByIdAndDelete(id);
        return res.json(devDel);
    }
}