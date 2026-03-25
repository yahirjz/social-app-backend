const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRotes = require('./routes/postRoutes');
const followRoute = require('./routes/followRoutes');
const feedRoutes = require('./routes/feedRoutes');
const userRoutes = require('./routes/userRoutes');
// importamos da DB
require('./database')

// importación de modelos 
const User = require('./models/User');
const Post = require('./models/Post');
require('./models/Followers');

//Asociamos los modelos
User.hasMany(Post, { foreignKey:'user_id'});
Post.belongsTo(User, { foreignKey:'user_id'})


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Recibimos la petición 
app.use('/auth', authRoutes); // <-- manejamos la ruta y la mandamos a authRoutes
app.use('/post', postRotes); // <-- manejamos la ruta y la mandamos a postRoutes
app.use('/follower', followRoute)
app.use('/feed', feedRoutes);
app.use('/user', userRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Corriendo en el puerto http://localhost:${port}`);
    });
}

module.exports = app;