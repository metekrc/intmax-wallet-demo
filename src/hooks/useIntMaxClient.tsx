import { useState, useCallback } from 'react'
import { IntMaxClient } from 'intmax2-client-sdk'

export const useIntMaxClient = () => {
  const [client, setClient] = useState<IntMaxClient | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeClient = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const newClient = await IntMaxClient.init({ 
        environment: 'testnet'
      })
      
      setClient(newClient)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize client'
      setError(errorMessage)
      console.error('IntMax Client initialization failed:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async () => {
    if (!client) {
      setError('Client not initialized')
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      await client.login()
      setIsLoggedIn(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }, [client])

  const logout = useCallback(async () => {
    if (!client) return
    
    try {
      setLoading(true)
      await client.logout()
      setIsLoggedIn(false)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed'
      setError(errorMessage)
      console.error('Logout failed:', err)
    } finally {
      setLoading(false)
    }
  }, [client])

  return {
    client,
    isLoggedIn,
    loading,
    error,
    initializeClient,
    login,
    logout,
  }
}
