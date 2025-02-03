import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    name: string;
 
    @Column({ nullable: false })
    email: string;
 
    @Column({ nullable: true })
    address?: string;
 
    @Column({ nullable: true })
    phone?: string;
 
    @Column({ nullable: false })
    password: string;

    @Column({ type: "enum", enum: ["admin", "user"] })
    role: string;
}
