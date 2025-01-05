
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout'
import { ThemeProvider } from './context/Theme-provider'
import WeatherDashboard from './pages/WeatherDashboard'
import CityPage from './pages/CityPage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<WeatherDashboard/>} />
            <Route path="/city:cityName" element={<CityPage/>} />
          </Routes>
        </Layout>
      </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
