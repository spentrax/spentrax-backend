import * as AuthService from "./auth.service";

export const signup = async ({
  body: { email, password },
}: any) => {
  const result = await AuthService.signup(email, password);

  return {
    statusCode: 201,
    data: result,
  };
};

export const login = async ({
  body: { email, password },
}: any) => {
  const result = await AuthService.login(email, password);

  return {
    statusCode: 200,
    data: result,
  };
};
