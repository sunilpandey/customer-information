import './App.css'
import { DashboardCanvas } from './components/DashboardCanvas'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CustomerContextProvider from './context/CustomerContext'
import { UserContextProvider } from './context/UserContext'
import './i18n';
function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <UserContextProvider>
          <CustomerContextProvider>
            <DashboardCanvas />
          </CustomerContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
