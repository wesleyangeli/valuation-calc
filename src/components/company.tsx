import { GetServerSideProps } from "next";
import { getCompanyOverview } from "../utils/api";

type CompanyOverview = {
  Symbol: string;
  Name: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  Price: string;
};

type CompanyProps = {
  company: CompanyOverview;
};

const CompanyPage: React.FC<CompanyProps> = ({ company }) => {
  return (
    <div>
      <h1>
        {company.Name} ({company.Symbol})
      </h1>
      <p>Exchange: {company.Exchange}</p>
      <p>Sector: {company.Sector}</p>
      <p>Industry: {company.Industry}</p>
      <p>Price: {company.Price}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const symbol = context.query.symbol as string;
  const company = await getCompanyOverview(symbol);

  if (!company) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      company,
    },
  };
};

export default CompanyPage;
