from automagica import *
from subprocess import call
import sys

if is_process_running('Code.exe')== True:
    print('process is killed')
    kill_process('Code.exe')
    call(["node", "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\backend\\monitoring\\dropbox_file_upload.js"])
    title_notification = sys.argv[1]
    message_notification = sys.argv[2]
    icon_notification = sys.argv[3]
    from notification import my_notification_function
    my_notification_function(title_notification,message_notification,icon_notification)
sys.exit()
