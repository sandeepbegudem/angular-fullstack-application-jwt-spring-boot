import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { UsersService } from "../services/users.service";

export class EmailExistsValidator {
    static validate(UsersService: UsersService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return UsersService.checkIfEmailExist(control.value).pipe(
                map((result: boolean) => result ? { emailAlreadyExist: true } : null)
            )
        }
    }
}