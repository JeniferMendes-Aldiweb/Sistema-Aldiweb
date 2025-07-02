const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    // 1. Pega o cabeçalho Authorization (o nome correto)
    const authHeader = req.header('Authorization');
    
    // Se não houver cabeçalho Authorization, nega o acesso
    if (!authHeader) {
        return res.status(401).send({ msg: 'Access Denied: No Authorization header' });
    }

    // 2. Verifica se o cabeçalho começa com 'Bearer ' e extrai o token
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).send({ msg: 'Access Denied: Invalid token format (missing Bearer prefix)' });
    }
    const token = tokenParts[1]; // Este é o seu JWT puro

    // Se o token estiver vazio após a extração, nega o acesso
    if(!token) {
        return res.status(401).send({ msg: 'Access Denied: Token missing after Bearer' });
    }

    try {
        // 3. Usa a chave secreta correta (SECRET_KEY_JWT) para verificar o token
        const userVerified = jwt.verify(token, process.env.SECRET_KEY_JWT); 
        req.user = userVerified; // Adiciona os dados do usuário decodificados à requisição
        
        // Se você tiver lógica de verificação de perfil, ela viria aqui, após o token ser verificado
        // Exemplo:
        // if (req.user.perfil !== 'admin') {
        //     return res.status(403).send({ msg: 'Forbidden: Your Not Admin' });
        // }

        next(); // Continua para a próxima função middleware ou rota
    } catch (error) {
        // Captura erros de verificação do JWT (token inválido, expirado, etc.)
        console.error('JWT Verification Error:', error.message);
        // Retorna uma mensagem de erro mais específica para depuração
        if (error.name === 'TokenExpiredError') {
            res.status(401).send({ msg: 'Access Denied: Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).send({ msg: 'Access Denied: Invalid token' });
        } else {
            res.status(401).send({ msg: 'Access Denied: Authentication failed' });
        }
    }
};
