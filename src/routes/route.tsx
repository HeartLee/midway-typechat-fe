import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { DefaultLayout } from '../layout/default-layout'
import { StarList } from '../page/typechat-demo'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route path="/typechat" element={<StarList />} />
    </Route>,
  ),
)
