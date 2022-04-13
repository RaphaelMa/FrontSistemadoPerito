import { useState, useEffect, useCallback } from 'react'
import { useUserSelector } from '../Redux/UserReducer'

const useSaveStorage = <T extends object>(key: string, initial_values: T) => {
  const company = useUserSelector(state => state.company)

  const buildKey = useCallback(() => `${company?.email}:${key}`, [company, key])

  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initial_values
    } catch (error) {
      console.log(error)
      return initial_values
    }
  })

  useEffect(() => {
    window.localStorage.setItem(buildKey(), JSON.stringify(state))
  }, [buildKey, key, state])

  return [state, setState]
}

export default useSaveStorage
