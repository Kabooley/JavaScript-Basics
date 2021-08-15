# Asynchronous JavaScript


### Blocking Code

blocking : 一つの順番でしか処理できないJSにとって、時間がかかる処理がはさまれると次の処理へ移れない。これにより引き起こされる処理の中断をブロッキングと呼ぶ


### JS is single-threaded

JSは一つの順番で処理をする
JSは一度に一つのことしかできないよ
main-threadとよばれるスレッドが処理をする


### Async Callbacks

callback style is old;


### Promise

fetch() API is a modern, more efficient version of XMLHttpRequest.

fetch() is like axois which is a thirdparty library of react.

.then() : invoke callback if the fetch request is successfully completed.
and then() recieves result of interrupt.

.catch() : invoked when it occured  error or fail.
JSのtry...catchﾒｿｯﾄﾞはPromiseでは機能しないので注意



### event queueの話

Visualized JavaScriptのエントリで話していたね

JSコードのメソッドが非同期の場合、
現在のメソッドを実行するキューが空になったら実行される


### Promise vs Callback

Promiseはcallbackよりもアドバンテージがたくさんある
Promiseを使いましょう


### Copperative asynchronous JS
### Handling async operations gracefully with Promise
### Making asynchronous programming easier with async and await
### Choosing right approach
