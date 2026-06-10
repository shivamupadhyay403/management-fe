// app/providers.tsx

'use client'
import { Provider } from 'react-redux'
import { store } from '.'
import QueryProvider from '../providers/QueryProvider'
export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </Provider>
  )
}