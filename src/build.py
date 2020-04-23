import sass
import datetime
import os
import glob

SCRIPT = '../build/script_'
STYLE = '../build/style_'

def main():
    print('REMOVE FILES')
    clear_build()
    
    print('COMPILE SASS')
    sass.compile(dirname=('sass', '../build/css'), output_style='compressed')
    
    scripts = [
              'functions.js'
            , 'views/art.js'
            , 'views/home.js'
            , 'root.js'
            ]
    
    styles = [
              'main.css'
            , 'vars.css'
            ]
    styles = ['../build/css/' + x for x in styles]

    append = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    print('CONCAT SCRIPTS')
    concat_files(scripts, '{}{}.js'.format(SCRIPT, append))
    print('CONCAT STYLES')
    concat_files(styles, '{}{}.css'.format(STYLE, append))
    
    print('SET HTML SCRIPT & LINK')
    injecthtml(append)  
               
def clear_build():
    for f in glob.glob('../build/*.*'):
        print(f)
        os.remove(f)

def concat_files(input_list, output):
    with open(output, 'w') as file_out:
        for file_name in input_list:
            print(file_name)
            with open(file_name, 'r') as file_in:
                for line in file_in:
                    file_out.write(line)
            file_out.write('\n')

def injecthtml(append):
    with open('../index.html', 'w+') as file:
        html = """<!DOCTYPE html>
<html>
<head>
    <title>Thomas Lacasse</title>
    <link rel="stylesheet" href="build/style_APPEND.css" />
</head>
<body>
    <div id="page"></div>
    <div id="wall" style="display:none;"></div>
    <script src="build/framework/plotly-v1.53.0.min.js"></script>
    <script src="build/framework/reveal-v3.9.2.js"></script>
    <script src="build/framework/mithril-v2.0.4.min.js"></script>
    <script src="build/script_APPEND.js"></script>
</body>
</html>
"""
        file.write(html.replace('APPEND', append))
                
if __name__ == '__main__':
    main()
