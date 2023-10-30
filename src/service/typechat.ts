import axios from 'axios'
import { type Praise } from '../types'

const getStateList = async (): Promise<Praise[]> => {
  const a = await axios.get('/api/get_star')
  return a.data
}
const addStar = async (text: string) => {
  const a = await axios.post('/api/add_star', { text })
  return a.data
}
export { getStateList, addStar }
