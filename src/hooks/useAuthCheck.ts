import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { setCredentials } from "@/redux/features/auth/auth.slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
  } = useGetMeQuery(undefined);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setCredentials({ user, token: null }));
    }

    if (!isLoading) {
      setAuthChecked(true);
    }
  }, [user, isSuccess, isError, isLoading, dispatch]);

  return authChecked;
};

export default useAuthCheck;
