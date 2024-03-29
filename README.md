# hide_rate(β版)
<br>
ウェブサイト<a href="https://g-ratings.info/">Ratings for シャドウバース</a>、<a href="https://2pick.g-ratings.info/battle">2Pick Ratings for シャドウバース</a>でブラウザ上のプレイヤーのレート値を非表示にするためのgoogle chrome拡張ツールです。
目標レート値を設定することで到達するまで非表示にすることができます。
<br>
非表示対象はマッチング画面、対戦履歴画面の各対戦結果、マイページです。
<br><br>
<a href="https://github.com/nicro296/hide_rate/releases/tag/ver.1.0.9">こちらの最新ver</a>のzipファイルをダウンロード、解凍し以下のサイトなどを参考に拡張機能を有効にしてください。
<br>
https://note.affi-sapo-sv.com/chrome-extent-test.php#title2
<br>
<h3>非表示の例</h3>
<img width="320" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E9%9D%9E%E8%A1%A8%E7%A4%BA%E4%BE%8B1.png">

---

<img width="320" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E9%9D%9E%E8%A1%A8%E7%A4%BA%E4%BE%8B2.png">

```※システムの都合上マッチングページや対戦履歴ページでは画面描写よりも後に非表示処理が行われるため画面を凝視するとレート値が一瞬見えてしまう可能性があります。```

<h3>設定</h3><br>
表の右側が現在の設定。それぞれ入力枠とボタンで操作。<br>
<h6>1.非表示機能[on/off]</h6>
<h6>2.レート値非表示対象[自分のみ/双方]</h6>
<h6>3.目標レート値[半角数字4桁]</h6>
<br>
<img width="900" alt="オプション画面の画像" src="https://github.com/nicro296/hide_rate/blob/main/README-image/%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E7%94%BB%E9%9D%A2ver.2.png">
設定画面はブラウザ右上パズルのピースマーク → 三点マーク → オプション から
<img width="500" alt="オプションの開き方" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E9%96%8B%E3%81%8D%E6%96%B9.png">
値が設定されてない時は初期値として非表示機能「off」、非表示対象「自分のみ」、目標レート値「0」がセットされます。

<h3>目標レート達成通知</h3>
レート値が目標レートに到達した後、<b>BO3チェックインページ</b>または<b>マイページ</b>を読み込む際に以下のように通知が表示されます。
<br>
<ul>
    <li>アラート表示（OKを押す前に表示が消える場合がある不具合を確認済み）</li>
    <li>画像2枚目のように文章とボタンが表示されます。「はい」を選択するとレート値非表示が解除され、「いいえ」を押すまたはどちらも押さない場合レート値非表示(レート到達通知)が引き続き行われます。</li>
</ul>

```対戦相手の結果入力が済んでおらずレート値が更新される前にBO3チェックインページを開きそこから次の試合を行おうとした場合、目標レートに到達できている時の通知を受け取れません。対戦相手の結果入力を待ったのちにページを開いてください(または再読み込みしてください)。```

<img width="900" src="https://github.com/nicro296/hide_rate/blob/main/README-image/%E9%80%9A%E7%9F%A5%E4%BE%8B3.png">

---

<img width="900" src="https://github.com/nicro296/hide_rate/blob/main/README-image/%E9%80%9A%E7%9F%A5%E4%BE%8B4.png">
<br>
<h3>連絡先</h3>
<a href="https://twitter.com/nicro296">Twitter(@nicro296)</a>

<h3>把握している不具合・未対応部分(把握した日付)</h3>
・対戦相手より後に結果入力して退出しても、(サーバー側のレート値更新より先にレート値を読み込んでしまい?)再読み込みしないと目標レート到達メッセージが表示されない。(2022/6/2)
<br>
・チェックインページのアラート表示がOKをクリックしてないにも関わらず消える(画面内の別途表示で到達通知の把握は可能)。(2022/6/8)

<h3>更新について</h3>
・自動更新機能はありません。更新したい場合は最新バージョンのzipファイルをダウンロードして利用してください。古いものは削除してもらって構いません。
