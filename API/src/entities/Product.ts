import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column ({length: 100})
    name:string

    @Column ({length: 50})
    category:string

    @Column ('double')
    price:number

    @Column({type: "text"})
    description:string
}