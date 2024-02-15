const url_rotation = 'https://g-ratings.info/log';
const url_2Pick = 'https://2pick.g-ratings.info/log';
let div_app = document.getElementById('app');

const bl_hide_rate_rotation = 'bl_hide_rate_rotation';
const bl_hide_opponent_rate_rotation = 'bl_hide_opponent_rate_rotation';
const bl_hide_rate_2Pick = 'bl_hide_rate_2Pick';
const bl_hide_opponent_rate_2Pick = 'bl_hide_opponent_rate_2Pick';

let bl_hide_rate = bl_hide_rate_rotation;
let bl_hide_opponent_rate = bl_hide_opponent_rate_rotation;

if(location.href.indexOf(url_rotation) >-1){
    bl_hide_rate = bl_hide_rate_rotation;
    bl_hide_opponent_rate = bl_hide_opponent_rate_rotation;
    console.log('rotation');
}else if(location.href.indexOf(url_2Pick) >-1){
    bl_hide_rate = bl_hide_rate_2Pick;
    bl_hide_opponent_rate = bl_hide_opponent_rate_2Pick;
    console.log('2Pick');
}else{
    console.log('urlが識別できません。');
}

/**
 * 読み込みチェック
 * @returns {Boolean} 読み込みできているかどうか
 */
function check_load(){
    if(div_app.children == null) return false;
    if(div_app.children.length < 2) return false;
    let div0 = div_app.children[1];
    if(div0.children == null) return false;
    let div1 = div0.children[0];
    if(div1.children == null) return false;
    let div2 = div1.children[0];
    if(div2.children == null) return false;
    let div3 = div2.children[0];
    if(div3.children == null) return false;
    let div4 = div3.children[0];
    if(div4.children == null) return false;
    if(div4.children.length < 2) return false;
    return true;
}

function main(){
    chrome.storage.local.get([bl_hide_rate,bl_hide_opponent_rate],function(result){
        if(result[bl_hide_rate] != null){
            if(result[bl_hide_rate]){
                let count = 0;
                let jsInitCheckTimer = setInterval(jsLoaded, 200);
                function jsLoaded() {
                    count++;
                    if(count > 50){
                        clearInterval(jsInitCheckTimer);
                        console.log('errorlog[countover]');
                    }
                    if(check_load()){
                        clearInterval(jsInitCheckTimer);
                        let div5 = div_app.children[1].children[0].children[0].children[0].children[0].children[1];
                        if(div5.children!=null && div5.children.length>1){     
    
                            if(result[bl_hide_opponent_rate] != null){
                                if(result[bl_hide_opponent_rate]){
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
                                const bl_hide_opponent_rate_temp = {[bl_hide_opponent_rate]:false};
                                chrome.storage.local.set(('bl_hide_opponent_rate_temp',bl_hide_opponent_rate_temp),function(){});
                            }
            
                        }
                    }
                }
            }else{
            }
        }else{
            const bl_hide_rate_temp = {[bl_hide_rate]:false};
            chrome.storage.local.set(('bl_hide_rate_temp',bl_hide_rate_temp),function(){});
        }
    });
}


main();