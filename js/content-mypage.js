let div_app = document.getElementById('app');
const url_rotation = 'https://g-ratings.info/mypage';
const url_2Pick = 'https://2pick.g-ratings.info/mypage';

const child4_rotation = 8;
const bl_hide_rate_rotation = 'bl_hide_rate_rotation';
const target_rate_rotation = 'target_rate_rotation';

const child4_2Pick = 4;
const bl_hide_rate_2Pick = 'bl_hide_rate_2Pick';
const target_rate_2Pick = 'target_rate_2Pick';
let rate='';
let child4 = child4_rotation;
let bl_hide_rate = bl_hide_rate_rotation;
let target_rate = target_rate_rotation;

if(location.href == url_rotation){
    child4 = child4_rotation;
    bl_hide_rate = bl_hide_rate_rotation;
    console.log('rotation');
}else if(location.href == url_2Pick){
    child4 = child4_2Pick;
    bl_hide_rate = bl_hide_rate_2Pick;
    console.log('2Pick');
}else{
    console.log('urlが識別できません。');
}

/**
 * @type {boolean} アラート重複回避用
 */
let set_alert = false;

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
    let jsInitCheckTimer = setInterval(jsLoaded, 500);
    let div3 = div_app.children[1].children[0].children[0].children[0];
    function jsLoaded() {
        count++;
        if (check_load_rate(div3)) {
            clearInterval(jsInitCheckTimer);
            set_alert = false;

            //要素を取得する処理
            if(div3.children[child4].children[0].textContent.indexOf('レーティング')>-1){
                let word = div3.children[child4].children[0].children[1].textContent;
                rate = word.substring(0,word.indexOf('[RD')).trim();
                word = word.substring(word.indexOf('[RD'));
                if(parseFloat(target_rate) <= parseFloat(rate)){
                    chrome.storage.local.set({bl_hide_rate:false},function(){});
                    window.alert('目標レートに到達しました。レート値の非表示を解除します');
                }else{
                    word = '**** '+word;
                    div3.children[child4].children[0].children[1].textContent = word;
                }
            }
        }
        if(count>10){
            console.log('errorlog[countover]');
            clearInterval(jsInitCheckTimer);
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
                    chrome.storage.local.set({target_rate:0},function(){});
                }           
            }else{
            }
        }else{
            chrome.storage.local.set({bl_hide_rate:false},function(){});
        }
    });
}

function main(){
    let jsInitCheckTimer = setInterval(jsLoaded, 500);
    function jsLoaded(){
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

