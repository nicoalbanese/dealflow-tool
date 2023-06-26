import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Navigation from "../components/navigation";
import HomeSkeleton from "../components/Skeleton";
import UniversalSearch from "../components/universalSearch";
import { trpc } from "../utils/trpc";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();
  // const { data: userData, status: userDataStatus } =
  trpc.auth.getAuthStatus.useQuery();

  if (status == "loading") {
    return (
      <>
        <HomeSkeleton />
      </>
    );
  }
  if (status == "authenticated") {
    return (
      <main>
        <div className="my-4 flex items-center justify-between">
          <h1 className="">Ascension Deal Flow</h1>
          <UniversalSearch />
        </div>
        <div>
          <Navigation />
        </div>
      </main>
    );
  }

  if (status == "unauthenticated") {
    return (
      <div className="mt-4">
        <h1>Ascension Deal Flow</h1>
        <div className="mt-4">
          <div className="mb-4">
            You are not logged in. Please sign in below.
          </div>
          <button onClick={() => signIn("google")} className={"btn-base"}>
            Sign in
          </button>
        </div>
      </div>
    );
  }
  return <>loading...</>;
};

export default Home;
