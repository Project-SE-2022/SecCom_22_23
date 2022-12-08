# @Author: Rafael Direito
# @Date:   2022-10-06 10:54:23 (WEST)
# @Email:  rdireito@av.it.pt
# @Copyright: Insituto de Telecomunicações - Aveiro, Aveiro, Portugal
# @Last Modified by:   Rafael Direito
# @Last Modified time: 2022-10-26 10:02:40

import cv2
import imutils
import kombu
import datetime


import boto3
import os

import requests


from trimmer import intrusionVideo


# def uploadTos3(intrusion_id):
#     client = boto3.resource('s3',aws_access_key_id = 'AKIAV3ZBHOANRIWJ6EUL',
#                             aws_secret_access_key = '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')
#     path = "intrusions/"
#     dir_list = os.listdir(path)
#     for file in dir_list:
#         if f'{intrusion_id}.avi' in file:
#             print(file)
#             upload_file_bucket = 'seccombucket'
#             upload_file_key = 'intrusions/' + str(file)
#             client.meta.client.upload_file(upload_file_key, upload_file_bucket, 'intrusions/'+file)

class Camera:

    kombu_connection = None
    kombu_exchange = None
    kombu_channel = None
    kombu_producer = None
    kombu_queue = None

    def __init__(self, camera_id, frames_per_second_to_process):
        self.camera_id = camera_id
        self.frames_per_second_to_process = frames_per_second_to_process


    

    
    def attach_to_message_broker(self, broker_url, broker_username,
                                 broker_password, exchange_name, queue_name):
        # Create Connection String
        connection_string = f"amqp://{broker_username}:{broker_password}" \
            f"@{broker_url}/"

        # Kombu Connection
        self.kombu_connection = kombu.Connection(
            connection_string,
            ssl=True
        )
        self.kombu_channel = self.kombu_connection.channel()

        # Kombu Exchange
        self.kombu_exchange = kombu.Exchange(
            name=exchange_name,
            type="direct",
            delivery_mode=1
        )

        # Kombu Producer
        self.kombu_producer = kombu.Producer(
            exchange=self.kombu_exchange,
            channel=self.kombu_channel
        )

        # Kombu Queue
        self.kombu_queue = kombu.Queue(
            name=queue_name,
            exchange=self.kombu_exchange,

        )
        self.kombu_queue.maybe_bind(self.kombu_connection)
        self.kombu_queue.declare()
    
    def attach_to_video_queue(self, broker_url, broker_username,
                                 broker_password, exchange_name, queue_name, key):
        # Create Connection String
        connection_string = f"amqp://{broker_username}:{broker_password}" \
            f"@{broker_url}/"


        # Kombu Connection
        self.kombu_connection = kombu.Connection(
            connection_string,
            ssl=True
        )
        self.kombu_channel = self.kombu_connection.channel()

        # Kombu Exchange
        self.kombu_exchange = kombu.Exchange(
            name=exchange_name,
            type="direct",
            #delivery_mode=1
        )
        
    
        # Kombu Queue
        self.kombu_queue = kombu.Queue(
            name=queue_name,
            exchange=self.kombu_exchange,
            routing_key=key,
            exclusive=True #added morning
        )

        def process_message(body, message):
            msg = "{}".format(body)
            frame, intrusion_id = msg.split(";")
            print(f"msg = {frame}\t{intrusion_id}")
            
            #Crop video
            video_name = intrusionVideo(int(frame),int(intrusion_id))
            print(video_name)
            # Send Video
            #files = {'document': open(video', 'rb')}
            #requests.post('http://127.0.0.1:8060/IntrusionManagementAPI/intrusions/video', json=files)
            #uploadTos3(intrusion_id)

            url = "http://localhost:8060/IntrusionManagementAPI/intrusion/video"
            files = {'upload_file': open(video_name,'rb')}
            values = {'DB': 'photcat', 'OUT': 'csv', 'SHORT': 'short'}
            r = requests.post(url, files=files, data=values)
            os.remove(video_name)
            message.ack()

        
        with kombu.Consumer(self.kombu_connection, queues=self.kombu_queue , callbacks=[process_message], accept=["text/plain"]):  
            #self.kombu_connection.drain_events(timeout=5)
            while True:
                self.kombu_connection.drain_events()
        '''
        self.kombu_consumer = kombu.Consumer(self.kombu_connection, queues=self.kombu_queue , callbacks=[process_message], accept=["text/plain"])
        self.kombu_consumer.consume()
        '''
        #self.kombu_queue.maybe_bind(self.kombu_connection)
        #self.kombu_queue.declare()


    def transmit_video(self, video_path):
        video = cv2.VideoCapture(video_path)

        # Check if the video exists
        check, frame = video.read()
        if not check:
            print("Video Not Found. Please Enter a Valid Path (Full path of " +
                  "Video Should be Provided).")
            return

        # Compute the frame step
        video_fps = video.get(cv2.CAP_PROP_FPS)
        frame_step = video_fps/self.frames_per_second_to_process
        print('Detecting people...')
        time_now = datetime.datetime.now()

        frame_count = 0
        frame_id = 0
        while video.isOpened():

            # check is True if reading was successful
            check, frame = video.read()

            if check:
                if frame_count % frame_step == 0:

                    # Resize frame
                    frame = imutils.resize(
                        frame,
                        width=min(800, frame.shape[1])
                    )

                    # Encode to JPEG
                    result, imgencode = cv2.imencode(
                        '.jpg',
                        frame,
                        [int(cv2.IMWRITE_JPEG_QUALITY), 90]
                    )

                    frame_seconds = frame_count/video_fps
                    time_now += datetime.timedelta(seconds=frame_seconds)

                    # send a message
                    self.kombu_producer.publish(
                        body=imgencode.tobytes(),
                        content_type='image/jpeg',
                        content_encoding='binary',
                        headers={
                            "source": f"camera_{self.camera_id}",
                            "timestamp": str(time_now),
                            "frame_count": frame_count,
                            "frame_id": frame_id
                        }
                    )
                    print(f"[Camera {self.camera_id}] Sent a frame to " +
                          "the human-detection module " +
                          f"(frame_number={frame_count}, " +
                          f"frame_timestamp={time_now})")

                    frame_id += 1
                    #key = cv2.waitKey(1)
                    #if key == ord('q'):
                    #    break
            else:
                break

            frame_count += 1