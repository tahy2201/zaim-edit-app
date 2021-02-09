import { createConnection, createQueryBuilder } from 'typeorm';
import { ZaimGenre } from '../entity/ZaimGenre'

const deafultGenre = new ZaimGenre('', 101, '食費', 10101, '食料品', new Date(), new Date());

export async function getGenre(place: string) {
    const conn = await createConnection('default');

    const genres:any[] = await createQueryBuilder()
    .from(ZaimGenre, 'zaim_genre').where('place = :place', { place: place }).execute();
    await conn.close();

    if(genres.length == 0) {
        return deafultGenre;
    } 
    
    genres[0]

    return new ZaimGenre(
        genres[0].place,
        genres[0].category_id,
        genres[0].category_name,
        genres[0].genre_id,
        genres[0].genre_name,
        genres[0].credate_date,
        genres[0].update_date,
    );
}

export function getDefaultGenre() {
    return deafultGenre;
}
