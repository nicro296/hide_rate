function check_input(value){
    const regex = new RegExp(/^[0-9]{1,4}$/);
    if(value!=null && value!=''){
        return regex.test(value);
    }else{
        return false;
    }
}

function set_table_bl_hide_rate_rotation(){
    let td_bl_hide_rate = document.getElementById('td-bl-hide-rate-rotation');
    chrome.storage.local.get(['bl_hide_rate_rotation'], function(result){
        if(result.bl_hide_rate_rotation != null){
            if(result.bl_hide_rate_rotation){
                td_bl_hide_rate.textContent='有効';
            }else{
                td_bl_hide_rate.textContent='無効';
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate_rotation':false}, function(){});
            td_bl_hide_rate.textContent='無効';
        }
    });
}

function set_table_bl_hide_opponent_rate_rotation(){
    let tb_bl_hide_opponent_rate = document.getElementById('td-bl-hide-opponent-rate-rotation');
    chrome.storage.local.get(['bl_hide_opponent_rate_rotation'],function(result){
        if(result.bl_hide_opponent_rate_rotation != null){
            if(result.bl_hide_opponent_rate_rotation){
                tb_bl_hide_opponent_rate.textContent='双方';
            }else{
                tb_bl_hide_opponent_rate.textContent='自分のみ';
            }
        }else{
            chrome.storage.local.set({'bl_hide_opponent_rate_rotation':false}, function(){});
            tb_bl_hide_opponent_rate.textContent = '自分のみ';
        }
    });
}

function set_table_target_rate_rotation(){
    let td_target_rate = document.getElementById('td-target-rate-rotation');
    chrome.storage.local.get(['target_rate_rotation'], function(result){
        if(result.target_rate_rotation != null){
            td_target_rate.textContent=result.target_rate_rotation;
        }else{
            td_target_rate.textContent=0;
            chrome.storage.local.set({'target_rate_rotation':0},function(){});
        }
    });
}

function set_rotation(){
    set_table_bl_hide_rate_rotation();
    set_table_target_rate_rotation();
    set_table_bl_hide_opponent_rate_rotation();
}

function add_listener_rotation(){
    let button_switch_hide_rate_rotation = document.getElementById('switch-hide-rate-rotation');
    let button_switch_hide_opponent_rate_rotation = document.getElementById('switch-hide-opponent-rate-rotation');
    let input_rotation = document.getElementById('target-rate-rotation');
    let button_decision_target_rate_rotation = document.getElementById('decision-target-rate-rotation');

    button_switch_hide_rate_rotation.addEventListener('click',()=>{
        chrome.storage.local.get(['bl_hide_rate_rotation'], function(result){
            if(result.bl_hide_rate_rotation){
                chrome.storage.local.set({'bl_hide_rate_rotation':false}, function(){
                    set_table_bl_hide_rate_rotation();
                });
            }else{
                chrome.storage.local.set({'bl_hide_rate_rotation':true}, function(){
                    set_table_bl_hide_rate_rotation();
                });
            }
        });
    });

    button_switch_hide_opponent_rate_rotation.addEventListener('click',()=>{
        chrome.storage.local.get(['bl_hide_opponent_rate_rotation'], function(result){
            if(result.bl_hide_opponent_rate_rotation!=null){
                if(result.bl_hide_opponent_rate_rotation){
                    chrome.storage.local.set({'bl_hide_opponent_rate_rotation':false}, function(){
                        set_table_bl_hide_opponent_rate_rotation();
                    });
                }else{
                    chrome.storage.local.set({'bl_hide_opponent_rate_rotation':true}, function(){
                        set_table_bl_hide_opponent_rate_rotation();
                    });
                }
            }
        });
    });
    
    button_decision_target_rate_rotation.addEventListener('click',()=>{
        if(check_input(input_rotation.value)){
            console.log(input_rotation.value);
            chrome.storage.local.set({'target_rate_rotation':input_rotation.value}, function(){
                set_table_target_rate_rotation();
            });
        }else{
            console.log("条件違反"+input_rotation.value);
        }
    });
}


set_rotation();
add_listener_rotation();


