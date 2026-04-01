import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "@/features/tokenSlice";
import { getStoredSession } from "@/utils/authSession";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.token.value);
  const storedSession = useMemo(() => getStoredSession(), []);

  useEffect(() => {
    if (!selector?.token && storedSession?.token) {
      dispatch(store(storedSession));
    }
  }, [dispatch, selector?.token, storedSession]);


  return <Outlet />;
};

export default ProtectedRoute;
