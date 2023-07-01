import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Terminus</title>
        <meta
          name="description"
          content="Terminus Terminal"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
