let div_app = document.getElementById('app');
div_app.style.display = 'none';

function check_load(){
    if(div_app.children!=null 
        && div_app.children.length >= 2
        && div_app.children[1].children != null
        && div_app.children[1].children[0].children != null
        && div_app.children[1].children[0].children[0].children != null
        && div_app.children[1].children[0].children[0].children[0].children != null
        && div_app.children[1].children[0].children[0].children[0].children[0].children != null
        && div_app.children[1].children[0].children[0].children[0].children[0].children.length >= 2){
        return true;
    }else{
        return false;
    }
}

function check_load_iframe(iframe1){
    if (iframe1 != null 
        && iframe1.contentWindow != null
        && iframe1.contentWindow.document != null
        && iframe1.contentWindow.document.getElementById('app') != null
        && iframe1.contentWindow.document.getElementById('app').children != null
        && iframe1.contentWindow.document.getElementById('app').children.length >= 2
        && iframe1.contentWindow.document.getElementById('app').children[1].children != null
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children != null
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children != null 
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children != null 
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children.length >= 9 
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[8].children != null
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[8].children[0].children != null
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[8].children[0].children.length >= 2) {
        return true;
    }else{
        return false;
    }
    
}

/**
 * レート値を取得するためにマイページ( https://g-ratings.info/mypage )をiframeタグで挿入して読み込ませる。
 */
function set_mypage(){
    let div_insert = document.createElement('div');
    let iframe = document.createElement('iframe');
    iframe.id = 'reading-rate';
    iframe.src = 'https://g-ratings.info/mypage';
    iframe.width = 0;
    iframe.height = 0;
    div_insert.appendChild(iframe);
    document.body.appendChild(div_insert);
}

/**
 * 目標レート値を超えているかの判別と超えている時の処理
 * @param {int} target_rate 目標レート値 
 */
function check_rate(target_rate){
    let rate;
    let jsInitCheckTimer = setInterval(jsLoaded, 500);//（iframe読み込み待ち用）
    function jsLoaded() {
        const iframe1 = document.getElementById("reading-rate");
        if (check_load_iframe(iframe1)) {
            clearInterval(jsInitCheckTimer);
            if(iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[8].children[0].textContent.indexOf('レーティング')>-1){
                rate = iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[8].children[0].children[1].textContent.substring(0,4).trim();
                if(rate >= target_rate){
                    chrome.storage.local.set({'bl_hide_rate':false},function(){});
                    window.alert('目標レートに到達しました。レート値の非表示を解除します');
                }
            }
        }
    }
}

function main(){
    //非表示が有効かの確認と目標レート値をこえているかの処理
    chrome.storage.local.get(['bl_hide_rate','bl_hide_opponent_rate','target_rate'],function(result){
        if(result.bl_hide_rate != null){
            if(result.bl_hide_rate){
                let jsInitCheckTimer = setInterval(jsLoaded, 100);
                function jsLoaded() {
                    if(check_load()){
                        clearInterval(jsInitCheckTimer);
                        let div5 = div_app.children[1].children[0].children[0].children[0].children[0].children[1];
                        
                        if(div5.children!= null && div5.children.length >1){//対戦ページチェック
            
                            if(result.bl_hide_opponent_rate != null){
                                if(result.bl_hide_opponent_rate){
                                    div5.children[1].children[0].children[0].textContent = '**** pt';
                                    div5.children[1].children[1].children[0].textContent = '**** pt';
                                    div_app.style.display = '';
                                }else{
                                    if(div5.children[0].children[0].children[0].textContent == 'あなた'){
                                        div5.children[1].children[0].children[0].textContent = '**** pt';
                                        div_app.style.display = '';
                                    }else if(div5.children[0].children[1].children[0].textContent == 'あなた'){
                                        div5.children[1].children[1].children[0].textContent = '**** pt';
                                        div_app.style.display = '';
                                    }
                                }
                            }else{
                                chrome.storage.local.set({'bl_hide_opponent_rate':false},function(){});
                            }
            
                        }else{//対戦ページ以外の時
                            set_mypage();
                            if(result.target_rate != null){
                                document.addEventListener("readystatechange", check_rate(result.target_rate), false);
                            }else{
                                chrome.storage.local.set({'target_rate':0},function(){});
                            }
                        }
                    }
                }
                
            }else{
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate':false},function(){});
        }
    });
}

function final(){
    div_app.style.display = '';
}

main();
final();