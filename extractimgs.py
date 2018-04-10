# coding: utf-8
import os
import re
import codecs
import shutil

sdir='.\\slides\\pugs'
sidir='C:\\Users\\wheelchair\\Documents\\members\\suzuryo\\repos\\cvpaper.challenge\\slides\\figs'
ddir='.\\slides\\figs'

files=os.listdir(sdir)
for file in files:
    with codecs.open(os.path.join(sdir,file),'r','utf-8') as fp:
        lines=fp.read()
        lines=re.split('\r?\n',lines)
        for line in lines:
            if re.search('img\(src=`${figpath}.+?`,alt=".+?"\)',line):
                tags=re.findall('img\(src=`${figpath}.+?`,alt=".+?"\)',line)
                for tag in tags:
                    tfn=re.replace('img\(src=`${figpath}(.+?)`,alt=".+?"\)','\\1',tag)
                    shutil.copy2(os.path.join(sidir,tfn),os.path.join(ddir,tfn))
