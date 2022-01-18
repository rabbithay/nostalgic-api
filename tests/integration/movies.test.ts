/* eslint-disable no-undef */
import 'jest';
import '../../src/config/setup';
import supertest from 'supertest';
import { getConnection } from 'typeorm';
import app, { init } from '../../src/app';
import { clearDatabase } from '../factories/clearDatabase';
import { createMovie } from '../factories/createMovie';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

export interface MovieBody {
    title: string,
    parentalRating: string,
    newRelease: boolean,
}

const mockNewMovie: MovieBody = {
  title: 'Piratas do caribe',
  parentalRating: '10',
  newRelease: false,
};

describe('GET /movies', () => {
  it('should answer with a array of movies and status 200 in case of success', async () => {
    const movie = await createMovie(mockNewMovie);

    const response = await supertest(app).get('/movies');

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: movie.title,
          parentalRating: movie.parentalRating,
          newRelease: movie.newRelease,
        }),
      ]),
    );
    expect(response.status).toBe(200);
  });
});

describe('POST /movies', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const { title, parentalRating } = mockNewMovie;
    const movie = {
      title, parentalRating, newRelease: 'não',
    };

    const response = await supertest(app).post('/movies').send(movie);

    expect(response.status).toBe(400);
  });

  it('should answer with status 201 in case of success', async () => {
    const movie = mockNewMovie;

    const response = await supertest(app).post('/movies').send(movie);

    expect(response.status).toBe(201);
  });
});

describe('PUT /movies', () => {
  it('should answer with status 400 in case of invalid body', async () => {
    const movie = await createMovie(mockNewMovie);
    const { id, title } = movie;
    const updateMovie = {
      title, parentalRating: '22', newRelease: 'não',
    };

    const response = await supertest(app).put(`/movies/${id}`).send(updateMovie);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 in case of invalid id', async () => {
    const id = 'id_invalido';

    const response = await supertest(app).put(`/movies/${id}`).send(mockNewMovie);

    expect(response.status).toBe(400);
  });

  it('should answer with the updated movie object and status 200 in case of success', async () => {
    const movie = await createMovie(mockNewMovie);
    const { id, parentalRating, newRelease } = movie;
    const updateMovie = {
      title: 'Steve Magal contra o sistema', parentalRating, newRelease,
    };

    const response = await supertest(app).put(`/movies${id}`).send(updateMovie);

    expect(response.body).toEqual(
      expect.objectContaining({
        id,
        title: updateMovie.title,
        parentalRating,
        newRelease,
      }),
    );
    expect(response.status).toBe(200);
  });
});

describe('DELETE /movies', () => {
  it('should answer with status 400 in case of invalid id', async () => {
    const id = 'id_invalido';

    const response = await supertest(app).delete(`/movies/${id}`);

    expect(response.status).toBe(400);
  });

  it('should answer with status 200 in case of success', async () => {
    const movie = await createMovie(mockNewMovie);
    const { id } = movie;

    const response = await supertest(app).delete(`/movies${id}`);

    expect(response.status).toBe(201);
  });
});
