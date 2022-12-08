from kombu import Connection, Exchange, Producer, Queue
#rabbit_url = "amqp://localhost:5672/"
def connect_to_video_queue(timestamp):
        broker_username = "broker"
        broker_password = "rabbitmqbroker"
        broker_url = "b-ad4db495-b161-4e4c-ae2c-a993f03cf376.mq.eu-west-3.amazonaws.com:5671"
        rabbit_url = f"amqp://{broker_username}:{broker_password}" \
                f"@{broker_url}/"
        conn = Connection(
                rabbit_url,
                heartbeat=4,
                ssl=True)
        channel = conn.channel()
        exchange = Exchange("example-exchange", type="direct")
        producer = Producer(exchange=exchange, channel=channel, routing_key="1")
        queue = Queue(name="", exchange=exchange, routing_key="1")
        queue.maybe_bind(conn)
        queue.declare()

        producer.publish(f"{timestamp}")

connect_to_video_queue("320;55")