import { MainLayout } from '@/components/MainLayout'
import React from 'react'
import { Home } from './container/Home'
import { Articles } from './container/Articles'

export const Homepage = () => {

  return <MainLayout>
    <Home/>
    <Articles/>
  </MainLayout>
}
