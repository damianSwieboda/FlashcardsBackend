// import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateDeckInputDTO } from './create-deck-input.dto';
import { InputType } from '@nestjs/graphql';

//  extends PartialType( OmitType(CreateDeckInputDTO, ['deckOwner'] as const) )
@InputType()
export class UpdateDeckInputDTO extends CreateDeckInputDTO {}
