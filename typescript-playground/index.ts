
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
