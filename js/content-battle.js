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

function display_alert(){
    let div_panel_default = document.createElement("div");
    div_panel_default.classList.add("panel");
    div_panel_default.classList.add("panel-default");
    let div_panel_body = document.createElement("div");
    div_panel_body.classList.add("panel-body");
    let p_text_container = document.createElement("p");
    let span_alert = document.createElement("span");
    span_alert.classList.add("color-red");
    span_alert.style = "color:red;font-size:150%;";
    span_alert.append(document.createTextNode("目標レートに到達しました！レート値非表示を解除にしますか？"));
    let div_input_container = document.createElement("div");
    div_input_container.style.textAlign = "right";
    let input_yes = document.createElement("input");
    input_yes.type = "button";
    input_yes.style = "margin:0px 10px";
    input_yes.value = "はい";
    let input_no = document.createElement("input");
    input_no.type = "button";
    input_no.style = "margin:0px 10px";
    input_no.value = "いいえ";
    p_text_container.append(span_alert);
    div_input_container.append(input_yes);
    div_input_container.append(input_no);
    div_panel_body.append(p_text_container);
    div_panel_body.append(div_input_container);
    div_panel_default.append(div_panel_body);
    div_app.children[1].children[0].children[0].children[0].insertBefore(div_panel_default,div_app.children[1].children[0].children[0].children[0].firstChild);

    input_yes.addEventListener('click',()=>{
        span_alert.textContent = '';
        div_input_container.removeChild(input_yes);
        div_input_container.removeChild(input_no);
        span_alert.append(document.createTextNode("目標レートに到達しました！レート値非表示を解除します。"));
        chrome.storage.local.set({'bl_hide_rate_rotation':false},function(){});
    });
    input_no.addEventListener('click',()=>{
        span_alert.textContent = '';
        div_input_container.removeChild(input_yes);
        div_input_container.removeChild(input_no);
        span_alert.append(document.createTextNode("目標レートに到達しました！(レート値非表示継続中)"));
    });
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
                    display_alert();
                }
            }
        }
    }
}

function main(){
    //非表示が有効かの確認と目標レート値をこえているかの処理
    chrome.storage.local.get(['bl_hide_rate_rotation','bl_hide_opponent_rate_rotation','target_rate_rotation'],function(result){
        if(result.bl_hide_rate_rotation != null){
            if(result.bl_hide_rate_rotation){
                let jsInitCheckTimer = setInterval(jsLoaded, 100);
                function jsLoaded() {
                    if(check_load()){
                        clearInterval(jsInitCheckTimer);
                        let div5 = div_app.children[1].children[0].children[0].children[0].children[0].children[1];
                        
                        if(div5.children!= null && div5.children.length >1){//対戦ページチェック
            
                            if(result.bl_hide_opponent_rate_rotation != null){
                                if(result.bl_hide_opponent_rate_rotation){
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
                                chrome.storage.local.set({'bl_hide_opponent_rate_rotation':false},function(){});
                            }
            
                        }else{//対戦ページ以外の時
                            set_mypage();
                            if(result.target_rate_rotation != null){
                                window.addEventListener("load", check_rate(result.target_rate_rotation), false);
                            }else{
                                chrome.storage.local.set({'target_rate_rotation':0},function(){});
                            }
                        }
                    }
                }
                
            }else{
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate_rotation':false},function(){});
        }
    });
}

function final(){
    div_app.style.display = '';
}

main();
final();