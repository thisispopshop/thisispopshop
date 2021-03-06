import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Product, Collection } from ".";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(type => Product, product => product.color)
  public products!: Product[];

  @ManyToMany(type => Collection, collection => collection.colors)
  public collections!: Collection[];

}
