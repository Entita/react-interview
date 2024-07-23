import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FormError } from '../forms/FormError'
import { FormSuccess } from '../forms/FormSuccess'
import axios from 'axios'
import { Database, TeamsType } from '@/types/supabase'

const schema = yup.object().shape({
  employees: yup.array(),
});

export default function EmployeeRemove({ teams = [], setTeams }: { teams?: TeamsType[], setTeams: Function }) {
  const [formError, setFormError] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const { control, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit((formData) => {
    axios.post('/api/remove_employee', { data: formData.employees })
      .then(({ data }) => {
        setTeams(data)
        setSuccess(true)
      })
      .catch(() => setSuccess(false))
      .finally(() => reset())
  });

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Typography variant="h4" mb={3}>
          Remove employee
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Employees</InputLabel>
          <Controller
            name="employees"
            defaultValue={[]}
            control={control}
            render={({ field }) => (
              <Select {...field} multiple label="Employees">
                {teams.map((team: TeamsType) => (
                  team.employees.map((employee: Database['public']['Tables']['employees']['Row']) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {`${team.name} - ${employee.name} ${employee.surname}`}
                    </MenuItem>
                  ))
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ my: 3 }}>
          Remove employee
        </Button>
        {formError && <FormError text="Please fill out the form correctly" />}
        {success && <FormSuccess text="Employee Removed" />}
      </form>
    </Box>
  )
}
