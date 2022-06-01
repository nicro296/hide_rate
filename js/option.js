
let input = document.getElementById('target-rate');
let btn_dtr = document.getElementById('decision-target-rate');
let btn_shr = document.getElementById('switch-hide-rate');
let btn_shor = document.getElementById('switch-hide-opponent-rate');

function set_table_bl_hide_rate(){
    let td_bl_hide_rate = document.getElementById('td-bl-hide-rate');

    chrome.storage.local.get(['bl_hide_rate'], function(result){
        if(result.bl_hide_rate != null){
            if(result.bl_hide_rate){
                td_bl_hide_rate.textContent='有効';
            }else{
                td_bl_hide_rate.textContent='無効';
            }

        }else{
            chrome.storage.local.set({'bl_hide_rate':false}, function(){
                console.log('Value is set to ' + false);
            });
            td_bl_hide_rate.textContent='無効';
        }
    });
}

function set_table_bl_hide_opponent_rate(){
    let tb_bl_hide_opponent_rate = document.getElementById('td-bl-hide-opponent-rate');
    chrome.storage.local.get(['bl_hide_opponent_rate'],function(result){
        if(result.bl_hide_opponent_rate != null){
            if(result.bl_hide_opponent_rate){
                tb_bl_hide_opponent_rate.textContent='有効';
            }else{
                tb_bl_hide_opponent_rate.textContent='無効';
            }
        }else{
            chrome.storage.local.set({'':false}, function(){});
            tb_bl_hide_opponent_rate.textContent = '無効';
        }
    });
}

function set_table_target_rate(){
    let td_target_rate = document.getElementById('td-target-rate');
    
    chrome.storage.local.get(['target_rate'], function(result){
        if(result.target_rate != null){
            td_target_rate.textContent=result.target_rate;
        }else{
            td_target_rate.textContent='未設定';
        }
    });
}


function check_input(value){
    const regex = new RegExp(/^[0-9]{1,4}$/);
    if(value!=null && value!=''){
        return regex.test(value);
    }else{
        return false;
    }
}

set_table_bl_hide_rate();
set_table_target_rate();
set_table_bl_hide_opponent_rate();

btn_dtr.addEventListener('click',()=>{
    if(check_input(input.value)){
        console.log(input.value);
        chrome.storage.local.set({'target_rate':input.value}, function(){
            console.log('target_rate is set to'+input.value);
            set_table_target_rate();
        });
    }else{
        console.log("条件違反"+input.value);
    }
});

btn_shr.addEventListener('click',()=>{
    chrome.storage.local.get(['bl_hide_rate'], function(result){
        if(result.bl_hide_rate){
            chrome.storage.local.set({'bl_hide_rate':false}, function(){
                set_table_bl_hide_rate();
            });
        }else{
            chrome.storage.local.set({'bl_hide_rate':true}, function(){
                set_table_bl_hide_rate();
            });
        }
    });
});

btn_shor.addEventListener('click',()=>{
    chrome.storage.local.get(['bl_hide_opponent_rate'], function(result){
        if(result.bl_hide_opponent_rate){
            chrome.storage.local.set({'bl_hide_opponent_rate':false}, function(){
                set_table_bl_hide_opponent_rate();
            });
        }else{
            chrome.storage.local.set({'bl_hide_opponent_rate':true}, function(){
                set_table_bl_hide_opponent_rate();
            });
        }
    });
});
