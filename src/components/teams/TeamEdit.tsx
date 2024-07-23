import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { EmployeeAdd } from '../employees/EmployeeAdd'
import { TeamAdd } from '../teams/TeamAdd'
import { EditWrapperStyled, TeamButtonStyled, TeamEditWrapperStyled } from './TeamEdit.style'
import EmployeeRemove from '../employees/EmployeeRemove'
import { TeamsType } from '@/types/supabase';

export default function TeamEdit({ teams, setTeams }: { teams: TeamsType[], setTeams: Function }) {
  const [option, setOption] = React.useState<'team' | 'employee' | 'firing' | null>(null)

  return (
    <TeamEditWrapperStyled>
      {!option ? (
        <>
          <TeamButtonStyled onClick={() => setOption('team')}>Přidat tým</TeamButtonStyled>
          <TeamButtonStyled onClick={() => setOption('employee')}>Přidat zaměstnance</TeamButtonStyled>
          <TeamButtonStyled onClick={() => setOption('firing')}>Odebrat zaměstnance</TeamButtonStyled>
        </>
      ) : (
        <EditWrapperStyled>
          <KeyboardBackspaceIcon onClick={() => setOption(null)} />
          {option === 'team' && <TeamAdd teams={teams} setTeams={setTeams} />}
          {option === 'employee' && <EmployeeAdd teams={teams} setTeams={setTeams} />}
          {option === 'firing' && <EmployeeRemove teams={teams} setTeams={setTeams} />}
        </EditWrapperStyled>
      )}
    </TeamEditWrapperStyled>
  )
}
