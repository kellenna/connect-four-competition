import { Member } from "./member.model";

export interface Team {
    name: string;
    members: Member[];
    goal: string;
    motto: string;
}