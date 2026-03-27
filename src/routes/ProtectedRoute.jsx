import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_SESSION_KEY } from "@/utils/constants";
import { store } from "@/features/tokenSlice";

const getStoredSession = () => {
  const rawSession = localStorage.getItem(AUTH_SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch {
    return null;
  }
};

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
