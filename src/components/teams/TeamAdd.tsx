import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormFieldError } from "../forms/FormFieldError";
import { FormSuccess } from "../forms/FormSuccess";
import { FormError } from "../forms/FormError";
import axios from "axios";
import { TeamsType } from "@/types/supabase";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  parentTeam: yup.string().nullable(),
});

export const TeamAdd = ({ teams = [], setTeams }: { teams?: TeamsType[], setTeams: Function }) => {
  const [formError, setFormError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((formData) => {
    if (formData.parentTeam === '') formData.parentTeam = null
    axios.post('/api/add_team', { data: formData })
      .then(({ data }) => {
        setTeams(data)
        setSuccess(true)
      })
      .catch(() => setSuccess(false))
      .finally(() => reset())
  });

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Add Team
      </Typography>
      <form onSubmit={onSubmit}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField fullWidth {...field} label="Name" />
          )}
        />

        {errors.name && <FormFieldError text={errors.name.message} />}

        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Parent team</InputLabel>
          <Controller
            name="parentTeam"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select {...field} label="Parent team">
                {teams.map((team: TeamsType) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {errors.parentTeam && (
          <FormFieldError text={errors.parentTeam.message} />
        )}

        <Button type="submit" variant="contained" sx={{ my: 3 }}>
          Add Team
        </Button>
        {formError && <FormError text="Please fill out the form correctly" />}
        {success && <FormSuccess text="Team Added" />}
      </form>
    </Box>
  );
};
