import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity()
@Index(["place"], {unique: true})
export class ZaimGenre {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    place: string;

    @Column({name : 'category_id'})
    categoryId: number;

    @Column({name : 'category_name'})
    categoryName: string;

    @Column({name : 'genre_id'})
    genreId: number;

    @Column({name : 'genre_name'})
    genreName: string;

    @CreateDateColumn({name : 'create_date'})
    credateDate: Date;

    @UpdateDateColumn({name : 'update_date'})
    updateDate: Date;

    constructor(
        place: string,
        categoryId: number,
        categoryName: string,
        genreId: number,
        genreName: string,
        credateDate: Date,
        updateDate: Date
    ) {
        this.place = place;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.genreId = genreId;
        this.genreName = genreName
        this.credateDate = credateDate;
        this.updateDate = updateDate;
    }

}
