import Loader from "@/src/assets/Loader";
import { Suspense } from "react";
export const dynamic = "force-dynamic"; // ensures dynamic params are allowed
const studentAssignmentpage = () => {
    return (
        <Suspense fallback={<Loader />}></Suspense>
    )
}

export default studentAssignmentpage