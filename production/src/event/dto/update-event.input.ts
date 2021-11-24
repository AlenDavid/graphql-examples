import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  beginsAt: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  host: string;
}
