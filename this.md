# Note about `this`

-   this が何者か説明できるようになる。
-   グローバルな this
-   this を操作するメソッドも使えるようになる(apply, call, bind)。
-   arrow functin と this
-   class と this
-   実際の利用場面を想定して this をコントールする。

## 参考

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/this#%E9%96%A2%E9%80%A3%E6%83%85%E5%A0%B1

https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/

## `this`基礎

> ほとんどの場合、this の値はどのように関数が呼ばれたかによって決定されます (実行時結合)。これは実行時に代入によって設定することはできず、関数が呼び出されるたびに異なる可能性があります。ES5 では bind() メソッドが導入され、関数がどのように呼ばれたかに関係なく `this` の値を設定するすることができるようになり、ES2015 では、自身では this の結び付けを行わないアロー関数が導入されました (これは包含する構文上のコンテキストの this の値を保持します)。

#### strict モードでないとき

グローバルコンテキスト：グローバル・オブジェクトを指す。

関数コンテキスト： 関数の呼び出し方によって異なる。

-   this を指定しないと this はグローバルオブジェクトを指す

```JavaScript

// Window
console.log(this);
function hoge() {
    // Window
    console.log(this);
}
hoge();
```

#### strict モードの時

グローバルで呼び出されたならばグローバルオブジェクトを。

関数コンテキスト：

-   this を指定しないと`undefined`になる

```JavaScript

    'use strict';
    // Window
    console.log(this);
    function hoge() {
        'use strict';
        // undefined
        console.log(this);
    }

    hoge();
```

#### call()

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call

> call() はあるオブジェクトに所属する関数やメソッドを、別なオブジェクトに割り当てて呼び出すことができます。

> call() は関数やメソッドに this の新しい値を提供します。 call() によって、いったんメソッドを書いてから、新しいオブジェクトへメソッドを描き直さずに他のオブジェクトへと継承することができます。

ということで、

`call()`は関数の呼び出し時に call()で別のオブジェクトを指定すると、

その呼び出された関数の this がそのオブジェクトを指すようにできる代物である。

つまり、

自分のものでないものをあたかも自分のもののように呼び出すことができる。

```JavaScript
Function.prototype.call()

// 例：
// 呼び出したいもの.call(呼び出したい側のthis)
// ある関数.call(その関数のthisとして指定したいオブジェクト)
```

```JavaScript

    'use strict';
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }

    function Food(name, price) {
        // ProductをFoodに所属させた
        Product.call(this, name, price);
        this.category = 'food';
    }

    // Foodには存在しない`name`だけど、ProductをFoodのプロパティにしたからアクセスできるようになった
    console.log(new Food('cheese', 5).name); // "cheese"
    console.log(new Food('cheese', 5));

    // callを使用した、所属のない関数と、メソッドを持たないオブジェクトを組み合わせて呼び出す方法
    function greet() {
        const reply = [
            this.animal,
            'typically sleep between',
            this.sleepDuration,
        ].join(' ');
        console.log(reply);
    }

    const obj = {
        animal: 'cats',
        sleepDuration: '12 and 16 hours',
    };

    greet.call(obj); // cats typically sleep between 12 and 16 hours
```

#### まとめ

-   **基本的に「関数を呼び出したときに、this を『設定』しないと this はグローバル変数か undefined になる」**

関数の this は関数呼出時に指定すればその通りに、指定しなければ、strict モードでなければグローバルコンテキストの this と同じになり、strict モードなら undefined になる
