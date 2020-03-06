import { getToken } from "./auth"
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

//endereco api
const httpLink = createHttpLink({
  uri: 'http://192.168.0.62:4000/'
})
//ApolloLink
const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}`: ''
      }
    }
})

const api = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// api.interceptors.request.use(async config => {
//   const token = getToken()
//   if (token) {
//     config.headers.Authorization = token
//   }
//   return config
// })

export default api;