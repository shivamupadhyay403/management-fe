// app/providers.tsx

'use client'
import { Provider } from 'react-redux'
import { store } from '.'
import QueryProvider from '../providers/QueryProvider'
import AppInitializer from './AppInitializer'
export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <AppInitializer/>
        {children}
      </QueryProvider>
    </Provider>
  )
}