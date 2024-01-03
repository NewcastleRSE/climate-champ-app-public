import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import * as SecureStore from 'expo-secure-store'

// Export statements
export const AuthContext = createContext()
export const useAuth = () => {
  return useContext(AuthContext)
}

// Initial login state
const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
}

// Handles auth functionality
const loginReducer = (prevState, action) => {
  switch (action.type) {
    // When user opens the app for the first time, check if they have an account
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      }
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      }
    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      }
    case 'REGISTER':
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      }
  }
}

// Auth Provider
export function AuthProvider({ children }) {
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)
  const [userToken, setUserToken] = useState(null)
  // Sign out function
  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken')
      await SecureStore.deleteItemAsync('userId')
      setUserToken(null)
    } catch (e) {
      console.log(e)
    }
    dispatch({ type: 'LOGOUT' })
  }

  // Check for the token
  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync('userToken')
      if (token) {
        setUserToken(token)
        dispatch({ type: 'RETRIEVE_TOKEN', token })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    }

    checkToken()
  }, [])

  // useEffect(() => {
  //   console.log(userToken)
  // }, [userToken])

  // Sets the users token.
  const setTokenInStorage = async (token) => {
    await SecureStore.setItemAsync('userToken', token)
    setUserToken(token)
  }

  // Sets the users token.
  const setUserIdInStorage = async (id) => {
    await SecureStore.setItemAsync('userId', JSON.stringify(id))
  }

  const getUserToken = async () => {
    await SecureStore.getItemAsync('userToken', (err, value) => {
      if (!err) {
        return value
      } else {
        return null
      }
    })
  }

  // Values
  const value = {
    signOut,
    loginState,
    loginReducer,
    dispatch,
    setTokenInStorage,
    userToken,
    getUserToken,
    setUserIdInStorage,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
