#Adapted code from Lantop
#https://github.com/Lantop1k/Video-Croper-OpenCV



import time
import cv2
from datetime import datetime
from datetime import timedelta


def parse_ts(ts):
    h, m, s = ts.split(':')
    return timedelta(hours=int(h), minutes=int(m), seconds=float(s))


def intrusionVideo(frame,id_intro):
    filename="./samples/people-detection.mp4"   #filename
    cap = cv2.VideoCapture(filename) #Read Frame
    fps=cap.get(cv2.CAP_PROP_FPS)    #Extract the frame per second (fps)

    height=int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) #height
    width=int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) #width

    #Get video duration
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count/fps

    
    #frame time
    frame_time = frame * duration/frame_count

    keyTimestamp = str(time.strftime('%H:%M:%S', time.gmtime(frame_time)))
    print(keyTimestamp)
    totalTime = str(time.strftime('%H:%M:%S', time.gmtime(duration)))
    #keyTimestamp = "00:00:10"
    #threeMIn = "00:03:00"
    threeMIn = "00:00:10"


    origin="00:00:00"        #the origin
    start= parse_ts(keyTimestamp) - parse_ts(threeMIn)          #specify start time in hh:mm:ss
    end = parse_ts(keyTimestamp) + parse_ts(threeMIn)      #specify end time in hh:mm:ss

    #Edge cases
    if end > parse_ts(totalTime):
        start = parse_ts(totalTime) - parse_ts(threeMIn)
        end = parse_ts(totalTime)
    if start < parse_ts(origin): 
        start = parse_ts(origin)
        end = parse_ts(origin) + parse_ts(threeMIn)
                

    origintime=datetime.strptime(origin,"%H:%M:%S") #origin 
    starttime=datetime.strptime(str(start),"%H:%M:%S")  #start time
    endtime=datetime.strptime(str(end),"%H:%M:%S")      #end time

    startframe=fps*(starttime-origintime).total_seconds()  #get the start frame
    endframe=fps*(endtime-origintime).total_seconds()  #get the end frame

    #video writer
    output_name = f'intrusions/{id_intro}.avi'
    fourcc = cv2.VideoWriter_fourcc(*'XVID')  
    out1 = cv2.VideoWriter(output_name,fourcc, fps, (width,height))

    counter =1 #set counter
    while(cap.isOpened()):           #while the cap is open

        ret, frame = cap.read()       #read frame
        if frame is None:             #if frame is None
            break  
        
        frame=cv2.resize(frame, (width,height))  #resize the frame
        if counter>=startframe and counter<=endframe:  #check for range of output
            out1.write(frame)  #output 

        #cv2.imshow("Frame", frame)  #display frame
        key = cv2.waitKey(1) & 0xFF

        counter+=1  #increase counter
        
    #release the output and cap  
    out1.release()
    cv2.destroyAllWindows()

    return output_name

#intrusionVideo(250,30)
