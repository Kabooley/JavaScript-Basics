# Note MVC Pattern from Oddy Assami JavaScript Design Pattern

すでに実践したことがあるデザインパターンであるけれど
実力のある人が示すこのデザインパターンが何たるかを学んで
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

> MVC においてコントローラが果たす役割は、ビューに対する Strategy パターンの促進であることを覚えておいてください。
> Strategy パターンの観点では、ビューの裁量でコントローラに委ねることになります。つまり、Strategy パターンがどのように機能するかということです。ビューが適切と判断した場合、ビューはユーザーイベントの処理をコントローラに委ねることができます。ビューが適切と判断した場合、ビューはモデルチェンジイベントの処理をコントローラに委ねることができますが、これはコントローラの伝統的な役割ではありません。

つまり Controller は常に View で起こったことをすべて Model へ反映させることが本業ではない
その裁量は View 次第である

#### What does MVC give us?

MVC における関心事の分離は、アプリケーションの機能をよりシンプルにモジュール化することを可能にします。

- 全体的なメンテナンスが容易になる。
  アプリケーションの更新が必要になったとき、その変更がデータ中心のものであるのか、つまりモデルや場合によってはコントローラへの変更であるのか、それとも単に視覚的なものであるのかが明確になります。
- モデルとビューを切り離すことで、ビジネスロジックのユニットテストをより簡単に書くことができます。
- 低レベルのモデルとコントローラのコードの重複（例：代わりに使用していたコード）がアプリケーション全体で排除されます。
  アプリケーションの規模や役割分担によっては、このモジュール化により、コアロジックを担当する開発者とユーザーインターフェースを担当する開発者が同時に作業できるようになります。

> GoF では、MVC をデザインパターンとは呼ばず、ユーザーインターフェースを構築するためのクラス群と考えている。
> 彼らの見解では、MVC は Observer パターン、Strategy パターン、Composite パターンという 3 つの古典的なデザインパターンのバリエーションとなっています。

> これまで述べてきたように、モデルはアプリケーションデータを表し、ビューはユーザーに画面を見せるものです。そのため、MVC ではコアなコミュニケーションの一部を Observer パターンに依存しています（意外にも MVC パターンに関する記事ではあまり取り上げられていないことです）。モデルが変更されると、オブザーバー（View）に何かが更新されたことを通知しますが、これはおそらく MVC で最も重要な関係です。この関係のオブザーバーとしての性質は、同じモデルに複数のビューをアタッチすることを可能にしています。

> MVC の非結合性についてもっと知りたいと思っている開発者にとって、このパターンの目的の一つは、トピック（データオブジェクト）とそのオブザーバーの間の一対多の関係を定義することです。トピックが変更されると、そのオブザーバーも更新されます。ビューとコントローラの関係は少し異なります。コントローラーは、ビューがさまざまなユーザーの入力に対応できるようにするもので、Strategy パターンの一例です。
