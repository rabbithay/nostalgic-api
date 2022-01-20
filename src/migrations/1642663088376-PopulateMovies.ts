import {MigrationInterface, QueryRunner} from "typeorm";

const movies = [
    {
      movieTitle: 'O jogo da imitação',
      parentalRating: '12',
      newRelease: 'não',
    }, {
      movieTitle: 'A teoria de tudo',
      parentalRating: '10',
      newRelease: 'não',
    }, {
      movieTitle: 'Piratas do Caribe',
      parentalRating: '14',
      newRelease: 'não',
    }, {
      movieTitle: 'Não olhe para cima',
      parentalRating: '18',
      newRelease: 'sim',
    }, {
      movieTitle: 'Vingança e Castigo',
      parentalRating: '18',
      newRelease: 'não',
    }, {
      movieTitle: 'O Esquadrão Suicida',
      parentalRating: '16',
      newRelease: 'não',
    }, {
      movieTitle: 'Eternos',
      parentalRating: '14',
      newRelease: 'sim',
    }, {
      movieTitle: 'Shang-Chi e a Lenda dos Dez Anéis',
      parentalRating: '10',
      newRelease: 'sim',
    }, {
      movieTitle: 'Homem-Aranha: Sem Volta para Casa',
      parentalRating: '12',
      newRelease: 'sim',
    }, {
      movieTitle: 'Uma mente brilhante',
      parentalRating: '10',
      newRelease: 'não',
    },
  
  ];

export class PopulateMovies1642663088376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        movies.forEach( async (movie)=>{
            const parentalRating = Number(movie.parentalRating)
            const newRelease = movie.newRelease === 'sim' ? true : false
            await queryRunner.query(`
                INSERT INTO movies 
                (title, "parentalRating", "newRelease")
                VALUES
                ($1, $2, $3)
            `, [movie.movieTitle, parentalRating, newRelease]);
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM movies
        `)
    }

}
