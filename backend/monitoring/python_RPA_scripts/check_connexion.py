import socket
import time
import winsound

def is_connected():
    try:
        # connect to the host -- tells us if the host is actually
        # reachable
        socket.create_connection(("www.google.com", 80))
        return True
    except OSError:
        pass
    return False
count=0
if is_connected() == False:
    title_notification = sys.argv[1]
    message_notification = sys.argv[2]
    icon_notification = sys.argv[3]
    from notification import my_notification_function
    my_notification_function(title_notification,message_notification,icon_notification)

while True:
    if is_connected() == False:
        print ("false")
        frequency = 1500  # Set Frequency To 2500 Hertz
        duration = 1000  # Set Duration To 1000 ms == 1 second
        winsound.Beep(frequency, duration)

    time.sleep(1)
