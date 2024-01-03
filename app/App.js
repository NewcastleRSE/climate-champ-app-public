import { UserProvider } from './util/context/UserContext'
import { Main } from './components/Main'
import { AuthProvider } from './util/context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Main />
      </UserProvider>
    </AuthProvider>
  )
}
