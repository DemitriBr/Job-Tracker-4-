import { useState, useEffect, useSyncExternalStore } from 'react'

type StateCreator<T> = (set: (partial: T | ((state: T) => T)) => void) => T
type UseStore<T> = {
  (): T
  getState: () => T
  setState: (partial: T | ((state: T) => T)) => void
  subscribe: (listener: () => void) => () => void
}

export function create<T>(createState: StateCreator<T>): UseStore<T> {
  let state: T
  const listeners = new Set<() => void>()

  const setState = (partial: T | ((state: T) => T)) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial
    state = { ...state, ...nextState }
    listeners.forEach(listener => listener())
  }

  state = createState(setState)

  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const useStore = () => {
    return useSyncExternalStore(
      subscribe,
      () => state,
      () => state
    )
  }

  useStore.getState = () => state
  useStore.setState = setState
  useStore.subscribe = subscribe

  return useStore
}

export function persist<T>(
  config: StateCreator<T>,
  options: { name: string }
): StateCreator<T> {
  return (set) => {
    const storageKey = options.name
    
    // Load from localStorage
    const storedData = localStorage.getItem(storageKey)
    const initialState = storedData ? JSON.parse(storedData).state : {}
    
    // Create the state with persisted data
    const state = config((partial) => {
      set(partial)
      // Save to localStorage whenever state changes
      const newState = typeof partial === 'function' ? partial(state) : { ...state, ...partial }
      localStorage.setItem(storageKey, JSON.stringify({ state: newState }))
    })
    
    return { ...state, ...initialState }
  }
}