game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"封神演义",content:function (config, pack) {
        // CharacterConfig.openUI()
    },precontent:function () {
            const extension = "封神演义"
            const basePath = `extension/${extension}/resources/`
            function loadJs(path) {//引入js
                let script = document.createElement('script')
                script.src = path
                document.querySelector('head').appendChild(script)
            }
            function loadCss(path) {//引入css
                let link = document.createElement('link')
                link.rel = "stylesheet"
                link.href = path
                document.querySelector('head').appendChild(link)
            }

            game.getFileList(basePath + 'js', (e, list) => {
                for (let path of list) {
                    loadJs(basePath + 'js/' + path)
                }
            })
            game.getFileList(basePath + 'css', (e, list) => {
                for (let path of list) {
                    loadCss(basePath + 'css/' + path)
                }
            })

        },help:{},config:{"option_text":{"name":"<div class=\"caption\">拓展功能</div>","clear":true,"nopointer":true},"skillConfig":{"name":"<a href='javascript:;' class='btn-config' onclick=\"CharacterConfig.openUI()\"><b>技能配置</b><i class='iconfont icon-arrow-circle-right'></i></a>","clear":true,"nopointer":true},"github":{"name":"<a target='_blank' href='https://github.com/3527231/The-Canonization-of-the-Gods' class='btn-config'><b>GitHub</b><i class='iconfont icon-github'></i></a>","clear":true,"nopointer":true}},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
            test:{
                trigger:{
                    player:"useSkillEnd",
                },
                frequent:true,
                content:function(){
        console.log("666")
    },
                config:{
                    choose:1,
                },
            },
            "fsyy_juexian":{
                trigger:{
                    player:["phaseBefore","phaseAfter"],
                },
                content:function(){
        
    },
                config:{
                    "phase_list":["当你不因“诛仙”使用伤害类牌指定其他角色为目标时","当你对其他角色造成伤害时","当其他角色对你造成伤害时"],
                    "check_phase":function(event,status){
            console.log(event)
            let trigger = event.getTrigger();
            let player = trigger.player;
            let source = trigger.source;
            if(status == 0){
                source = trigger.target
            }
            if(status == 1){
                player = trigger.source
                source = trigger.player
                
            }
            
            return {player:player,target:source}
        },
                    "check_filter":function(player,triggername,status){
            let phaseEvent = '';
            if(status == 0){
                phaseEvent = 'useCardToBegin'
            }
            if(status == 1){
                phaseEvent = 'damageBegin'
                if(player == game.me){
                    return false
                }
            }
            if(status == 2){
                phaseEvent = 'damageBegin'
                if(player != game.me){
                    return false
                }
            }
            if(phaseEvent != triggername){
                return false
            }
            return true
        },
                },
            },
            "fsyy_luxian":{
                trigger:{
                    player:["damageBegin","useCardToBegin"],
                    source:"damageBegin",
                },
                group:[],
                filter:function(trigger,player,triggername){
        console.log(lib.skill.fsyy_juexian.config.check_filter(trigger.player,triggername,this.config.event_status))
        return lib.skill.fsyy_juexian.config.check_filter(trigger.player,triggername,this.config.event_status)
    },
                content:function(){
        let flag = lib.skill.fsyy_juexian.config.check_phase(event,lib.skill[this.name].config.event_status)
        if(flag){
            console.log(flag)
        }else{
            console.log(false)
        }
    },
                subSkill:{
                    die:{
                        sub:true,
                    },
                    mark:{
                        sub:true,
                    },
                },
                config:{
                    "event_status":2,
                },
            },
        },
        translate:{
            test:"test",
            "test_info":"test",
            "fsyy_juexian":"绝仙",
            "fsyy_juexian_info":"你的回合开始或结束时，你可以任意交换“诛仙”、“戮仙”、“陷仙”的触发时机;当你发动以上三个技能之一结算完毕后且你的体力值为全场最小,你可以以任意顺序发动另外两个技能",
            "fsyy_luxian":"戮仙",
            "fsyy_luxian_info":"当你对其他角色造成伤害时，可以令该角色获得一枚“戮仙”标记;拥有“戮仙”标记的角色回合结束时,若其标记数大于体力上限，其死亡",
        },
    },
    intro:"",
    author:"",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})