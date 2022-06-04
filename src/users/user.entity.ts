import { Profile } from "src/profiles/profile.entity";
import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLogin: Date;

  @ManyToMany(() => Profile)
  @JoinTable()
  profiles: Profile[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}