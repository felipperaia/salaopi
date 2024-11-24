import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// Ajustar as informações dos usuários e entradas do bd
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    nome: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column()
    senha: string;

    @Column({ nullable: true })
    telefone: string;

    @Column({ default: false })
    ativo: boolean;

    constructor(name: string, email: string) {
      this.name = name;
      this.email = email;
    }
}

