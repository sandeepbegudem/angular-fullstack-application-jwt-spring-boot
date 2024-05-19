import { UserDTO } from "./user.model";

export interface StudentDTO {
    studentId: number;
    firstName: string;
    lastName: string;
    level: string;
    user: UserDTO;
}
