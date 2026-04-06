import { redirect } from "next/navigation";

export default function ListerRegisterRedirect() {
  // Pure functional redirect to the unified registration matrix
  redirect("/register?role=lister");
}
