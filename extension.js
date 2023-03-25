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
            "fsyy_boss_luxian":{
                trigger:{
                    player:["damageBegin","useCardToBegin"],
                    source:"damageBegin",
                },
                global:"fsyy_boss_luxian_die",
                group:["fsyy_boss_luxian_mark"],
                filter:function(trigger,player,triggername){
        return lib.skill.fsyy_boss_juexian.config.checkFilter(player,trigger,triggername,this.config.event_status)
    },
                content:function(){
        let flag = lib.skill.fsyy_boss_juexian.config.getPhaseObj(event,lib.skill[this.name].config.event_status);
        
        flag.target.addMark('fsyy_boss_luxian_mark',1)
        
        event.trigger('useJueXianSkill');
    },
                subSkill:{
                    die:{
                        sub:true,
                        forced:true,
                        trigger:{
                            player:"phaseEnd",
                        },
                        filter:function(trigger,player){
                return player.countMark('fsyy_boss_luxian_mark') > player.maxHp
            },
                        content:function(){
                player.die()
            },
                    },
                    mark:{
                        marktext:"戮",
                        intro:{
                            name:"戮仙",
                            content:"mark",
                        },
                        sub:true,
                    },
                },
                config:{
                    "event_status":1,
                },
            },
            "fsyy_boss_juexian":{
                trigger:{
                    player:["phaseBefore","phaseAfter"],
                },
                content:function(){
        var arr = ['fsyy_boss_zhuxian','fsyy_boss_luxian','fsyy_boss_xianxian']
        var choose_button = [arr.map(str => {
            return get.translation(str)+": "+lib.skill.fsyy_boss_juexian.config.phase_list[lib.skill[str].config.event_status]
        }),'tdnodes']
        "step 0"
        let next = player.chooseButton(["绝仙: 请选择两项交换条件的技能",choose_button])
        next.set('forced',true);
        next.set('selectButton',[2,2]);
        "step 1"
        result.links = result.links.map(value=>{
            return choose_button[0].indexOf(value)
        })
        console.log(result.links)
        let temp = lib.skill[arr[result.links[0]]].config.event_status
        lib.skill[arr[result.links[0]]].config.event_status = lib.skill[arr[result.links[1]]].config.event_status
        lib.skill[arr[result.links[1]]].config.event_status = temp
        
    },
                config:{
                    "phase_list":["当你不因“诛仙”使用伤害类牌指定其他角色为目标时","当你对其他角色造成伤害时","当其他角色对你造成伤害时"],
                    getPhaseObj:function(event,status){
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
                    checkFilter:function(player,trigger,triggername,status){
            let phaseEvent = '';
            if(status == 0){
                phaseEvent = 'useCardToBegin'
                if(trigger.target == player){
                    return false
                }
            }
            if(status == 1){
                phaseEvent = 'damageBegin'
                if(trigger.player == player){
                    return false
                }
            }
            if(status == 2){
                phaseEvent = 'damageBegin'
                if(trigger.player != player){
                    return false
                }
            }
            if(phaseEvent != triggername){
                return false
            }
            return true
        },
                },
                subSkill:{
                    used:{
                        prompt:"###是否发动【绝仙】？###当你发动以上三个技能之一结算完毕后且你的体力值为全场最小,你可以以任意顺序发动另外两个技能",
                        trigger:{
                            player:"useJueXianSkill",
                        },
                        sub:true,
                        filter:function(trigger,player){
                return player.isMinHp()
            },
                        content:function(){
                
            },
                    },
                },
                group:["fsyy_boss_juexian_used"],
            },
            "fsyy_boss_zhuxian":{
                config:{
                    "event_status":0,
                },
            },
            "fsyy_boss_xianxian":{
                config:{
                    "event_status":2,
                },
            },
        },
        translate:{
            test:"test",
            "test_info":"test",
            "fsyy_boss_luxian":"戮仙",
            "fsyy_boss_luxian_info":"当你对其他角色造成伤害时，可以令该角色获得一枚“戮仙”标记;拥有“戮仙”标记的角色回合结束时,若其标记数大于体力上限，其死亡",
            "fsyy_boss_juexian":"绝仙",
            "fsyy_boss_juexian_info":"你的回合开始或结束时，你可以任意交换“诛仙”、“戮仙”、“陷仙”的触发时机;当你发动以上三个技能之一结算完毕后且你的体力值为全场最小,你可以以任意顺序发动另外两个技能",
            "fsyy_boss_zhuxian":"诛仙",
            "fsyy_boss_zhuxian_info":"",
            "fsyy_boss_xianxian":"陷仙",
            "fsyy_boss_xianxian_info":"",
        },
    },
    intro:"",
    author:"",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})