import { InstructorDTO } from "./instructor.model";

export interface Course {
    courseId: number;
    courseName: string;
    courseDuration: string;
    courseDescription: string;
    instructorDTO: InstructorDTO;
}