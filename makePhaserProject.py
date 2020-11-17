import os
os.chdir('./')
print("\n\nMaking your project template...\n\n\n ")
dirName = input("Name of the project: ")
os.mkdir(dirName)
os.chdir(f'./{dirName}')
os.mkdir('Assets')

with open('index.html','w+') as f:
    writeString = f"""<html>

<head>
<title>{dirName}</title>
<script src = 'phaser.js' ></script>
<script src='mainFile.js'></script>
<script src='game.js'></script>

</head>

</html>"""
    f.write(writeString)

with open('game.js','w+') as f:
    writeString = """const config = {
            type: Phaser.AUTO,
            width: 620,
            height: 620,
            backgroundColor: 0x3399ff,
            scene: []
        }

const game = new Phaser.Game(config);"""
    f.write(writeString)

with open('mainFile.js','w+') as f:
    writeString = """class yourGame extends Phaser.Scene {

        preload(){

        }
        create(){

        }
        update(){

        }
}"""
    f.write(writeString)

with open('open.py','w+') as f:
    writeString = """import os
os.chdir('./')
if os.name == 'posix':
    os.system('http-server -o -c-1')
elif os.name == 'nt':
    os.system('python -m http.server')
"""
    f.write(writeString)


print("\n\nProject called $dirName has been made!!\n\n")
