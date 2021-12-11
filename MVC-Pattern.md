# Note MVC Pattern from Oddy Assami JavaScript Design Pattern

すでに実践したことがあるデザインパターンであるけれど
実力のある人が示すこのデザインパターンを学んで
誤解がないようにするのと
各パーツがどうかかわりあうのがいいのか
そのベスト・プラクティスを学ぶ

## MVC pattern

Observer Pattern がすでに取り込まれていた
ビジネスロジック：Model
サード・コンポーネント：Controller
ユーザインタフェイス：View

#### Models

**Model はビジネスデータが関心ごとである**

Model は Application のデータを管理する

> これらは、ユーザーインターフェースやプレゼンテーション層とは関係なく、アプリケーションが必要とする独自のデータ形式を表しています。

もしも Model が変更されたらその変更は Observers へ通知される

> 最近の MVC/MV\*フレームワークでは、モデルをグループ化する手段を提供することが珍しくありません
> （例えば、Backbone では、これらのグループは「コレクション」と呼ばれています）。
> モデルをグループで管理することで、グループに含まれるモデルが変更されたときに、グループからの通知に基づいてアプリケーションロジックを書くことができます。これにより、個々のモデルインスタンスを手動で観察する必要がなくなります。

#### Views

View は現在の`state`を、`Model`をフィルタリングして表現した目に見える部分のことである

ユーザインタフェイスを提供する（実際の更新は Controller の仕事であるが）

View は Model を監視する

なので View は Model の変化通知に応じて自身を変更する

sample:

```JavaScript
var buildPhotoView = function ( photoModel, photoController ) {

  var base = document.createElement( "div" ),
      photoEl = document.createElement( "div" );

  base.appendChild(photoEl);

  var render = function () {
          // We use a templating library such as Underscore
          // templating which generates the HTML for our
          // photo entry
          photoEl.innerHTML = _.template( "#photoTemplate", {
              src: photoModel.getSrc()
          });
      };

//  Observer Patternな部分として
//  Modelへサブスクライブしている
  photoModel.addSubscriber( render );

  photoEl.addEventListener( "click", function () {
    photoController.handleEvent( "click", photoModel );
  });

  var show = function () {
    photoEl.style.display = "";
  };

  var hide = function () {
    photoEl.style.display = "none";
  };

  return {
    showView: show,
    hideView: hide
  };

};
```

- View は Model を Subscribe する
- View はユーザインタフェイスとしてイベントリスナを扱う
  よびだすのは Controller のメソッドになる
- html template をハードコーディングするとパフォーマンスに非常に影響する
  だから動的にロードする方法をとりましょう

- きれいなモデルときれいなテンプレートを維持することだけを考えればよい

View は template のことではない
**View は Model を常に監視してその変更を再現するオブジェクトである**

#### Controllers

Controllers は、
古くよりユーザが View を操作したら即座に Model を更新する責任を持つ
View と Model の中間に立つ存在である

> MVC においてコントローラが果たす役割は、ビューに対する Strategy パターンの促進であることを覚えておいてください。Strategy パターンの観点では、ビューの裁量でコントローラに委ねることになります。つまり、Strategy パターンがどのように機能するかということです。ビューが適切と判断した場合、ビューはユーザーイベントの処理をコントローラに委ねることができます。ビューが適切と判断した場合、ビューはモデルチェンジイベントの処理をコントローラに委ねることができますが、これはコントローラの伝統的な役割ではありません。
