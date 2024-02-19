import { PickType } from "@nestjs/swagger";
import { CreateUserDTO } from "src/auth/dto";

export class SignInDTO extends PickType(CreateUserDTO, ["email", "password"] as const) {}
