import { Paper, styled } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

const Centralized = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
}));

const Page = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  paddingBlock: "32px",
  background: "inherit",
  minHeight: "100vh",
  [theme.breakpoints.down("md")]: {
    width: "100vw",
  },
}));
const Card = styled("div")(({ theme }) => ({
  padding: 32,
  background: "white",
  borderRadius: 32,
  boxShadow: "-3px -3px 46px -26px rgba(0,0,0,0.2)",
  display: "grid",
  justifyContent: "center",
  alignContent: "center",
  maxWidth: "50%",
  marginInline: "auto",
  [theme.breakpoints.down("md")]: {
    width: "90vw",
    maxWidth: "100%",
  },
}));
const CountryImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "80%",
    height: "80%",
  },
}));

export default function TEST({
  countryInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const formatNumber = useCallback((value: number) => {
    if (value >= 1_000_000) {
      return Number((value / 1_000_000).toFixed(1));
    }
    if (value >= 1_000) {
      return Number((value / 1_000).toFixed(1));
    }
    return value;
  }, []);

  return (
    <>
      <Page>
        <Card>
          <Centralized sx={{ textAlign: "center" }}>
            <div>
              <CountryImage
                width={300}
                height={200}
                src={countryInfo.flagURL}
                alt="flag"
              />
            </div>
            <h2>{countryInfo.commonName}</h2>
          </Centralized>

          <div>
            <h3>Borders:</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                paddingBlock: 16,
                width: "100%",
              }}
            >
              {countryInfo.borders?.map((item) => {
                return (
                  <div key={item.countryCode}>
                    <Link
                      href={`/${item.countryCode}`}
                      style={{
                        borderRadius: "6px",
                        border: "1px solid #777777",
                        padding: "5px",
                        textAlign: "center",
                        lineHeight: 2,
                      }}
                    >
                      {item.commonName}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <BarChart
            className="chart-full"
            series={[
              {
                data: countryInfo.population.map((pop) =>
                  formatNumber(pop.value)
                ),
                label: "Population (M)",
              },
            ]}
            yAxis={[
              {
                label: "Population in Million",
              },
            ]}
            height={290}
            width={400}
            xAxis={[
              {
                data: countryInfo.population.map((pop) => pop.year),
                scaleType: "band",
                label: "year",
              },
            ]}
            dataset={countryInfo.population}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Card>
      </Page>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  countryInfo: CountryInfo;
}> = async (context) => {
  const { params } = context;

  const res = await fetch(`${process.env.API_URL}/${params?.country}`);
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const countryInfo = (await res.json()) as CountryInfo;
  return { props: { countryInfo } };
};

type CountryBaseInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryBaseInfo[] | null;
};

type CountryInfo = CountryBaseInfo & {
  population: {
    year: number;
    value: number;
  }[];
  flagURL: string;
};
