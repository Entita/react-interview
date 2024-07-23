import type { NextApiRequest, NextApiResponse } from 'next'
import { getTeamsWithEmploeyes } from './teams'
import { insertToDb } from './add_team'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body: { data } } = req
  try {
    await insertToDb('employees', data)
    const teamsWithEmployees = await getTeamsWithEmploeyes()
    res.status(200).json(teamsWithEmployees)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}