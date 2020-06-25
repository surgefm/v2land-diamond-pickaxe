import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/enqueue-url (POST)', () => {
    return request(app.getHttpServer())
      .post('/enqueue-url')
      .send({
        url:
          'https://theinitium.com/article/20200505-mainland-coronavirus-liwenliang-weibo-wailing-wall/',
      })
      .expect(201);
  });

  it('/site (POST)', () => {
    return request(app.getHttpServer())
      .post('/site')
      .send({
        name: '端传媒',
        rssUrls: ['http://feeds.initium.news/theinitium'],
        dynamicLoading: true,
        shouldParseFulltext: true,
      })
      .expect(201);
  });
});
