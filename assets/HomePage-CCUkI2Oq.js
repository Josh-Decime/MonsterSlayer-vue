import{A as e,P as k,_ as P,c as C,i as I,o as U,r as B,a as n,b as r,d as h,t as o,F as N,e as V,n as p,g as l,j as R,f as G,w as K,p as Y,h as F}from"./index-ByVHm2Ch.js";class L{killBoss(){console.log("killing the boss");let t=1.2,a=1.5;e.activeMonster.level++,e.activeMonster.maxHealth=Math.round(e.activeMonster.maxHealth*a),e.activeMonster.health=e.activeMonster.maxHealth,e.activeMonster.damage=Math.round(e.activeMonster.damage*a),e.activeMonster.coins=Math.round(e.activeMonster.coins*t),e.activeMonster.strikerDamage=Math.round(e.activeMonster.strikerDamage*a),e.activeMonster.healAmount=Math.round(e.activeMonster.healAmount*a),e.activeMonster.kamikazeDamage=Math.round(e.activeMonster.kamikazeDamage*a),e.activeMonster.kamikazeHealthCost=Math.round(e.activeMonster.kamikazeHealthCost*a),e.activeMonster.sicknessDamage=Math.round(e.activeMonster.sicknessDamage*a),e.monsters.push(e.activeMonster),e.activeMonster=e.monsters.shift(),e.playerLevel++,console.log("the new boss is:",e.activeMonster),e.storeAvailable=!0,console.log("store available:",e.storeAvailable)}bossAttack(){e.storeAvailable=!1,console.log("store available:",e.storeAvailable),e.activeMonster.kamikazeDamageApplied=!1,e.equippedCharacters.forEach(t=>{if(!t.dead){let a=e.activeMonster.damage;const s=e.activeMonster.critChance,u=e.activeMonster.critMultiplier;Math.random()<s&&(a*=u,a=Math.round(a),console.log("***Boom! Critical hit! Damage:",a)),e.equippedCharacters.length==1&&(console.log("recognizing only one character is equipped"),console.log("damage before multiplier:",a),a=Math.round(a*1.5),console.log("damage after multiplier:",a)),e.equippedCharacters.length==2&&(console.log("recognizing 2 characters are equipped"),console.log("damage before multiplier:",a),a=Math.round(a*1.2),console.log("damage after multiplier:",a)),this.bossesMoveThisTurn(t,a)}}),this.determineBossSpecialActivation()}determineBossSpecialActivation(){e.activeMonster.strikerAttacked&&(e.activeMonster.strikerSpecialActivated=!1),e.activeMonster.striker&&Math.random()<e.activeMonster.strikerActivateChance&&(e.activeMonster.strikerSpecialActivated=!0,console.log("*** STRIKER MOVE ACTIVATED!")),e.activeMonster.healUsed&&(e.activeMonster.healSpecialActivated=!1),e.activeMonster.healer&&Math.random()<e.activeMonster.healActivateChance&&(e.activeMonster.healSpecialActivated=!0,console.log("*** HEALER MOVE ACTIVATED")),e.activeMonster.shieldUsed&&(e.activeMonster.shieldSpecialActivated=!1),e.activeMonster.shield&&Math.random()<e.activeMonster.shieldActivateChance&&(e.activeMonster.shieldSpecialActivated=!0,console.log("*** SHIELD MOVE ACTIVATED!")),e.activeMonster.kamikazeUsed&&(e.activeMonster.kamikazeSpecialActivated=!1),e.activeMonster.kamikaze&&Math.random()<e.activeMonster.kamikazeActivateChance&&(e.activeMonster.kamikazeSpecialActivated=!0,console.log("*** KAMIKAZE MOVE ACTIVATED")),e.activeMonster.sicknessUsed&&(e.activeMonster.sicknessSpecialActivated=!1),e.activeMonster.sickness&&Math.random()<e.activeMonster.sicknessActivationChance&&(e.activeMonster.sicknessSpecialActivated=!0,console.log("*** SICKNESS MOVE ACTIVATED!"))}bossesMoveThisTurn(t,a){if(t.shieldActive){t.shieldActive=!1,console.log("attack blocked");return}const s=e.activeMonster.strikerSpecialActivated,u=e.activeMonster.healSpecialActivated,c=e.activeMonster.shieldSpecialActivated,b=e.activeMonster.kamikazeSpecialActivated,i=e.activeMonster.sicknessSpecialActivated,v=e.activeMonster.sicknessTurnCounter;let A=!1;s&&(this.bossStrikerSpecialAttack(t,a),A=!0),u&&(this.bossHealerSpecialMove(),A=!0),c&&(this.bossShieldSpecialMove(),A=!0),b&&(console.log("test to see if this runs once or 3 times"),this.bossKamikazeSpecialMove(t),A=!0),i&&(this.bossSetSicknessMove(t,a),A=!0),v>0&&(this.bossSicknessContinuousEffect(t,a),A=!0),A||(console.log("*Base attack triggered!"),t.health-=a)}bossStrikerSpecialAttack(t){t.shieldActive||(t.health-=e.activeMonster.strikerDamage),e.activeMonster.strikerAttacked=!0}bossHealerSpecialMove(){e.activeMonster.health+=e.activeMonster.healAmount,e.activeMonster.health>e.activeMonster.maxHealth&&(e.activeMonster.health=e.activeMonster.maxHealth),e.activeMonster.healUsed=!0}bossShieldSpecialMove(){e.activeMonster.shieldUsed=!0}bossKamikazeSpecialMove(t){t.shieldActive||(t.health-=e.activeMonster.kamikazeDamage),e.activeMonster.kamikazeDamageApplied||(e.activeMonster.health-=e.activeMonster.kamikazeHealthCost),e.activeMonster.kamikazeUsed=!0,e.activeMonster.kamikazeDamageApplied=!0}bossSetSicknessMove(t,a){t.shieldActive||(e.activeMonster.sicknessTurnCounter=e.activeMonster.sicknessDuration,t.health-=a,console.log("initial sickness is set, counter is at:",e.activeMonster.sicknessTurnCounter)),e.activeMonster.sicknessUsed=!0}bossSicknessContinuousEffect(t,a){t.shieldActive||(t.health-=e.activeMonster.sicknessDamage,t.health-=a),e.activeMonster.sicknessTurnCounter--,console.log("sickness continuous effect is applied, counter is at:",e.activeMonster.sicknessTurnCounter)}}const y=new L;class j{equipTeam(){e.equippedCharacters.length=0,e.Characters.forEach(t=>{t.equip==!0&&e.equippedCharacters.push(t)}),console.log("Equipped characters",e.equippedCharacters)}heroAttack(t){!t.hasAttacked&&!t.dead?(e.activeMonster.shieldSpecialActivated||(e.activeMonster.health-=t.damage),t.hasAttacked=!0,console.log("attacking hero:",t)):k.error("Can not attack")}capAtMaxHealth(t){t.health>t.maxHealth&&(t.health=t.maxHealth)}buyCharacter(t){if(e.playerCoins>=t.purchasePrice){const a=e.Characters.find(s=>s.name==t.name);e.playerCoins-=t.purchasePrice,a.unlocked=!0,console.log("you bought:",t)}else k.error("You do not have enough coins!");e.equippedCharacters.length<3&&e.playerCoins>=t.purchasePrice&&console.log("equip purchased character"),this.equipCharacter(t)}equipCharacter(t){if(e.equippedCharacters.length<3){const a=e.Characters.find(s=>s.name==t.name);a.equip=!0,e.equippedCharacters.push(t),console.log("your team",e.equippedCharacters),console.log("hero added",t)}else k.error("Your team is full! Un-equip someone to make room first")}unEquipCharacter(t){const a=e.Characters.find(s=>s.name==t.name);a.hasAttacked?k.error("This character made their move this turn & cant be unequipped until next round"):a.equip=!1}upgradeCharacter(t){let a=1.5,s=1.7,u=2;const c=e.Characters.find(b=>b.name==t.name);e.playerCoins>=c.upgradeCost?(e.playerCoins-=c.upgradeCost,c.level++,c.maxHealth=Math.round(c.maxHealth*a),c.health=c.maxHealth,c.damage=Math.round(c.damage*a),c.upgradeCost=Math.round(c.upgradeCost*s),c.potionCost=Math.round(c.potionCost*a),c.reviveCost=Math.round(c.reviveCost*u),c.healAmount=Math.round(c.healAmount*a),c.healOverTimeAmount=Math.round(c.healOverTimeAmount*a),c.strikeAmount=Math.round(c.strikeAmount*a),c.kamikazeDamage=Math.round(c.kamikazeDamage*a),c.kamikazeHealthCost=Math.round(c.kamikazeHealthCost*a)):k.error("You need more coins to upgrade that character!")}reviveCharacter(t){const a=e.Characters.find(u=>u.name==t.name);let s=a.reviveCost;e.storeAvailable||(s=Math.round(s*2)),e.playerCoins>=s&&(e.playerCoins-=s,a.health=a.maxHealth,a.dead=!1,e.teamDied=!1)}potionHealCharacter(t){e.playerCoins>=t.potionCost&&(e.playerCoins-=t.potionCost,t.health=t.maxHealth)}specialMoveHeal(t){e.playerPower>=t.healCost?(e.playerPower-=t.healCost,e.equippedCharacters.forEach(a=>{a.dead||(a.health+=t.healAmount,this.capAtMaxHealth(a))}),t.hasAttacked=!0):k.error("Not enough power")}setHealOverTime(t){e.playerPower>=t.healOverTimeCost?(e.playerPower-=t.healOverTimeCost,e.equippedCharacters.forEach(a=>{a.dead||(a.healOverTimeCounter=t.healOverTimeDuration,a.healOverTimeBy=t.name,a.healOverTimeAmountHolder=t.healOverTimeAmount,a.healOverTimeCounter--,a.health+=t.healOverTimeAmount,this.capAtMaxHealth(a),console.log("hero effected by heal over time",a))}),t.hasAttacked=!0):k.error("Not enough power")}healOverTimeContinuousEffect(t){t.healOverTimeCounter--,t.health+=t.healOverTimeAmountHolder,this.capAtMaxHealth(t),console.log("healing:",t)}strikeAttack(t){if(!t.hasAttacked&&!t.dead&&e.playerPower>=t.strikeCost){e.activeMonster.health-=t.strikeAmount;const a=e.Characters.find(s=>s.name==t.name);a.hasAttacked=!0,e.playerPower-=t.strikeCost}else k.error("Can not attack")}kamikazeAttack(t){!t.hasAttacked&&!t.dead&&e.playerPower>=t.kamikazePowerCost?(e.activeMonster.health-=t.kamikazeDamage,t.health-=t.kamikazeHealthCost,t.hasAttacked=!0,e.playerPower-=t.kamikazePowerCost,t.health<=0&&(t.dead=!0,t.health=0,console.log("died:",t))):k.error("Can not attack")}activateShield(t){e.playerPower>=t.shieldCost&&(e.playerPower-=t.shieldCost,e.equippedCharacters.forEach(a=>{a.shieldActive=!0}),t.hasAttacked=!0)}overchargeSpecialUsed(t){e.playerPower+=t.overchargeAmount,t.hasAttacked=!0}}const m=new j;class Q{endRound(){let t=!1;e.equippedCharacters.forEach(a=>{!a.hasAttacked&&!a.dead&&(t=!0)}),t?k.error("Someone on your team has not attacked"):(y.bossAttack(),e.equippedCharacters.forEach(a=>{a.hasAttacked=!1,a.health<=0&&(a.dead=!0,a.health=0,console.log("died:",a)),console.log("hero:",a)}),this.turnCounterHandler(),k.success("Next round")),e.playerPower<100&&(e.playerPower+=10),this.checkIfTeamIsAlive()}turnCounterHandler(){console.log("handling turn counter"),e.equippedCharacters.forEach(t=>{console.log("hero healOverTimeCounter",t.healOverTimeCounter),t.healOverTimeCounter>=1&&m.healOverTimeContinuousEffect(t)})}quickAttack(){e.equippedCharacters.forEach(t=>{t.hasAttacked||m.heroAttack(t)}),this.endRound()}fightNextBoss(){e.storeAvailable=!1}payPlayer(){console.log("player coins before:",e.playerCoins),e.playerCoins+=e.activeMonster.coins,console.log("player is paid:",e.playerCoins)}checkIfTeamIsAlive(){let t=0;e.equippedCharacters.forEach(a=>{a.dead&&t++}),t==e.equippedCharacters.length&&(console.log("Your team died"),e.teamDied=!0,e.storeAvailable=!0)}}const g=new Q,Z={setup(){const f=C(()=>e.activeMonster);I(()=>e.activeMonster.health,d=>{d<=0&&(console.log("recognizing health is below 0"),t())});function t(){y.killBoss(),a()}function a(){g.payPlayer()}const s=C(()=>e.equippedCharacters);function u(){m.equipTeam()}U(()=>{u()}),C(()=>{u()});const c=C(()=>e.equippedCharacters.length>0),b=C(()=>e.playerCoins),i=C(()=>e.playerPower),v=C(()=>e.storeAvailable),A=C(()=>e.teamDied);function _(d){m.heroAttack(d)}function S(){g.endRound()}function T(){g.quickAttack()}function z(d){m.reviveCharacter(d)}function q(d){m.specialMoveHeal(d)}function H(d){m.strikeAttack(d)}function w(d){m.setHealOverTime(d)}function D(d){m.activateShield(d)}function x(d){m.overchargeSpecialUsed(d)}function E(d){m.kamikazeAttack(d)}function O(){g.fightNextBoss()}return{boss:f,heroes:s,equipTeam:u,equipCheck:c,heroAttack:_,yourCoins:b,endRound:S,quickAttack:T,reviveCharacter:z,yourPower:i,specialMoveHeal:q,strikeAttack:H,setHealOverTime:w,activateShield:D,overchargeSpecialUsed:x,kamikazeAttack:E,storeAvailable:v,fightNextBoss:O,teamDied:A}}},M=f=>(Y("data-v-b986d3c8"),f=f(),F(),f),J={class:"container-fluid background"},W={class:"row"},X={class:"col-12 col-md-6"},$={class:"fs-3"},ee={class:"fs-3 mx-5"},te={key:0},ae=["src","alt"],se={class:"my-0 fs-4 bold"},ie={class:"my-0"},oe={key:0},ce=["onClick"],ne=["onClick"],re=["onClick"],le=["onClick"],de=["onClick"],he=["onClick"],ue=["onClick"],ve={key:8,class:"btn btn-secondary disabled"},ke=["onClick"],me={key:1},pe=M(()=>h("p",{class:"fs-1 bolder"},"No team equipped!",-1)),fe=M(()=>h("p",{class:"fs-2 bolder"},"Go to store to equip your team!",-1)),Ae=[pe,fe],Ce={key:0,class:"col-12 col-md-6"},be={class:"progress"},ge={key:0},Me={key:1},ye={key:2},_e={key:3},Se={key:4},Te={key:5},ze=["src","alt"],qe={key:1,class:"col-6 mt-5"},He=M(()=>h("button",{class:"btn btn-success fs-1"},"Store",-1)),we={key:1,class:"disabled btn btn-danger fs-1"};function De(f,t,a,s,u,c){const b=B("router-link");return n(),r("section",J,[h("section",W,[h("div",X,[h("span",$,"Your Coins: "+o(s.yourCoins)+"🪙",1),h("span",ee,"Your Power: "+o(s.yourPower)+"💪",1),s.equipCheck?(n(),r("div",te,[(n(!0),r(N,null,V(s.heroes,i=>(n(),r("div",null,[i.img?(n(),r("img",{key:0,src:i.img,alt:i.name,class:"character-img"},null,8,ae)):l("",!0),h("p",se,o(i.name)+": Lvl "+o(i.level),1),h("div",null,[h("span",ie,"Health: "+o(i.health)+"/"+o(i.maxHealth),1),i.healOverTimeCounter?(n(),r("span",oe," Healing ➕"+o(i.healOverTimeAmountHolder)+" for "+o(i.healOverTimeCounter)+" more rounds",1)):l("",!0)]),!i.hasAttacked&&!i.dead?(n(),r("button",{key:1,class:p(["btn btn-primary",{disabled:s.storeAvailable}]),onClick:v=>s.heroAttack(i)}," 🪥 "+o(i.damage),11,ce)):l("",!0),i.healer&&!i.hasAttacked&&!i.dead?(n(),r("button",{key:2,class:p(["btn btn-secondary",{disabled:s.storeAvailable}]),onClick:v=>s.specialMoveHeal(i)},"Pay 💪"+o(i.healCost)+" to heal ➕"+o(i.healAmount),11,ne)):l("",!0),i.healerOverTime&&!i.hasAttacked&&!i.dead?(n(),r("button",{key:3,class:p(["btn btn-secondary",{disabled:s.storeAvailable}]),onClick:v=>s.setHealOverTime(i)},"Pay 💪"+o(i.healOverTimeCost)+" to heal ➕"+o(i.healOverTimeAmount)+" for "+o(i.healOverTimeDuration)+" rounds",11,re)):l("",!0),i.shield&&!i.hasAttacked&&!i.dead?(n(),r("button",{key:4,class:p(["btn btn-secondary",{disabled:s.storeAvailable}]),onClick:v=>s.activateShield(i)},"Pay 💪"+o(i.shieldCost)+" to block all damage next round",11,le)):l("",!0),i.overcharge&&!i.hasAttacked&&!i.dead?(n(),r("button",{key:5,class:p(["btn btn-secondary",{disabled:s.storeAvailable}]),onClick:v=>s.overchargeSpecialUsed(i)},"Increase power by "+o(i.overchargeAmount),11,de)):l("",!0),i.striker&&!i.hasAttacked&&!i.dead?(n(),r("button",{key:6,class:p(["btn btn-secondary",{disabled:s.storeAvailable}]),onClick:v=>s.strikeAttack(i)},"Pay 💪"+o(i.strikeCost)+" for 🧼"+o(i.strikeAmount)+" damage",11,he)):l("",!0),i.kamikaze&&!i.hasAttacked&&!i.dead?(n(),r("button",{key:7,class:p(["btn btn-secondary",{disabled:s.storeAvailable}]),onClick:v=>s.kamikazeAttack(i)},"Pay 💪"+o(i.kamikazePowerCost)+" & -"+o(i.kamikazeHealthCost)+" health to deal "+o(i.kamikazeDamage),11,ue)):l("",!0),i.hasAttacked&&!i.dead?(n(),r("button",ve,"Already used their turn this round")):l("",!0),i.dead?(n(),r("button",{key:9,class:"btn btn-primary",onClick:v=>s.reviveCharacter(i)}," Revive for "+o(s.storeAvailable?i.reviveCost:i.reviveCost*2)+" coins ",9,ke)):l("",!0)]))),256))])):(n(),r("div",me,Ae)),s.equipCheck?(n(),r("button",{key:2,class:p(["btn btn-success mt-2",{disabled:s.storeAvailable}]),onClick:t[0]||(t[0]=(...i)=>s.endRound&&s.endRound(...i))},"End your turn",2)):l("",!0),s.equipCheck?(n(),r("button",{key:3,class:p(["btn btn-danger mt-2",{disabled:s.storeAvailable}]),onClick:t[1]||(t[1]=(...i)=>s.quickAttack&&s.quickAttack(...i))},"Quick Attack",2)):l("",!0)]),s.storeAvailable?l("",!0):(n(),r("div",Ce,[h("h1",null,o(s.boss.name),1),h("h3",null,o(s.boss.health)+" / "+o(s.boss.maxHealth),1),h("div",be,[h("div",{class:p("progress-bar"),role:"progressbar",style:R({width:`${s.boss.health/s.boss.maxHealth*100}%`})},null,4)]),h("div",null,[s.boss.strikerSpecialActivated?(n(),r("p",ge,"Charging up to deal +"+o(s.boss.strikerDamage)+" next turn",1)):l("",!0),s.boss.healSpecialActivated?(n(),r("p",Me,"Charging up to heal "+o(s.boss.healAmount)+" next turn",1)):l("",!0),s.boss.shieldSpecialActivated?(n(),r("p",ye,"Boss is immune to base attack damage")):l("",!0),s.boss.kamikazeSpecialActivated?(n(),r("p",_e,"Charging up to deal "+o(s.boss.kamikazeDamage)+" at the cost of "+o(s.boss.kamikazeHealthCost)+" of its own life",1)):l("",!0),s.boss.sicknessSpecialActivated?(n(),r("p",Se,"Is about to inflict sickness that will deal +"+o(s.boss.sicknessDamage)+" for "+o(s.boss.sicknessDuration)+" rounds",1)):l("",!0),s.boss.sicknessTurnCounter>0?(n(),r("p",Te,"Inflicting +"+o(s.boss.sicknessDamage)+" for "+o(s.boss.sicknessTurnCounter)+" round(s)",1)):l("",!0)]),s.boss.img?(n(),r("img",{key:0,src:s.boss.img,alt:s.boss.name,class:"boss-image"},null,8,ze)):l("",!0)])),s.storeAvailable?(n(),r("div",qe,[G(b,{to:{name:"About"},class:"btn text-success lighten-30 selectable text-uppercase"},{default:K(()=>[He]),_:1}),s.equipCheck&&!s.teamDied?(n(),r("button",{key:0,class:"btn btn-danger fs-1",onClick:t[2]||(t[2]=(...i)=>s.fightNextBoss&&s.fightNextBoss(...i))},"Fight the next boss")):l("",!0),s.teamDied?(n(),r("button",we,"No one alive to fight the boss")):l("",!0)])):l("",!0)])])}const xe=P(Z,[["render",De],["__scopeId","data-v-b986d3c8"]]),Oe=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"}));export{xe as H,Oe as a,m as c};
