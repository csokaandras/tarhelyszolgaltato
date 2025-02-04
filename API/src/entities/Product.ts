import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column ({length: 100, nullable: false , unique: true })
    name:string

    @Column ({length: 50, nullable: false})
    category:string

    @Column ({type: 'double', nullable: false})
    price:number

    @Column({type: "text", nullable: false})
    description:string
}