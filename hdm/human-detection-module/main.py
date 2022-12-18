# @Author: Rafael Direito
# @Date:   2022-10-06 11:30:52 (WEST)
# @Email:  rdireito@av.it.pt
# @Copyright: Insituto de Telecomunicações - Aveiro, Aveiro, Portugal
# @Last Modified by:   Rafael Direito
# @Last Modified time: 2022-10-07 11:34:30


import os
from human_detection import Human_Detection_Module

# AMQP Variables
RABBIT_MQ_URL = "b-ca71b7e7-5065-4c38-a312-d3a9ca613905.mq.eu-west-3.amazonaws.com:5671"
RABBIT_MQ_USERNAME = "broker"
RABBIT_MQ_PASSWORD = "rabbitmqbroker"

#RABBIT_MQ_URL = os.environ["AWS"] 
#RABBIT_MQ_USERNAME = os.environ["USER"]
#RABBIT_MQ_PASSWORD = os.environ["PASS"]
RABBIT_MQ_EXCHANGE_NAME = "human-detection-exchange"
RABBIT_MQ_QUEUE_NAME = "human-detection-queue"

# OUTPUT
OUTPUT_DIR = "intruders"

human_detection_worker = Human_Detection_Module(OUTPUT_DIR)

human_detection_worker.start_processing(
    broker_url=RABBIT_MQ_URL,
    broker_username=RABBIT_MQ_USERNAME,
    broker_password=RABBIT_MQ_PASSWORD,
    exchange_name=RABBIT_MQ_EXCHANGE_NAME,
    queue_name=RABBIT_MQ_QUEUE_NAME
    )
