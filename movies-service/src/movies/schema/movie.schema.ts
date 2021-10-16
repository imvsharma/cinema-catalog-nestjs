import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type MovieDocument = Movie & Document

@Schema()
export class Movie {
  @Prop()
  id: string;

  @Prop()    
  title: string;

  @Prop()
  runtime: number;

  @Prop()
  format: string;

  @Prop()
  plot: string;

  @Prop()
  releaseYear: number;

  @Prop()
  releaseMonth: number;

  @Prop()
  releaseDay: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie)