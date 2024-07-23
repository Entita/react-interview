import React from 'react'
import { TableContainerStyled } from './TeamTable.style'
import Dropdown from './Dropdown'
import { TeamsType } from '@/types/supabase'

export default function TeamTable({ teams }: { teams: TeamsType[] }) {
  return (
    <TableContainerStyled>
      {teams.map((team: TeamsType) => (
        <Dropdown key={team.id} team={team} initial={true} />
      ))}
    </TableContainerStyled>
  )
}
