import time
import sys

import random
import time

count=0
while True:
	if count%60==0:
		value=random.randint(0,1)
		if(value==0):
			run('C:\\Users\\Khouloud\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe')
            wait()
            #maximize_window('Welcome - Visual Studio Code')
            move_mouse_to(x=1481, y=251)
            click(x=1481, y=251)
            move_mouse_to(x=49, y=11)
            click(x=49, y=11)
            move_mouse_to(x=44, y=126)
            click(x=44, y=126)
            move_mouse_to(x=470, y=47)
            click(x=470, y=47)
            type_text('C:\\Users\\khouloud\\Desktop\\testProject\\speed_evaluator')
            press_key('enter')
            move_mouse_to(x=791, y=506)
            click(x=791, y=506) # open project
            move_mouse_to(x=327, y=11)
            click(x=327, y=13)
            wait()
            move_mouse_to(x=327, y=38)
            click(x=327, y=38)
            type_text('py speed_evaluator.py')
            press_key('enter')
            while file_exists('C:\\Users\\khouloud\\Desktop\\testProject\\speed_evaluator\\ping.png') == False:
                wait()
                print ('wait for result !! ')
            kill_process('Code.exe')
            call(["node", "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\backend\\monitoring\\dropbox_file_upload.js"])
            title_notification = sys.argv[1]
            message_notification = sys.argv[2]
            icon_notification = sys.argv[3]
            from notification import my_notification_function
            my_notification_function(title_notification,message_notification,icon_notification)
            sys.exit()
		else:
		    title_notification = "RPA_stopped_manually"
		    message_notification = "Your RPA process is stopped manually"
		    icon_notification = "C:\\Users\\khouloud\\Documents\\PI\\MERN_Stack_PI\\src\\assets\\img\\icons\\common\\process-info.ico"
            from notification import my_notification_function
            my_notification_function(title_notification,message_notification,icon_notification)
			time.sleep(120)
	count+=1



