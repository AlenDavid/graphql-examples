import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class EventType {
  @Field()
  @IsString()
  @IsNotEmpty()
  beginsAt: string;

  @Field()
  @IsNotEmpty()
  host: string;
}
