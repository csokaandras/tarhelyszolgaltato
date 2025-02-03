import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
 
@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
 
    @Column({ type: "varchar", nullable: false })
    name: string;
 
    @Column({ type: "varchar", nullable: false })
    email: string;
 
    @Column({ type: "varchar", nullable: true })
    address?: string;
 
    @Column({ type: "varchar", nullable: true })
    phone?: string;
 
    @Column({ type: "varchar", nullable: false })
    password: string;
}