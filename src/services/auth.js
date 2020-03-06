const usuarioLogado = "@InCo-Usuario"
const TOKEN_KEY = "@InCo-Token"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)


export const login = (usuario) => {
  localStorage.setItem(TOKEN_KEY, usuario.token)
  delete usuario.token
  localStorage.setItem(usuarioLogado, JSON.stringify(usuario)) //transforma o obj em json, para salvar no localStorage
};

export const getUsuarioLogado = () => {
  let usuario = JSON.parse(localStorage.getItem(usuarioLogado)) //transforma o json salvo em obj
  return usuario
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(usuarioLogado)
};


export const isAdmin = () => {
  let usuario = getUsuarioLogado()
  if(!usuario) return false
  const admin = usuario.perfis
            .some(p => p.nome === 'admin')
  return admin
}