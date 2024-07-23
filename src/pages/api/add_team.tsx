import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeamsWithEmploeyes, headerTemplate } from './teams'

export const insertToDb = async (type: 'teams' | 'employees', body: { field: string }) => {
  return (await axios.post(`https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/${type}`, body, headerTemplate))?.data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body: { data } } = req
  try {
    await insertToDb('teams', data)
    const teamsWithEmployees = await getTeamsWithEmploeyes()
    res.status(200).json(teamsWithEmployees)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}