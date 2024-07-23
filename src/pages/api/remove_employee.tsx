import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeamsWithEmploeyes, headerTemplate } from './teams'
import axios from 'axios'

export const removeAllFromDb = async (employeeIds: [string]) => {
  return Promise.all(employeeIds.map(async (employeeId: string) => {
    await axios.delete(`https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees?id=eq.${employeeId}`, headerTemplate)
  }))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body: { data } } = req
  try {
    await removeAllFromDb(data)
    const teamsWithEmployees = await getTeamsWithEmploeyes()
    res.status(200).json(teamsWithEmployees)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}