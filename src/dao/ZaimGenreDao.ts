import { createConnection, createQueryBuilder } from 'typeorm';
import { ZaimGenre } from '../entity/ZaimGenre'

const deafultGenre = new ZaimGenre('', 101, '食費', 10101, '食料品', new Date(), new Date());

export async function getGenre(place: string) {
    const conn = await createConnection('default');

    const genres:ZaimGenre[] = await createQueryBuilder()
    .from(ZaimGenre, 'zaim_genre').where('place = :place', { place: place }).execute();
    await conn.close();

    if(genres.length == 0) {
        return deafultGenre;
    } 
    return genres[0];
}

export function getDefaultGenre() {
    return deafultGenre;
}
