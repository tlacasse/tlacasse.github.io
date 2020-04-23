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
              'art.css'
            , 'main.css'
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
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="build/framework/css/reset.css">
    <link rel="stylesheet" href="build/framework/css/reveal.css">
    <link rel="stylesheet" href="build/framework/css/theme/black.css">
    <!-- Theme used for syntax highlighting of code -->
    <link rel="stylesheet" href="build/framework/lib/css/monokai.css">
    <link rel="stylesheet" href="build/style_APPEND.css" />
</head>
<body>
    <div id="page" class="reveal"></div>
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
