import {
    Clock,
    Briefcase,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import type { JobStatus } from "../types/job";

export const statusConfig: Record<
    JobStatus,
    {
        icon: any;
        color: string;
        lightColor: string;
        textColor: string;
    }
> = {
    Applied: {
        icon: Clock,
        color: "bg-blue-500",
        lightColor: "bg-blue-500/10",
        textColor: "text-blue-400",
    },
    Interview: {
        icon: Briefcase,
        color: "bg-purple-500",
        lightColor: "bg-purple-500/10",
        textColor: "text-purple-400",
    },
    Offer: {
        icon: CheckCircle2,
        color: "bg-green-500",
        lightColor: "bg-green-500/10",
        textColor: "text-green-400",
    },
    Rejected: {
        icon: XCircle,
        color: "bg-red-500",
        lightColor: "bg-red-500/10",
        textColor: "text-red-400",
    },
};
