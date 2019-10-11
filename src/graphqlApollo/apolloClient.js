import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  // uri: "https://image-repo-api.herokuapp.com"
  uri: "http://localhost:4000/"
});

export default client;
