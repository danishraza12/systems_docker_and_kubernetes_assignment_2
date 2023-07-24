const amqp = require('amqplib');

const sendMsg = async (queueName, message) => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    console.log(" [x] Sent '%s'", message);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
};

const receiveMsg = async (queueName) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queueName, { durable: false });
    await channel.consume(
      queueName,
      (message) => {
        if (message) {
          console.log(
            " [x] Received '%s'",
            JSON.parse(message.content.toString())
          );
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
};
module.exports = {
  sendMsg, receiveMsg
};
