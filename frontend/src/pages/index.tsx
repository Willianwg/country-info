import { Paper, TextField } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useState } from "react";

export default function Home({
  countries,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filtered, setFiltered] = useState(countries);
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          background: "#f7f7f7",
          paddingBlock: "32px",
          height: "100vh",
        }}
      >
        <div
          style={{
            padding: 32,
            background: "white",
            borderRadius: 32,
            boxShadow: "-3px -3px 46px -26px rgba(0,0,0,0.2)",
            width: "50%",
          }}
        >
          <TextField
            sx={{ borderRadius: "24px", marginBlock: 2, width: "100%" }}
            id="outlined-basic"
            label="Country"
            variant="outlined"
            onChange={(e) => {
              const val = e.target.value;
              if (!val) {
                setFiltered(countries);
                return;
              }
              setFiltered(
                countries.filter((country) =>
                  country.name
                    .toLocaleLowerCase()
                    .startsWith(val.toLocaleLowerCase())
                )
              );
            }}
          />
          <div
            style={{
              gap: "5px",
              display: "grid",
              overflowY: "scroll",
              maxHeight: "60vh",
            }}
            className="scroll"
          >
            {filtered.map((country: Country) => (
              <Link
                href={`/${country.countryCode}`}
                style={{
                  borderRadius: "6px",
                  border: "1px solid #777777",
                  padding: "5px",
                  textAlign: "center",
                }}
              >
                {country.name}
              </Link>
            ))}
          </div>
        </div>
      </Paper>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  countries: Country[];
}> = async () => {
  const res = await fetch(process.env.API_URL ?? "");
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const countries = await res.json();
  return { props: { countries } };
};

type Country = {
  countryCode: string;
  name: string;
};
