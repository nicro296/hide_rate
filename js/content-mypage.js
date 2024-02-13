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
    if(div_app.children != null
        && div_app.children.length >= 2
        && div_app.children[1].children != null
        && div_app.children[1].children[0].children != null
        && div_app.children[1].children[0].children[0].children != null ){
        return true;
    }else{
        return false;
    }
}

function check_load_rate(div3){
    if(div3.children.length > child4
        && div3.children[child4].children != null
        && div3.children[child4].children[0].children != null
        && div3.children[child4].children[0].children.length >=2){
        return true;
    }else{
        return false;
    }
}

function check_rate(target_rate){
    let count = 0;
    let jsInitCheckTimer = setInterval(jsLoaded, 200);
    let div3 = div_app.children[1].children[0].children[0].children[0];
    function jsLoaded() {
        count++;
        if(count>50){
            console.log('errorlog[countover]');
            clearInterval(jsInitCheckTimer);
        }
        if (check_load_rate(div3)) {
            clearInterval(jsInitCheckTimer);
            set_alert = false;

            //要素を取得する処理
            if(div3.children[child4].children[0].textContent.indexOf('レーティング')>-1){
                let word = div3.children[child4].children[0].children[1].textContent;
                rate = word.substring(0,word.indexOf('[RD')).trim();
                word = word.substring(word.indexOf('[RD'));
                word = '**** '+word;
                div3.children[child4].children[0].children[1].textContent = word;
                if(rate == '****'){
                }else if(parseFloat(target_rate) <= parseFloat(rate)){
                    window.alert('目標レートに到達しました。');
                    display_alert();
                }else{
                }
            }
        }
    }
}

function hide_rate(){
    chrome.storage.local.get([bl_hide_rate,target_rate], function(result){
        if(result[bl_hide_rate]!= null){
            if(result[bl_hide_rate]){
                if(result[target_rate]!=null|| result[target_rate]==0){
                    if(set_alert){

                    }else{
                        set_alert = true;
                        check_rate(result[target_rate]);
                    }
                }else{
                    const taret_rate_temp = {[target_rate]:0};
                    chrome.storage.local.set(('taret_rate_temp',taret_rate_temp),function(){});
                }
            }else{
            }
        }else{
            const bl_hide_rate_temp = {[bl_hide_rate]:false};
            chrome.storage.local.set(('bl_hide_rate_temp',bl_hide_rate_temp),function(){});
        }
    });
}

function main(){
    let count=0;
    let jsInitCheckTimer = setInterval(jsLoaded, 200);
    function jsLoaded(){
        count++;
        if(count>50){
            console.log('errorlog[countover]');
            clearInterval(jsInitCheckTimer);
        }
        if(check_load()){
            clearInterval(jsInitCheckTimer);
            let div3 = div_app.children[1].children[0].children[0].children[0];

            hide_rate();
            
            let mo = new MutationObserver(function(){
                if(div3.children.length>=child4){
                    hide_rate();
                }
            });
            let config ={childList: true};
            
            mo.observe(div3,config);
        }
    }
}
main();

