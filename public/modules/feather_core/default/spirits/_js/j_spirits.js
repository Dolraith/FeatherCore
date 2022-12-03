import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import Counter from '/modules/feather_core/default/_vueComponents/counter.js';
import Tooltip from '/modules/feather_core/default/_vueComponents/tooltip.js';
export function initVue(initData, components){
    var vue = createApp({
        el: "",
        components:{

        },
        data() {
            var data = {
                refreshKey:0,
                spiritList:[],
                optionalPowers:{
                    options:[],
                    picked:[],
                    activeSpirit:0,
                    numOptional:0
                },
                powerTooltip:{
                    power:JSON.parse(JSON.stringify(initData.spirit_powers[0])),
                    show:false
                },
            };
            for(i in initData){
                data[i] = initData[i];
            }

            var types = [];
            var elements = {};
            var typeIndexes = {};
            for(var i in data['spirit_types'])
            {
                var type = data['spirit_types'][i];
                var curType = type["type"];
                var curEle = type['element'];
                if(!(types.includes(curType))){
                    types.push(curType);
                    elements[curType] = [];
                    typeIndexes[curType] = {};
                }
                elements[curType].push(curEle);
                typeIndexes[curType][curEle] = type['_id'];
            }
            data['types'] = types;
            data['elements'] = elements;
            data['typeIndexes'] = typeIndexes;
            return data;    
        },
        methods: {
            addSpirit(){
                this.spiritList.push({
                    type:"Basic", element:"Air", force:1, powers:[], skills:[],
                    body:'', agility:'', reaction:'', trength:'', willpower:'', logic:'', intuition:'', charisma:'', magic:'',
                    phys_init:'', astral_init:'', damage_phys: 0, damage_stun: 0, condition_phys_max:0, condition_stun_max:0, condition_phys_cur:0, condition_stun_cur:0, cur_dmg_val:1,cur_dmg_mode:"phys", pool_modifier: 0,
                    skills:[], skillDetails: false, powers: {required:[],optional:[],numOptional:0,picked:[]}
                });
                this.calcSpirit(this.spiritList.length - 1)
            },
            calcSpirit(index){
                var curDef = null;
                var defId = this.typeIndexes[this.spiritList[index]['type']][this.spiritList[index]['element']];
                for(var i in this.spirit_types){
                    if(defId == this.spirit_types[i]['_id']){
                        curDef = this.spirit_types[i];
                        break;
                    }
                }
                
                var force = this.spiritList[index].force;
                this.spiritList[index]._id = curDef._id;
                this.spiritList[index].body = Math.max(1,(1*force) + curDef.body);
                this.spiritList[index].agility = Math.max(1, (1*force) + curDef.agility);
                this.spiritList[index].reaction = Math.max(1,(1*force) + curDef.reaction);
                this.spiritList[index].strength = Math.max(1,(1*force) + curDef.strength);
                this.spiritList[index].willpower = Math.max(1, (1*force) + curDef.willpower);
                this.spiritList[index].logic = Math.max(1,(1*force) + curDef.logic);
                this.spiritList[index].intuition = Math.max(1,(1*force) + curDef.intuition);
                this.spiritList[index].charisma = Math.max(1,(1*force) + curDef.charisma);
                this.spiritList[index].magic = Math.max(1,1*force);
                this.spiritList[index].phys_init = curDef.phys_init.replace("(Fx2)",(force*2) + "");
                this.spiritList[index].astral_init = curDef.astral_init.replace("(Fx2)",(force*2) + "");
                this.spiritList[index].condition_phys_max = Math.ceil((8+(this.spiritList[index].body/2)));
                this.spiritList[index].condition_stun_max = Math.ceil((8+(this.spiritList[index].willpower/2)));
                this.spiritList[index].condition_phys_cur = 0;
                this.spiritList[index].condition_stun_cur = 0;
                this.spiritList[index].pool_modifier = 0;
                this.calcSkills(this.spiritList[index]);
                this.calcPowers(this.spiritList[index]);
                
            },
            calcSkills(spirit){
                spirit.skills.splice(0, spirit.skills.length);
                var map = this.skillmap[spirit._id];
                for(var i in this.spirit_skills){
                    var curSkill = this.spirit_skills[i];
                    if(curSkill._id in map){
                        var attribute = spirit[curSkill.attribute.toLowerCase()];
                        var force = spirit['force'] * 1;
                        var pool = attribute + force;
                        spirit.skills.push({name:curSkill.name,attribute:curSkill.attribute,pool:pool});
                    }
                }
            },
            calcPowers(spirit){
                spirit.powers.required.splice(0,spirit.powers.required.length);
                spirit.powers.optional.splice(0,spirit.powers.optional.length);
                spirit.powers.picked.splice(0,spirit.powers.picked.length);
                var requiredIds = [];
                var optionalIds = [];
                var map = this.powermap[spirit._id];
                for(var id in map){
                    if(map[id] == 'required'){
                        requiredIds.push(id * 1);
                    }else if(map[id] == 'optional'){
                        optionalIds.push(id * 1);
                    }
                }
                for(var i in this.spirit_powers){
                    var curPower = this.spirit_powers[i];
                    if(requiredIds.includes(curPower._id)){
                        spirit.powers.required.push(curPower);
                    }else if(optionalIds.includes(curPower._id)){
                        spirit.powers.optional.push(curPower);
                    }
                }
                spirit.powers.numOptional = Math.floor(spirit.force/3);
            },
            pickPowers(spirit, spiritIndex){
                this.optionalPowers.options.splice(0, Infinity);
                for(var i in spirit.powers.optional){
                    var option = spirit.powers.optional[i];
                    option.showDescription = false;
                    this.optionalPowers.options.push(option);
                }
                this.optionalPowers.picked.splice(0, Infinity);
                console.log(spirit.powers.picked.length);
                for(var i in spirit.powers.picked){
                    this.optionalPowers.picked.push(spirit.powers.picked[i]._id);
                }
                this.optionalPowers.activeSpirit = spiritIndex;
                this.optionalPowers.numOptional = spirit.powers.numOptional;
            },
            showModalPowerDescription(option, vis){
                option.showDescription = vis;
            },
            pickPowersOk(){
                var i = this.optionalPowers.activeSpirit;
                this.spiritList[i].powers.picked.splice(0,Infinity);
                for(var j in this.optionalPowers.picked){
                    var curId = this.optionalPowers.picked[j];
                    for(var k in this.spirit_powers){
                        if(this.spirit_powers[k]._id == curId){
                            this.spiritList[i].powers.picked.push(this.spirit_powers[k]);
                        }
                    }
                    
                }
            },
            setPowerTooltip(power){
                for(var i in power){
                    this.powerTooltip.power[i] = power[i];
                }
            },
            damage(spiritIndex, healInstead){
                var curDamage = this.spiritList[spiritIndex].cur_dmg_val;
                //:1,cur_dmg_mode:"phys"
                if(healInstead){
                    curDamage = curDamage * -1;
                }
                if(this.spiritList[spiritIndex].cur_dmg_mode == "phys"){
                    this.spiritList[spiritIndex].condition_phys_cur += curDamage;
                    if(this.spiritList[spiritIndex].condition_phys_cur < 0){
                        this.spiritList[spiritIndex].condition_phys_cur = 0;
                    }else if(this.spiritList[spiritIndex].condition_phys_cur > this.spiritList[spiritIndex].condition_phys_max){
                        this.spiritList[spiritIndex].condition_phys_cur = this.spiritList[spiritIndex].condition_phys_max;
                    }
                    
                }else{
                    this.spiritList[spiritIndex].condition_stun_cur += curDamage;
                    if(this.spiritList[spiritIndex].condition_stun_cur < 0){
                        this.spiritList[spiritIndex].condition_stun_cur = 0;
                    }else if(this.spiritList[spiritIndex].condition_stun_cur > this.spiritList[spiritIndex].condition_stun_max){
                        this.spiritList[spiritIndex].condition_stun_cur = this.spiritList[spiritIndex].condition_stun_max;
                    }                
                }
                var physMod = Math.floor(this.spiritList[spiritIndex].condition_phys_cur / 3);
                var stunMod = Math.floor(this.spiritList[spiritIndex].condition_stun_cur / 3);
                console.log(physMod + " | " + stunMod);
                this.spiritList[spiritIndex].pool_modifier = -1 * (Math.max(stunMod, physMod));
            },
            forceTypeEleCompliance(index){
                var type = this.spiritList[index].type;
                if(!this.elements[type].includes(this.spiritList[index].element)){
                    this.spiritList[index].element = this.elements[type][0];
                }
                this.calcSpirit(index);
            },
            getSpiritVisibility(force){
                if(force == 1)return "Minor spirit, not noticable."
                if(force == 2)return "Proof that you are not entirely incompetent."
                if(force == 3)return "Common spirit used by a ton of mages."
                if(force == 4)return "Standard combat spirit."
                if(force == 5)return "Spirit belonging to a talented magician, people may take notice."
                if(force == 6)return "Things are getting serious, unauthorized use in urban areas will be persecuted."
                if(force < 8) return "A threat of this caliber cannot be left without repercussions."
                if(force < 12)return "Regional-level threat."
                if(force < 16)return "A national-level threat."
                else return "A global threat."
            },
            removeSpirit(spiritIndex){
                this.spiritList.splice(spiritIndex,1);
            },
            toggleSkillDetails(spiritIndex){
                console.log(spiritIndex);
                console.log(this.spiritList[spiritIndex]);
                console.log(this.spiritList[spiritIndex].skillDetails);
                this.spiritList[spiritIndex].skillDetails = !this.spiritList[spiritIndex].skillDetails;
                console.log(this.spiritList[spiritIndex].skillDetails);
            },
            condenseSkills(spirit){
                var result = [];
                for(var i in spirit.skills){
                    result.push(spirit.skills[i].name);
                }
                return result.join(', ');
            }
        },
        computed:{
            calculatedSpirits: function(){
                this.refreshKey++;
                var spirits = [];
                for(spirit in this.spiritList){
                    
                }
                return spirits;
            }
        }
    });

    for(var comp of components){
        vue.component(comp, eval(comp));
    }
    vue.mount("#vuemain");
}
