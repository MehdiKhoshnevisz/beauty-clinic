import { useAuthCookie } from "@/hooks/use-auth-cookie";
import { useRouter } from "next/navigation";

const useBookAppointment = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthCookie();

  const bookAppointment = async () => {
    try {
      const authenticated = isLoading ? await checkAuth() : isAuthenticated;
      router.push(authenticated ? "/dashboard" : "/login");
    } catch {
      router.push("/login");
    }
  };

  return {
    bookAppointment,
  };
};

export default useBookAppointment;
