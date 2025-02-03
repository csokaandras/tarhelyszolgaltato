import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Product{
    @PrimaryColumn({generated:true})
    id:number

    @Column ({length: 100})
    name:string

    @Column ({length: 50})
    category:string

    @Column ('double')
    price:number

    @Column('double')
    weight:number

    @Column('integer')
    amount:number

    @Column('text')
    desc:string

    @Column({default: true})
    status:boolean
}