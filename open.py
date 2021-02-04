import os
os.chdir('./')
if os.name == 'posix':
    os.system('http-server -o -c-1')
elif os.name == 'nt':
    os.system("start http://localhost:8080/%22)
    os.system('python -m http.server 8080')