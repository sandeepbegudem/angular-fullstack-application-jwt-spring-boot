import { User } from "./user.model";

export interface InstructorDTO {
    instructorId: number;
    firstName: string;
    lastName: string;
    summary: string;
    user: User;
}