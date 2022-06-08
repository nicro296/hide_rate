const effective = '有効',ineffective = '無効';
const onlyme = '自分のみ',eachother = '双方';

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
                td_bl_hide_rate.textContent = effective;
            }else{
                td_bl_hide_rate.textContent = ineffective;
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate_rotation':false}, function(){});
            td_bl_hide_rate.textContent = ineffective;
        }
    });
}

function set_table_bl_hide_opponent_rate_rotation(){
    let tb_bl_hide_opponent_rate = document.getElementById('td-bl-hide-opponent-rate-rotation');
    chrome.storage.local.get(['bl_hide_opponent_rate_rotation'],function(result){
        if(result.bl_hide_opponent_rate_rotation != null){
            if(result.bl_hide_opponent_rate_rotation){
                tb_bl_hide_opponent_rate.textContent = eachother;
            }else{
                tb_bl_hide_opponent_rate.textContent = onlyme;
            }
        }else{
            chrome.storage.local.set({'bl_hide_opponent_rate_rotation':false}, function(){});
            tb_bl_hide_opponent_rate.textContent = onlyme;
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

function add_listener_for_option_rotation(){
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

function set_table_bl_hide_rate_2Pick(){
    let td_bl_hide_rate_2Pick = document.getElementById('td-bl-hide-rate-2Pick');
    chrome.storage.local.get(['bl_hide_rate_2Pick'], function(result){
        if(result.bl_hide_rate_2Pick != null){
            if(result.bl_hide_rate_2Pick){
                td_bl_hide_rate_2Pick.textContent = effective;
            }else{
                td_bl_hide_rate_2Pick.textContent = ineffective;
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate_2Pick':false}, function(){});
            td_bl_hide_rate_2Pick.textContent = ineffective;
        }
    });
}

function set_table_bl_hide_opponent_rate_2Pick(){
    const tb_bl_hide_opponent_rate_2Pick = document.getElementById('td-bl-hide-opponent-rate-2Pick');
    chrome.storage.local.get(['bl_hide_opponent_rate_2Pick'], function(result){
        if(result.bl_hide_opponent_rate_2Pick != null){
            if(result.bl_hide_opponent_rate_2Pick){
                tb_bl_hide_opponent_rate_2Pick.textContent = eachother;
            }else{
                tb_bl_hide_opponent_rate_2Pick.textContent = onlyme;
            }
        }else{
            chrome.storage.local.set({'bl_hide_opponent_rate_2Pick':false}, function(){});
            tb_bl_hide_opponent_rate_2Pick.textContent = onlyme;
        }
    });
}

function set_table_target_rate_2Pick(){
    let td_target_rate_2Pick = document.getElementById('td-target-rate-2Pick');
    chrome.storage.local.get(['target_rate_2Pick'], function(result){
        if(result.target_rate_2Pick != null){
            td_target_rate_2Pick.textContent = result.target_rate_2Pick;
        }else{
            td_target_rate_2Pick.textContent = 0;
            chrome.storage.local.set({'target_rate_2Pick':0},function(){});
        }
    });
}

function set_2Pick(){
    this.set_table_bl_hide_rate_2Pick();
    this.set_table_bl_hide_opponent_rate_2Pick();
    this.set_table_target_rate_2Pick();
}

function add_listener_for_option_2Pick(){
    const button_switch_hide_rate_2Pick = document.getElementById('switch-hide-rate-2Pick');
    const burton_switch_hide_opponent_rate_2Pick = document.getElementById('switch-hide-opponent-rate-2Pick');
    const input_2Pick = document.getElementById('target-rate-2Pick');
    const button_target_rate_2Pick = document.getElementById('decision-target-rate-2Pick');

    button_switch_hide_rate_2Pick.addEventListener('click',()=>{
        chrome.storage.local.get(['bl_hide_rate_2Pick'], function(result){
            if(result.bl_hide_rate_2Pick){
                chrome.storage.local.set({'bl_hide_rate_2Pick':false}, function(){
                    set_table_bl_hide_rate_2Pick();
                });
            }else{
                chrome.storage.local.set({'bl_hide_rate_2Pick':true}, function(){
                    set_table_bl_hide_rate_2Pick();
                });
            }
        });
    });

    burton_switch_hide_opponent_rate_2Pick.addEventListener('click',()=>{
        chrome.storage.local.get(['bl_hide_opponent_rate_2Pick'], function(result){
            if(result.bl_hide_opponent_rate_2Pick!=null){
                if(result.bl_hide_opponent_rate_2Pick){
                    chrome.storage.local.set({'bl_hide_opponent_rate_2Pick':false}, function(){
                        set_table_bl_hide_opponent_rate_2Pick();
                    });
                }else{
                    chrome.storage.local.set({'bl_hide_opponent_rate_2Pick':true}, function(){
                        set_table_bl_hide_opponent_rate_2Pick();
                    });
                }
            }
        });
    });

    button_target_rate_2Pick.addEventListener('click',()=>{
        if(check_input(input_2Pick.value)){
            chrome.storage.local.set({'target_rate_2Pick':input_2Pick.value}, function(){
                set_table_target_rate_2Pick();
            });
        }else{
            console.log("条件違反["+input_2Pick.value+"]");
        }
    });

}

function add_listener_for_tab(){
    const tab_rotation = document.getElementById("tab-rotation");
    const div_option_rotation = document.getElementById("option-rotation");
    const tab_2Pick = document.getElementById("tab-2Pick");
    const div_option_2Pick = document.getElementById("option-2Pick");
    tab_rotation.children[0].addEventListener("click",()=>{
        tab_rotation.classList.add("active");
        tab_2Pick.classList.remove("active");
        div_option_rotation.classList.remove("display-none");
        div_option_2Pick.classList.add("display-none");
    });
    
    tab_2Pick.children[0].addEventListener("click",()=>{
        tab_rotation.classList.remove("active");
        tab_2Pick.classList.add("active");
        div_option_rotation.classList.add("display-none");
        div_option_2Pick.classList.remove("display-none");
    });
}



this.set_rotation();
this.set_2Pick();
this.add_listener_for_tab();
this.add_listener_for_option_2Pick();
this.add_listener_for_option_rotation();


