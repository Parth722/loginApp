const gql = require('graphql-tag');

const typeDefs = gql`
type User{
    id: ID!
    email: String!
    createdAt: String!
    password: String!
    token: String
    username: String!
}

type Query{
    login(email: String!, password: String!): User!
}
type Mutation{
    register(email:String!, username: String!, password: String!, confirmPassword:String!): User!
}

`

module.exports = typeDefs