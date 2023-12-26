const amqp = require("amqplib/callback_api");
const pg = require("pg");
const fs = require("fs");

require("dotenv").config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DB, RMQ_URL, RMQ_QUE } =
  process.env;

const client = new pg.Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DB,
  port: DB_PORT,
  // max: 5,
});

client.connect((err) => {
  if (err) {
    console.log("Failed to connect db " + err);
  } else {
    console.log("Connect to db done!");
  }
});

//실배포시 pending 파일화 해제
const fileSaver = (path: string, data: string) => {
  fs.exists(path, function (exists) {
    if (exists) {
      fs.appendFileSync(path, `${data} \n`);
    } else {
      fs.writeFileSync(path, `${data} \n`);
    }
  });
};

const insertFeed = async (
  newsIndex: string,
  createDate: Date,
  pageIndex: string,
  subscriber: string[]
) => {
  const params = [];
  let paramsIndex = 0;
  let sql =
    'insert into "NEWS_FEED"(news_index, page_index, student_index, news_create_date) values';
  subscriber.forEach((v) => {
    sql += `($${4 * paramsIndex + 1}, $${4 * paramsIndex + 2}, $${
      4 * paramsIndex + 3
    }, $${4 * paramsIndex + 4} ),`;
    params.push(newsIndex, pageIndex, v, createDate);
    paramsIndex += 1;
  });

  client
    .query(sql.slice(0, -1), params)
    .then((res) => {
      // console.log(res);
    })
    .catch(async (e) => {
      // console.log(e);
      await fileSaver(
        "/pub_server/pending.txt",
        JSON.stringify({
          newsIndex,
          createDate,
          pageIndex,
          subscriber,
        })
      );
    });
};

amqp.connect(RMQ_URL, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = RMQ_QUE;

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.consume(
      queue,
      function (msg) {
        const message = msg.content.toString();
        const { newsIndex, createDate, pageIndex, subscriber } =
          JSON.parse(message);
        insertFeed(newsIndex, createDate, pageIndex, subscriber);
        // console.log(" [x] Received %s", parsedJson);
      },
      {
        noAck: true,
      }
    );
  });
});
