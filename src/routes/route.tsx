import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { DefaultLayout } from '../layout/default-layout'
import { StarList, BuyCoffee } from '../page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route path="/star" element={<StarList />} />
      <Route path="/coffee" element={<BuyCoffee />} />
    </Route>,
  ),
)
