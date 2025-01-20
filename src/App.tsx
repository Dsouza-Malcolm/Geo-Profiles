import { useEffect, useState } from "react";
import AppLayout from "./components/AppLayout";
import Loading from "./components/Loading";
import { useStore } from "./hooks/useStore";
import generateFakeProfiles from "./utils/generateFakeProfiles";

function App() {
  const [isLoading, setLoading] = useState(true);
  const { dispatch } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_PROFILES", payload: generateFakeProfiles(20) });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return <>{isLoading ? <Loading /> : <AppLayout />} </>;
}

export default App;
