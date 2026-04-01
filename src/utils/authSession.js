import { api } from "./api";
import { AUTH_SESSION_KEY } from "./constants";

const getStoredSession = () => {
  const rawSession = localStorage.getItem(AUTH_SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch (error) {
    console.error("Failed to parse auth session:", error);
    return null;
  }
};

const getCurrentUserEmail = () => getStoredSession()?.email || "";

const fetchUserByEmail = async (email) => {
  if (!email) {
    return null;
  }

  const response = await api.get("/users", {
    params: { email },
  });

  return response.data?.[0] || null;
};

const fetchCurrentUser = async () => {
  const currentEmail = getCurrentUserEmail();
  return fetchUserByEmail(currentEmail);
};

export { getStoredSession, getCurrentUserEmail, fetchUserByEmail, fetchCurrentUser };
