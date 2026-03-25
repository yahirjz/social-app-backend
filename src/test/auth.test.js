const request = require('supertest');
const app = require('../index');
const sequelize = require('../database');
const User = require('../models/User');

describe('Auth', () => {
    const timestamp = Date.now();
    const testUser = {
        username: `testuser_${timestamp}`,
        email: `test_${timestamp}@test.com`,
        password: '123456'
    }

    // guardamo el token
    let authToken;

    afterAll(async () => {
        await sequelize.close();
    });
    // - TEST DE REGISTRO AL USUSARIO -
    test('registro exitoso', async () => {
        
        const response = await request(app)
            .post('/auth/register')
            .send(testUser);

        //verificamos el servidor 
        expect(response.status).toBe(201);
    }, 10000);
    //-- TEST DE INICIO DE SESIÓN--
    test('login exitoso', async () => {
        
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });
        expect(response.status).toBe(200);

        // Guardamos nuestro 'token'
        expect(response.body).toHaveProperty('token'); //Explicar
        authToken =response.body.token;
    });
    
    //-- TEST DE CREAR POST --
    test('Creación de post exitoso', async () => {

        const response = await request(app)
            .post('/post')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ content: " Mi primer post! "});
        
        expect(response.status).toBe(201);
    });

    // -- TEST DE FEED --
    test('Prueba del feed', async () =>{
        const response = await request(app)
            .get('/feed')
            .set('Authorization', `Bearer ${authToken}`)

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy(); //Expliacar
    });

    // -- TEST DE PERFIL --
    test('Pueba del Perfil', async () => {
        
        const response = await request(app)
            .put('/user/profile')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ bio: "Esta es mi nueva biografia"})
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    //-- TEST SEGUIR USUARIO --    
    test('Seguir usuario', async () => {
        
        // Creamos un email falso
        const emailMisterioso = `test2_${Date.now()}@test.com`;
        //  Registramos en el servidor
        await request(app)
            .post('/auth/register')
            .send({
                username: `testuser2_${Date.now()}`,
                email: emailMisterioso,
                password: 'password_super_secreta'
            });
        // Obtenemos el ID
        const usuarioAseguir = await User.findOne({ where: { email: emailMisterioso } });
        
        //Respondemos
        const response = await request(app)
            .post(`/follower/${usuarioAseguir.id}/follow`) // Metemos su ID directo en la ruta
            .set('Authorization', `Bearer ${authToken}`);
            
        // Verificamos 
        expect(response.status).toBe(201); 
        expect(response.body).toHaveProperty('message');
    });
});

module.exports = app;