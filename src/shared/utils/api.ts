import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
  withCredentials: true,
});
export const googleAuth = (code: string) => api.get(`/users/google/auth?code=${code}`);
export const completeGoogleSignup = (payload: {
  tempAccessToken: string;
  phoneNumber: string;
  city: string;
  address: string;
  country: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}) => api.post('/users/google/complete-signup', payload);

export default api;
