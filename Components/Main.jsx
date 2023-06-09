import React from "react";
import useRouter from "./router";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuthorized } from "../redux/authSelectors";
import { useEffect } from "react";
import { authorizationUser } from "../redux/authOperations";

function Main() {
  const isAuthorized = useSelector(getIsAuthorized);
  const routing = useRouter(isAuthorized);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorizationUser());
  }, []);

  return <>{routing}</>;
}

export default Main;
