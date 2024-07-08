import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
const useAuthRedirect = () => {
  const router = useRouter();
  const pathName = usePathname();
  const publicPaths = ["/", "/signin", "/signup"];

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (publicPaths.includes(pathName) && token) {
      router.push("/dashboard");
    } else if (!publicPaths.includes(pathName) && !token) {
      router.push("/");
    }
  }, [pathName, router]);
};
export default useAuthRedirect;
