import { IsEmail, Min } from "class-validator";
import { UserInterface } from "src/user/interface/user.interface";
import { Column, CreateDateColumn, Entity, Exclusion, MinKey, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements UserInterface{
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column({unique: true})
  username: string;

  @Column({select: false})
  password: string;

  @Column()
  name: string;

  @Column({unique: true})
  @IsEmail()
  email:string;

  @CreateDateColumn()
  createdAt: Date;

}