import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  // uri: "https://image-repo-api.herokuapp.com"
  uri: "https://image-repo-api.herokuapp.com/"
});

export default client;
