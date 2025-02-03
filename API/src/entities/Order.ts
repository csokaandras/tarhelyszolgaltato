import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Hosting";


@Entity()
export class Order{
    @PrimaryColumn({generated:true})
    id:number

    @ManyToOne(() => User, (user) => user.id, {eager: true})
    @JoinColumn({name: "userId"})
    user:number
    
    @ManyToOne(() => Product, (product) => product.id, {eager: true})
    @JoinColumn({name: "productId"})
    product:number

    @Column('double')
    amount:number

    @Column("timestamp")
    date:Date

    @Column({type: "text", nullable: true})
    description: string

    @Column({default: false})
    status: boolean
}