const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    // 1. Pega o cabeçalho Authorization
    const authHeader = req.header('Authorization');
    
    // Se não houver cabeçalho Authorization, nega o acesso
    if (!authHeader) return res.status(401).send('Access Denied: No Authorization header');

    // 2. Verifica se o cabeçalho começa com 'Bearer ' e extrai o token
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).send('Access Denied: Invalid token format');
    }
    const token = tokenParts[1]; // Este é o seu JWT

    // Se o token não existir após a extração, nega o acesso
    if(!token) return res.status(401).send('Access Denied: Token missing');

    // A parte de verificação de perfil 'req.user.perfil' deve vir DEPOIS da verificação do JWT
    // pois 'req.user' só existirá após o jwt.verify
    // Vou comentar por enquanto, mas você pode recolocar depois da linha 'req.user = userVerified;'
    // err = {
    //     msg:'Your Not Admin: Access Denied!!'
    // }
    // if (req.user.perfil !== 'admin') return res.status(401).send(err);
    
    try {
        // 3. Usa a chave secreta correta para verificar o token
        const userVerified = jwt.verify(token, process.env.SECRET_KEY_JWT); 
        req.user = userVerified; // Adiciona os dados do usuário decodificados à requisição
        
        // Agora você pode verificar o perfil, se necessário
        if (req.user.perfil !== 'admin') {
            return res.status(403).send({ msg: 'Forbidden: Your Not Admin' }); // Use 403 Forbidden para permissão
        }

        next(); // Continua para a próxima função middleware ou rota
    } catch (error) {
        // Captura erros de verificação do JWT (token inválido, expirado, etc.)
        console.error('JWT Verification Error:', error.message);
        res.status(401).send({ msg: 'Access Denied: Invalid or expired token' });
    }
};
