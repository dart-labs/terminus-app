import type { NextPage } from "next";
import Head from "next/head";
import { ApiKeysView } from "../views";

const ApiKeys: NextPage = (props) => {
    return (
        <div>
            <Head>
            <title>Terminus</title>
            <meta
                name="description"
                content="Basic Functionality"
            />
            </Head>
            <ApiKeysView />
        </div>
    );
};

export default ApiKeys;
