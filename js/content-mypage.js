let div_app = document.getElementById('app');
const url_rotation = 'https://g-ratings.info/mypage';
const url_2Pick = 'https://2pick.g-ratings.info/mypage';

const child4_rotation = 7;
const bl_hide_rate_rotation = 'bl_hide_rate_rotation';
const target_rate_rotation = 'target_rate_rotation';

const child4_2Pick = 4;
const bl_hide_rate_2Pick = 'bl_hide_rate_2Pick';
const target_rate_2Pick = 'target_rate_2Pick';
let alert_display = false;
let rate='';
let child4 = child4_rotation;
let bl_hide_rate = bl_hide_rate_rotation;
let target_rate = target_rate_rotation;

if(location.href == url_rotation){
    child4 = child4_rotation;
    bl_hide_rate = bl_hide_rate_rotation;
    target_rate = target_rate_rotation;
    console.log('rotation');
}else if(location.href == url_2Pick){
    child4 = child4_2Pick;
    bl_hide_rate = bl_hide_rate_2Pick;
    target_rate = target_rate_2Pick;
    console.log('2Pick');
}else{
    console.log('urlが識別できません。');
}

/**
 * @type {boolean} アラート重複回避用
 */
let set_alert = false;

function display_alert(){
    if(alert_display){
        div_app.children[1].children[0].children[0].children[0].removeChild(div_app.children[1].children[0].children[0].children[0].children[0]);
    }else{
        child4++;
    }
    
    alert_display = true;
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
        const bl_hide_rate_temp = {[bl_hide_rate] : false};
        chrome.storage.local.set(('bl_hide_rate_temp',bl_hide_rate_temp),function(){});
        location.reload();
    });
    input_no.addEventListener('click',()=>{
        span_alert.textContent = '';
        div_input_container.removeChild(input_yes);
        div_input_container.removeChild(input_no);
        span_alert.append(document.createTextNode("目標レートに到達しました！(レート値非表示継続中)"));
    });
}

function check_load(){
    if(div_app.children == null) return false;
    if(div_app.children.length < 2) return false;
    let div0 = div_app.children[1];
    if(div0.children == null) return false;
    let div1 = div0.children[0];
    if(div1.children == null) return false;
    let div2 = div1.children[0];
    if(div2.children == null ) return false;
    return true;
}

function check_load_rate(div3){
    if(div3.children.length <= child4) return false;
    let div4 = div3.children[child4];
    if(div4.children == null) return false;
    let div5 = div4.children[0];
    if(div5.children == null) return false;
    if(div5.children.length < 2) return false;
    return true;
}

function check_rate(target_rate){
    let count = 0;//ループ処理の無限ケア用のカウント、
    let max_loop = 50;//ループ上限
    let jsInitCheckTimer = setInterval(jsLoaded, 200);
    let div3 = div_app.children[1].children[0].children[0].children[0];
    function jsLoaded() {
        count++;
        if(count > max_loop) {//ループ処理の強制離脱用
            console.log('errorlog[countover]');
            clearInterval(jsInitCheckTimer);
        }
        if(!check_load_rate(div3)) return;//ロードチェック
        clearInterval(jsInitCheckTimer);
        set_alert = false;

        let div5 = div3.children[child4].children[0];
        if(div5.textContent.indexOf('レーティング') < 0) return;
        let div6 = div5.children[1];
        //要素を取得する処理
        let word = div6.textContent;// 文字列 → XXXX [RD: XXX.X]
        rate = word.substring(0,word.indexOf('[RD')).trim();
        let rd_text = word.substring(word.indexOf('[RD'));
        div6.textContent = '**** '+ rd_text;
        if(rate == '****') return;
        if(parseFloat(target_rate) > parseFloat(rate)) return;
        window.alert('目標レートに到達しました。');
        display_alert();
    }
}

function hide_rate(){
    chrome.storage.local.get([bl_hide_rate,target_rate], function(result){
        if(result[bl_hide_rate] == null) {//非表示設定がnullの時、初期値false
            const bl_hide_rate_temp = {[bl_hide_rate]:false};
            chrome.storage.local.set(('bl_hide_rate_temp',bl_hide_rate_temp),function(){});
            return;
        }
        if(!result[bl_hide_rate]) return;//隠さない設定の時、処理無し
        if(result[target_rate] == null) {//目標レートがnullの時、初期値0
            const taret_rate_temp = {[target_rate]:0};
            chrome.storage.local.set(('taret_rate_temp',taret_rate_temp),function(){});
            return;
        }
        if(set_alert) return;//既にレート値を隠す処理を実行済み
        //レート値を隠す
        set_alert = true;
        check_rate(result[target_rate]);
    });
}

function main(){
    let count = 0;//ループ処理の無限ケア用のカウント
    let max_loop = 50;//ループ上限
    let jsInitCheckTimer = setInterval(jsLoaded, 200);
    function jsLoaded(){
        count++;
        if(count > max_loop){//ループ処理の強制離脱用
            console.log('errorlog[countover]');
            clearInterval(jsInitCheckTimer);
        }
        if(!check_load()) return;//ロードチェック
        clearInterval(jsInitCheckTimer);
        let div3 = div_app.children[1].children[0].children[0].children[0];

        hide_rate();
        
        //ページ内の再読み込み時に再度、非表示処理を行う
        let mo = new MutationObserver(function(){
            if(div3.children.length < child4) return;
            hide_rate();
        });
        let config ={childList: true};

        mo.observe(div3,config);
    }
}
main();

