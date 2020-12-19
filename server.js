const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
}) 

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false })
.then((res)=> {
    console.log('DB connected');
    return server.listen({port: 3000})
    .then(res => {
        console.log('server running 3000')
    });
});


