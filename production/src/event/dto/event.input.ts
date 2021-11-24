import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  beginsAt: string;

  @Field()
  @IsNotEmpty()
  host: string;
}
