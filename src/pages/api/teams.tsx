import { Database } from '@/types/supabase'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const SUPABASE_KEY = process.env.SUPABASE_KEY
export const headerTemplate = {
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
  }
}

const formatTeamsWithEmploeyes = (teams: [Database['public']['Tables']['teams']['Row']], employees: [Database['public']['Tables']['employees']['Row']]) =>
  teams.map((team: Database['public']['Tables']['teams']['Row']) => ({
    ...team,
    employees: team.employees.map((teamEmployee: Database['public']['Tables']['teams']['Row']) => ({
      ...teamEmployee,
      ...employees.find((employee: Database['public']['Tables']['employees']['Row']) => (employee.id === teamEmployee.id))
    }))
  }))

export const getTeamsWithEmploeyes = async (body = {}) => {
  const axiosConfig = { ...headerTemplate, body }
  const teams = (await axios.get('https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*,employees(id)', axiosConfig))?.data
  const employees = (await axios.get('https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees?select=*', axiosConfig))?.data
  return formatTeamsWithEmploeyes(teams, employees)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const teamsWithEmployees = await getTeamsWithEmploeyes()
    res.status(200).json(teamsWithEmployees)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}