import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";


@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.id, {eager: true})
    @JoinColumn({name: "userId"})
    user:User
    
    @ManyToOne(() => Product, (product) => product.id, {eager: true})
    @JoinColumn({name: "productId"})
    product:Product

    @Column({ length: 100, nullable: false })
    domainname: string;

    @Column({ length: 10 })
    password: string;

    @Column("timestamp")
    date: Date;
}
