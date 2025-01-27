import { Profile } from "@/models/profile";
import { User } from "@/models/user";

export type LoginResponse = {
  user: User;
  profile: Profile;
  token: string;
};