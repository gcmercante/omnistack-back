/*
index -> retorna listagem de sessões (NO CASO)
show  -> retorna uma unica sessão (NO CASO)
store -> Criar uma sessão
update -> Atualizar sessão
destroy -> deletar sessão
*/
const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        } 
        

        return res.json(user);
    }
}