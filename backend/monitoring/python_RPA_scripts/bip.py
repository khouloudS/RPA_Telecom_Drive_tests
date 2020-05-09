import socket
import time
import winsound
import sys


frequency = 1500  # Set Frequency To 2500 Hertz
duration = 1000  # Set Duration To 1000 ms == 1 second
winsound.Beep(frequency, duration)
title_notification = sys.argv[1]
message_notification = sys.argv[2]
icon_notification = sys.argv[3]
from notification import my_notification_function
my_notification_function(title_notification,message_notification,icon_notification)
sys.exit()


