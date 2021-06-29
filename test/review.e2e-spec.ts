import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'My title',
  description: 'Lorem ipsum dolor sit amet',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review (POST)', (done) => {
    request(app.getHttpServer())
      .post('/review')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        done();
      });
  });

  it('/review (POST) - fails if rating is less than 1', () => {
    return request(app.getHttpServer())
      .post('/review')
      .send({ ...testDto, rating: 0 } as CreateReviewDto)
      .expect(400);
  });

  it('/review (POST) - fails if rating is greater than 5', () => {
    return request(app.getHttpServer())
      .post('/review')
      .send({ ...testDto, rating: 6 } as CreateReviewDto)
      .expect(400);
  });

  it('/review (POST) - fails if rating is a float number', () => {
    return request(app.getHttpServer())
      .post('/review')
      .send({ ...testDto, rating: 1.5 } as CreateReviewDto)
      .expect(400);
  });

  it('/review (POST) - fails if product ID is not a MongoDB ID', () => {
    return request(app.getHttpServer())
      .post('/review')
      .send({ ...testDto, productId: "123" } as CreateReviewDto)
      .expect(400);
  });

  it('/review/product/:productId (GET)', (done) => {
    request(app.getHttpServer())
      .get(`/review/product/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        done();
      });
  });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200);
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete(`/review/${Types.ObjectId().toHexString()}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
