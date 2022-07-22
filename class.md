# Note about class and constructor function.

https://ja.javascript.info/class

https://ja.javascript.info/class-inheritance

## class syntaxとES5以前への変換

classは

```JavaScript
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

alert(typeof User); // function
```

constructorはまんまコンストラクタ関数であり、つまり以下と同じである

```JavaScript
const User = function(name) {
    this.name = name;
}
```

クラスメソッドも、内部的にはprototypeでUserに追加されています。

```JavaScript
// 先のsayHi()は以下と同じ
const User = function(name) {
    this.name = name;
}

User.prototype.sayHi = function() {
    alert(this.name);
}
```

あとはインスタンスを作る方法も出来上がる結果も同じになります

では、

classとコンストラクタ関数とそのプロトタイプメソッドは全く同じで、

ただのシンタックスシュガーなのでしょうか？

いいえ。重要な違いがあります。

1. class で生成された関数は特別な内部プロパティ [[IsClassConstructor]]: true でラベル付けされています。

そのため手動で作成するのと全く同じではない

class関数はそれ自体で呼び出すことはできない。

2. classは常に`use strict`である

3. classではﾎｲｽﾃｨﾝｸﾞが起こらない

#### クラスフィールドでバインドされたメソッドを作成する

クラスメソッドは明示的にthisを指定しないと、thisはメソッドの所属インスタンスを指さない

```JavaScript
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
```

上記はbutton.clickのthisがsetTimeoutのコンテキストになった。

通常関数のthisは呼出時にthisを指定しないとグローバルかundefinedになる。

これを解決する方法は２つ

1. コンストラクタでbindする

```JavaScript

class Button {
    constructor(value) {
        this.value = value;
        this.click = this.click.bind(this);
    }

    click() {
        console.log(this.value);
    }
}
```

2. アロー関数で書く

```JavaScript
class Button {
    constructor(value) {
        this.value = value;
    }

    click = () => {
        console.log(this.value);
    }
}
```

#### class サマリ

```JavaScript
class MyClass {
  prop = value; // プロパティ

  constructor(...) { // コンストラクタ
    // ...
  }

  method(...) {} // メソッド

  get something(...) {} // getter
  set something(...) {} // setter

  [Symbol.iterator]() {} // 計算された名前のメソッド (ここではシンボル)
  // ...
}
```