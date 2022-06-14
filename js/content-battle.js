let div_app = document.getElementById('app');
const url_rotation = 'https://g-ratings.info/battle';
const url_2Pick = 'https://2pick.g-ratings.info/battle';

const rotation = {
    url_mypage:'https://g-ratings.info/mypage',
    child4:8,
    bl_hide_rate:'bl_hide_rate_rotation',
    bl_hide_opponent_rate:'bl_hide_opponent_rate_rotation',
    target_rate:'target_rate_rotation'
};

const _2Pick = {
    url_mypage:'https://2Pick.g-ratings.info/mypage',
    child4:4,
    bl_hide_rate:'bl_hide_rate_2Pick',
    bl_hide_opponent_rate:'bl_hide_opponent_rate_2Pick',
    target_rate:'target_rate_2Pick'
};

let format = rotation;

if(location.href.indexOf(url_rotation) >-1){
    format = rotation;
    console.log('rotation');
}else if(location.href.indexOf(url_2Pick) >-1){
    format = _2Pick;
    console.log('2Pick');
}else{
    console.log('urlが識別できません。');
}



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
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children.length > format.child4
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[format.child4].children != null
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[format.child4].children[0].children != null
        && iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[format.child4].children[0].children.length >= 2) {
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
    iframe.src = format.url_mypage;
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
        const bl_hide_rate_temp = {[format.bl_hide_rate]:false};
        chrome.storage.local.set(('bl_hide_rate_temp',bl_hide_rate_temp),function(){});
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
    let count = 0;
    let rate;
    let jsInitCheckTimer = setInterval(jsLoaded, 200);//（iframe読み込み待ち用）
    function jsLoaded() {
        count++;
        if(count>50){
            console.log('errorlog[countover]');
            clearInterval(jsInitCheckTimer);
        }
        const iframe1 = document.getElementById("reading-rate");
        if (check_load_iframe(iframe1)) {
            clearInterval(jsInitCheckTimer);
            if(iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[format.child4].children[0].textContent.indexOf('レーティング')>-1){
                let word = iframe1.contentWindow.document.getElementById('app').children[1].children[0].children[0].children[0].children[format.child4].children[0].children[1].textContent;
                rate = word.substring(0,word.indexOf('[RD')).trim();
                if(parseFloat(rate) >= parseFloat(target_rate)){
                    window.alert('目標レートに到達しました。');
                    display_alert();
                }
            }
        }
    }
}

function main(){
    //非表示が有効かの確認と目標レート値をこえているかの処理
    let count = 0;
    chrome.storage.local.get([format.bl_hide_rate,format.bl_hide_opponent_rate,format.target_rate],function(result){
        if(result[format.bl_hide_rate] != null){
            if(result[format.bl_hide_rate]){
                let jsInitCheckTimer = setInterval(jsLoaded, 200);
                function jsLoaded() {
                    count++;
                    if(count>50){
                        console.log('errorlog[countover]');
                        clearInterval(jsInitCheckTimer);
                    }
                    if(check_load()){
                        clearInterval(jsInitCheckTimer);
                        let div5 = div_app.children[1].children[0].children[0].children[0].children[0].children[1];
                        
                        if(div5.children!= null && div5.children.length >1){//対戦ページチェック
            
                            if(result[format.bl_hide_opponent_rate] != null){
                                if(result[format.bl_hide_opponent_rate]){
                                    div5.children[1].children[0].children[0].textContent = '**** pt';
                                    div5.children[1].children[1].children[0].textContent = '**** pt';
                                }else{
                                    if(div5.children[0].children[0].children[0].textContent == 'あなた'){
                                        div5.children[1].children[0].children[0].textContent = '**** pt';
                                    }else if(div5.children[0].children[1].children[0].textContent == 'あなた'){
                                        div5.children[1].children[1].children[0].textContent = '**** pt';
                                    }
                                }
                            }else{
                                const bl_hide_opponent_rate_temp = {[format.bl_hide_opponent_rate]:false};
                                chrome.storage.local.set(('bl_hide_opponent_rate_temp',bl_hide_opponent_rate_temp),function(){});
                            }
            
                        }else{//対戦ページ以外の時
                            set_mypage();
                            if(result[format.target_rate] != null){
                                check_rate(result[format.target_rate]);
                            }else{
                                const target_rate_temp = {[format.target_rate]:0};
                                chrome.storage.local.set(('target_rate_temp',target_rate_temp),function(){});
                            }
                        }
                    }
                }
                
            }else{
            }
        }else{
            const bl_hide_rate_temp = {[format.bl_hide_rate]:false};
            chrome.storage.local.set(('bl_hide_rate_temp',bl_hide_rate_temp),function(){});
        }
    });
}

main();