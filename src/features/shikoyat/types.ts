import type { Role } from "../../auth/types";

export type ComplaintStatus = "open" | "fixed";

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  role: Role;
  text: string;
  createdAt: string;
  status: ComplaintStatus;
}
