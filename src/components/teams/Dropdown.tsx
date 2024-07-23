import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WarningIcon from '@mui/icons-material/Warning'
import { ChildTeamWrapperStyled, DropdownContentStyled, DropdownHeaderStyled, DropdownWrapperStyled, EmployeeStyled, WarningTextStyled, WarningWrapperStyled } from './Dropdown.style'
import { Database, TeamsType } from '@/types/supabase'
import { useMediaQuery, useTheme } from "@mui/material";

const formatDate = (date: string | null) => date && new Date(date).toLocaleDateString()

const isTeamEmpty = (team: TeamsType) => team.employees.length === 0 && (team.childTeams ? team.childTeams.length === 0 : true)

const isEmployed = (date: string | null) => {
  if (!date) return true
  const now = new Date()
  const endDate = new Date(date)
  const employed = now.getTime() - endDate.getTime() < 0
  return employed
}

export default function Dropdown({ team, initial = false }: { team: TeamsType, initial?: Boolean }) {
  const [openDropdown, setOpenDropdown] = React.useState<Boolean>(false)
  const teamIsEmpty = React.useMemo<Boolean>(() => isTeamEmpty(team), [team])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <DropdownWrapperStyled >
      <DropdownHeaderStyled $isMobile={isMobile && !teamIsEmpty} $open={openDropdown} onClick={() => isMobile && !teamIsEmpty && setOpenDropdown((prev: Boolean) => !prev)}>
        <span>{team.name}<sup>{formatDate(team.createdAt)}</sup></span>
        {initial && team.parentTeam !== null && (
          <WarningWrapperStyled>
            <WarningIcon color='error' />
            <WarningTextStyled>Parent team ID not found!</WarningTextStyled>
          </WarningWrapperStyled>
        )}
        {!teamIsEmpty && <ExpandMoreIcon onClick={() => !isMobile && setOpenDropdown((prev: Boolean) => !prev)} />}
      </DropdownHeaderStyled>
      <DropdownContentStyled $open={openDropdown}>
        {team.employees.length > 0 && (
          <>
            <h2>Zaměstnanci</h2>
            <ul>
              {team.employees.map((employee: Database['public']['Tables']['employees']['Row']) => (
                <EmployeeStyled key={employee.id} $employed={isEmployed(employee.endDate)}>{`${employee.name} ${employee.surname} - ${employee.position}`}</EmployeeStyled>
              ))}
            </ul>
          </>
      )}
        {team.childTeams && team.childTeams.length > 0 && (
          <>
            <h2>Podtýmy</h2>
            <ChildTeamWrapperStyled>
              {team.childTeams.map((team: TeamsType, index: number) => (
                <Dropdown key={`${team.id}-${index}`} team={team} />
              ))}
            </ChildTeamWrapperStyled>
          </>
      )}
      </DropdownContentStyled>
    </DropdownWrapperStyled>
  )
}
