window.onload = function(){var vue = new Vue({
    el: "#vuemain",
    data() {return {
        refreshKey:0,
        spiritList:[],
        definitions:
        [
            {type:"Basic",element:"Air",			body:-2,agility: 3 ,reaction: 4 ,strength: -3,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+4+2D6", astral_init: "(F*2) + 3d6", source: "Core"},
            {type:"Basic",element:"Beasts",			body:2 ,agility: 1 ,reaction: 0 ,strength: 2 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2D6",   astral_init: "(F*2) + 3d6", source: "Core"},
            {type:"Basic",element:"Earth",			body:4 ,agility: -2,reaction: -1,strength: 4 ,willpower: 0 ,logic: -1,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)-1+2D6", astral_init: "(F*2) + 3d6", source: "Core"},
            {type:"Basic",element:"Fire",			body:1 ,agility: 2 ,reaction: 3 ,strength: -2,willpower: 0 ,logic: 0 ,intuition: 1 ,charisma: 0 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "Core"},
            {type:"Basic",element:"Guardian",		body:1 ,agility: 2 ,reaction: 3 ,strength: 2 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+1+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Basic",element:"Guidance",		body:3 ,agility: -1,reaction: 2 ,strength: 1 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2D6",   astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Basic",element:"Man",			body:1 ,agility: 0 ,reaction: 2 ,strength: -2,willpower: 0 ,logic: 0 ,intuition: 1 ,charisma: 0 ,phys_init: "(F*2)+2+2D6", astral_init: "(F*2) + 3d6", source: "Core"},
            {type:"Basic",element:"Plant",			body:2 ,agility: -1,reaction: 0 ,strength: 1 ,willpower: 0 ,logic: -1,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2D6",   astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Basic",element:"Task",			body:0 ,agility: 0 ,reaction: 2 ,strength: 2 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Basic",element:"Water",			body:0 ,agility: 1 ,reaction: 2 ,strength: 0 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2+2D6", astral_init: "(F*2) + 3d6", source: "Core"},
            {type:"Toxic",element:"Air",			body:-2,agility: 3 ,reaction: 4 ,strength: -3,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+4+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Toxic",element:"Beasts",			body:2 ,agility: 1 ,reaction: 0 ,strength: 2 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2D6",   astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Toxic",element:"Earth",			body:4 ,agility: -2,reaction: -1,strength: 4 ,willpower: 0 ,logic: -1,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)-1+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Toxic",element:"Fire",			body:1 ,agility: 2 ,reaction: 3 ,strength: -2,willpower: 0 ,logic: 0 ,intuition: 1 ,charisma: 0 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Toxic",element:"Man",			body:0 ,agility: 0 ,reaction: 2 ,strength: -2,willpower: 0 ,logic: 0 ,intuition: 1 ,charisma: 0 ,phys_init: "(F*2)+2+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Toxic",element:"Water",			body:1 ,agility: 1 ,reaction: 2 ,strength: 0 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Blood",element:"Blood",			body:2 ,agility: 2 ,reaction: 0 ,strength: 2 ,willpower: 0 ,logic: -1,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2D6",   astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Shadow",element:"Muse",			body:0 ,agility: 3 ,reaction: 2 ,strength: 0 ,willpower: 1 ,logic: 0 ,intuition: 1 ,charisma: 2 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Shadow",element:"Nightmare",		body:0 ,agility: 3 ,reaction: 2 ,strength: 0 ,willpower: 1 ,logic: 0 ,intuition: 1 ,charisma: 2 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Shadow",element:"Shade",			body:0 ,agility: 3 ,reaction: 2 ,strength: 0 ,willpower: 1 ,logic: 0 ,intuition: 1 ,charisma: 2 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Shadow",element:"Succubus",		body:0 ,agility: 3 ,reaction: 2 ,strength: 0 ,willpower: 1 ,logic: 0 ,intuition: 1 ,charisma: 2 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Shadow",element:"Wraith",		body:0 ,agility: 3 ,reaction: 2 ,strength: 0 ,willpower: 1 ,logic: 0 ,intuition: 1 ,charisma: 2 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Shedim",element:"Shedim",		body:0 ,agility: 0 ,reaction: 2 ,strength: 1 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2+1D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Shedim",element:"Master Shedim",	body:0 ,agility: 0 ,reaction: 2 ,strength: 1 ,willpower: 0 ,logic: 1 ,intuition: 1 ,charisma: 0 ,phys_init: "(F*2)+3+1D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Insect",element:"Caretaker",		body:0 ,agility: 1 ,reaction: 1 ,strength: 0 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+1+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Insect",element:"Nymph",			body:-1,agility: 0 ,reaction: 3 ,strength: -1,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+3+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Insect",element:"Scout",			body:0 ,agility: 2 ,reaction: 2 ,strength: 0 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Insect",element:"Soldier",		body:3 ,agility: 1 ,reaction: 1 ,strength: 3 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+1+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Insect",element:"Worker",		body:0 ,agility: 0 ,reaction: 0 ,strength: 1 ,willpower: 0 ,logic: 0 ,intuition: 0 ,charisma: 0 ,phys_init: "(F*2)+2D6",   astral_init: "(F*2) + 3d6", source: "SR5:SG"},
            {type:"Insect",element:"Queen/Mother",	body:5 ,agility: 3 ,reaction: 4 ,strength: 5 ,willpower: 1 ,logic: 1 ,intuition: 1 ,charisma: 0 ,phys_init: "(F*2)+5+2D6", astral_init: "(F*2) + 3d6", source: "SR5:SG"}
        ],
        types:["Basic","Toxic","Blood","Shadow","Shedim","Insect"],
        elements:{
            Basic:["Air","Beasts","Earth","Fire","Guardian","Guidance","Man","Plant","Task","Water"],
            Toxic:["Air","Beasts","Earth","Fire","Man","Water"],
            Blood:["Blood"],
            Shadow:["Muse","Nightmare","Shade","Succubus","Wraith"],
            Shedim:["Shedim","Master Shedim"],
            Insect:["Caretaker","Nymph","Scout","Soldier","Worker","Queen/Mother"],
        }
    }},
    methods: {
        addSpirit(){
            this.spiritList.push({
                type:"Basic", element:"Air", force:1, powers:[], 
                body:'', agility:'', reaction:'', trength:'', willpower:'', logic:'', intuition:'', charisma:'', magic:'',
                phys_init:'', astral_init:'', damage_phys: 0, damage_stun: 0, condition_phys_max:0, condition_stun_max:0, condition_phys_cur:0, condition_stun_cur:0, cur_dmg_val:1,cur_dmg_mode:"phys", pool_modifier: 0
            });
            this.calcSpirit(this.spiritList.length - 1)
        },
        calcSpirit(index){
            var curDef = null;
            for(defIndex in this.definitions){
                var def = this.definitions[defIndex];
                if(this.spiritList[index].type == def.type && this.spiritList[index].element == def.element){
                    curDef = def;
                    break;
                }
            }
            if(curDef == null){
                this.spiritList[index].body = "--";
                this.spiritList[index].agility = "--";
                this.spiritList[index].reaction = "--";
                this.spiritList[index].strength = "--";
                this.spiritList[index].willpower = "--";
                this.spiritList[index].logic = "--";
                this.spiritList[index].intuition = "--";
                this.spiritList[index].charisma = "--";
                this.spiritList[index].magic = '--';
                this.spiritList[index].phys_init = "--";
                this.spiritList[index].astral_init = "--";
                this.spiritList[index].condition_phys_max = "(8+(body/2))"
                this.spiritList[index].condition_stun_max = "(8+(willpower/2))"
                this.spiritList[index].condition_phys_cur = "(8+(body/2))"
                this.spiritList[index].condition_stun_cur = "(8+(willpower/2))"
            }else{
                var force = this.spiritList[index].force;
                this.spiritList[index].body = (1*force) + curDef.body;
                this.spiritList[index].agility = (1*force) + curDef.agility;
                this.spiritList[index].reaction = (1*force) + curDef.reaction;
                this.spiritList[index].strength = (1*force) + curDef.strength;
                this.spiritList[index].willpower = (1*force) + curDef.willpower;
                this.spiritList[index].logic = (1*force) + curDef.logic;
                this.spiritList[index].intuition = (1*force) + curDef.intuition;
                this.spiritList[index].charisma = (1*force) + curDef.charisma;
                this.spiritList[index].magic = 1*force;
                this.spiritList[index].phys_init = def.phys_init.replace("F*2",(force*2) + "");
                this.spiritList[index].astral_init = def.astral_init.replace("F*2",(force*2) + "");
                this.spiritList[index].condition_phys_max = Math.ceil((8+(this.spiritList[index].body/2)));
                this.spiritList[index].condition_stun_max = Math.ceil((8+(this.spiritList[index].willpower/2)));
                this.spiritList[index].condition_phys_cur = 0;
                this.spiritList[index].condition_stun_cur = 0;
                this.spiritList[index].pool_modifier = 0;
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
})
}