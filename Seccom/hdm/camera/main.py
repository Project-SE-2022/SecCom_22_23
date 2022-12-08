# @Author: Rafael Direito
# @Date:   2022-10-06 10:54:18 (WEST)
# @Email:  rdireito@av.it.pt
# @Copyright: Insituto de Telecomunicações - Aveiro, Aveiro, Portugal
# @Last Modified by:   Rafael Direito
# @Last Modified time: 2022-10-06 11:19:15

from camera import Camera
from threading import Thread

# CAMERA VARIABLES
CAMERA_ID = 1
NUM_FRAMES_PER_SECOND_TO_PROCESS = 2

# AMQP Variables
RABBIT_MQ_URL = "b-ca71b7e7-5065-4c38-a312-d3a9ca613905.mq.eu-west-3.amazonaws.com:5671"
RABBIT_MQ_USERNAME = "broker"
RABBIT_MQ_PASSWORD = "rabbitmqbroker"
RABBIT_MQ_EXCHANGE_NAME = "human-detection-exchange"
RABBIT_MQ_QUEUE_NAME = "human-detection-queue"

camera = Camera(
    camera_id=CAMERA_ID,
    frames_per_second_to_process=NUM_FRAMES_PER_SECOND_TO_PROCESS
    )

camera.attach_to_message_broker(
        broker_url=RABBIT_MQ_URL,
        broker_username=RABBIT_MQ_USERNAME,
        broker_password=RABBIT_MQ_PASSWORD,
        exchange_name=RABBIT_MQ_EXCHANGE_NAME,
        queue_name=RABBIT_MQ_QUEUE_NAME
        )

def hdm():
    camera.transmit_video("samples/people-detection.mp4")
    print("End of video transmission")



#if __name__ == "__main__":
thread = Thread(target = hdm)
thread.start()

camera.attach_to_video_queue(
        broker_url=RABBIT_MQ_URL,
        broker_username=RABBIT_MQ_USERNAME,
        broker_password=RABBIT_MQ_PASSWORD,
        exchange_name="example-exchange",
        queue_name="",
        key=str(CAMERA_ID) 
        )


