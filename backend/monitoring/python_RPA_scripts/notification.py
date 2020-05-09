# import win10toast  
from win10toast import ToastNotifier
import sys
# create an object to ToastNotifier class
def my_notification_function(title_notification,message_notification,icon_notification):
    n = ToastNotifier()
    n.show_toast(title_notification, message_notification, duration = 300, icon_path =icon_notification)
title_notification = sys.argv[1]
message_notification = sys.argv[2]
icon_notification = sys.argv[3]
my_notification_function(title_notification,message_notification,icon_notification)
sys.exit()
