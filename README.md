# hide_rate(β版)
Ver.1.0.2(最終更新 2022/6/2 23:47)
<br>
ウェブサイト[Ratings for シャドウバース](https://g-ratings.info/)でブラウザ上のプレイヤーのレート値を非表示にするためのgoogle chrome拡張ツールです。
目標レート値を設定することで到達するまで非表示にすることができます。非表示対象はマッチング画面、対戦履歴画面の各対戦結果、マイページです。
<br><br>
利用準備としてCode->download zipを押してzipファイルをダウンロード、解凍し以下のサイトなどを参考に拡張機能を有効にしてください。
<br>
https://note.affi-sapo-sv.com/chrome-extent-test.php#title2
<br>
<h3>非表示の例</h3>
<img width="320" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E9%9D%9E%E8%A1%A8%E7%A4%BA%E4%BE%8B1.png">
<img width="320" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E9%9D%9E%E8%A1%A8%E7%A4%BA%E4%BE%8B2.png">
※システムの都合上マッチングページや対戦履歴ページでは画面描写よりも後に非表示処理が行われるため画面を凝視するとレート値が一瞬見えてしまう可能性があります。
<h3>設定</h3><br>
表の右側が現在の設定。それぞれ入力枠とボタンで操作。<br>
<h6>1.非表示機能[on/off]</h6>
<h6>2.レート値非表示対象[自分のみ/双方]</h6>
<h6>3.目標レート値[半角数字4桁]</h6>
<br>
<img width="900" alt="オプション画面の画像" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E7%94%BB%E9%9D%A2.png">
設定画面はブラウザ右上パズルのピースマーク → 三点マーク → オプション から
<img width="500" alt="オプションの開き方" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E9%96%8B%E3%81%8D%E6%96%B9.png">
値が設定されてない時は初期値として非表示機能「off」、非表示対象「自分のみ」、目標レート値「0」がセットされます。

<h3>目標レート達成通知</h3>
レート値が目標レートに到達した後、BO3チェックインページまたはマイページを読み込む際に以下のように通知が表示されます。<br>
対戦相手の結果入力が済んでおらずレート値が更新される前にBO3チェックインページを開きそこから次の試合を行おうとした場合、目標レートに到達できている時の通知を受け取れません。対戦相手の結果入力を待ったのちにページを開いてください(または再読み込みしてください)。
<img width="900" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E9%80%9A%E7%9F%A5%E4%BE%8B1.png">
<img width="900" src="https://raw.githubusercontent.com/nicro296/hide_rate/main/README-image/%E9%80%9A%E7%9F%A5%E4%BE%8B2.png">
<br>
<h3>連絡先</h3>
<a href="https://twitter.com/nicro296">Twitter(@nicro296)</a>

<h3>把握している不具合・未対応部分(把握した日付)</h3>
・対戦相手より後に結果入力して退出しても、(サーバー側のレート値更新より先にレート値を読み込んでしまい)再読み込みしないと目標レート到達メッセージが表示されない。(2022/6/2)

<h3>修正箇所</h3>
<h5>Ver.1.0.2</h5>
・マイページで登録デッキなどの編集ボタンを押して、また元の表示に戻った際でもレートの非表示が行われるように加筆。
・Ratingsのサイトより先に設定画面を最初に開いた時（非表示対象の初期値がセットされず）ボタンが効かなかった不具合を解消。
