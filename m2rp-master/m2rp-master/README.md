# markdown-to-revealjs-pug (m2rp)

This application is for [cvpaper.challenge](https://github.com/cvpaperchallenge/cvpaper.challenge).

This is client-side web-browser based slide editor by Markdown for cvpaper.challenge.

Markdownで書くと．cvpaper.challenge用のpugのコードを吐いてくれるブラウザ上のエディタです．オフラインで動きます．

## セットアップ
Node.jsが必要です．インストールしておいてください．

markdown-it，jQueryが必要です．m2rpのホームディレクトリにて，下記のコマンドによりローカルインストールしてください．

> npm install --save markdown-it jquery


## 使い方
1. m2rp.htmlをブラウザで開きます．
2. 上部のテキスト領域にMarkdownで書いていきます．
3. 上部テキスト領域にファイルをドラッグ＆ドロップすると，元のカーソル位置に画像タグを自動挿入してくれます．
4. Linktagボタンを押すと，カーソル位置にリンクタグテンプレートを自動挿入してくれます．
5. 書き終えたらConvertボタンを押します．
6. 下部テキスト領域の変換結果を，**git pull origin masterしてから**，index.pugの先頭にコピペしましょう．
7. 追加したら，すぐgit commit -m "こめんと"しておくとよいです．

## 書式
基本的にMarkdownです．  
テキスト中は装飾（強調，斜体，取り消し線），リンク，画像が使えます．  
改行（末尾のダブルスペース）は未対応です．ごめんなさい．改段落（ダブル改行）をおすすめします．

headerまわりには装飾など使わないでください．テキストオンリーで．  
予約語なので，headerの見出し名は変えない方がいいと思います．itemXも名前を変えない方がいいと思います．  
あとはお好きにできると思います．

## 動作環境
クロスプラットフォームだと思います．  
Windows 10 + Chrome 64 で確認．  
Mac + Safari でもいけそう．  

## ライセンスとか
MIT

一部，[markdown-to-pug](https://alexandremasy.github.io/markdown-to-pug/)をフォークして魔改造しています．
