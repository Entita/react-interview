import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import { Layout } from "@/components/layout/Layout";
import { TeamsType } from "@/types/supabase";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [teams, setTeams] = React.useState<TeamsType[]>([])

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <CssBaseline />
        <Component
          {...pageProps}
          teams={teams}
          setTeams={setTeams}
        />
      </Layout>
    </ThemeProvider>
  );
}
