const Vec3 = require('tera-vec3');
const config = require("./config.json");

module.exports = function Redirect(mod) {

 const blacklist = [9713];
 const whitelist = [9031, 9032, 3016];
 const command = mod.command || mod.require.command;

  let enabled = config.enabled,
      loot,
      zone,
      RKH,
      vsn,
      hw,
      bahaar,
      bahin,
      banyaka = 81301,
	    reset = false;

  const hwredeem = new Vec3(22205, 4870, 6191);  //base pos H tp
  const hwtp = new Vec3(21222, 5919, 6216);  //base pos book tp
  const bahaarH = new Vec3(115023, 90044, 6377); //base pos H tp
  const rkskip = new Vec3(-43963, 48750, 1); // Skip 1st boss RK9 HM / Rampage RK9 HM
  const ba = new Vec3(-103510, 98460, 3547);
  const vsnm = new Vec3(43948, -134721, 29070)
  const vslast = new Vec3(39581, -112922, 17213)
  const chestloc = new Vec3(52562, 117921, 4431);
  const chests = [81341, 81342];

  // open world
  mod.hook('S_SPAWN_ME', 3, event => {
    if (!enabled) return;
    if (hw && hwredeem.dist3D(event.loc) <= 5 || hwtp.dist3D(event.loc) <= 5){
    event.loc = new Vec3(19297, 4132, 6191) //banker
    return true
    }
    if (bahaar && bahaarH.dist3D(event.loc) <= 5){
    event.loc = new Vec3(115321, 96917, 7196) // Bahaar portal
    return true
    }
    if (RKH && RKHM.dist3D(event.loc) <= 5){
    event.loc = new Vec3(-41392, 40629, -953) //TP enter
    return true	    
    }
    if (vsn && vsnm.dist3D(event.loc) <= 5){
    event.loc = new Vec3(44353, -126459, 16788) //TP enter
    return true	    
    }
    if (bahin && ba.dist3D(event.loc) <= 5){
    event.loc = new Vec3(-98222, 99611, 4360)
     return true
    }
  });
// dungeon
  mod.hook('S_SPAWN_ME', 3, event => {
    if (!enabled) return;
    switch(zone) {
        case 9713: // Ghillie
            event.loc = new Vec3(52233, 117319, 4382)
            event.w = 1.5
            return true;
        case 9031: // Ace Akasha	
            event.loc = new Vec3(72424, 133968, -502)
            event.w = 1.5
            return true;
        case 9032: // Ace Baracos
            event.loc = new Vec3(28214, 178550, -1675)
            event.w = 1.5
            return true;
        case 3016: // Ace Lilith	
            event.loc = new Vec3(-99600, 58666, 8023)
            event.w = 1.55
            return true;
        case 3027: // FA SLAYER	
            event.loc = new Vec3(52261, 69448, -11743) 
            event.w = 1.55
            return true;
        case 3103: // FAA BRAWLER	
            event.loc = new Vec3(52276, 84804, -11743) 
            event.w = 1.55
            return true;
        case 3203: // FAA BRAWLER HM
            event.loc = new Vec3(52276, 84804, -11743) 
            event.w = 1.55
            return true;  
        case 3102: // DRAAKON ARENA 	
            event.loc = new Vec3(-115911, 130701, 20464) 
            event.w = 1.55
            return true;  
        case 3202: // DRAAKON ARENA HM	
            event.loc = new Vec3(-115911, 130701, 20464) 
            event.w = 1.55
            return true;  
        case 9735: // RK9 
            event.loc = new Vec3(-41392, 40629, -953)
            event.w = 1.55
            return true;            			
        default: return;
    }
});


mod.hook('S_SPAWN_NPC', 11, event => {
  if (!enabled) return;
  if (event.huntingZoneId == 713 && chests.includes(event.templateId)) {
    reset = true;
    command.message('Ghillieglade will be reset the next time you enter veliks sanctuary.');
  }
});

mod.hook('C_RESET_ALL_DUNGEON', 1, event => {
  if (!enabled) return;
  if (mod.game.me.zone == 9713) {
    reset = false;
   command.message('Ghillieglade was reset manually.');
  }
});

mod.hook('S_SPAWN_DROPITEM', 8, event => {
  if(!(blacklist.indexOf(event.item) > -1)) loot[event.gameId.toString()] = 1;
});

mod.hook('S_DESPAWN_DROPITEM', 4, event => {
  if(event.gameId.toString() in loot) delete loot[event.gameId.toString()];
  if(Object.keys(loot).length < 1 && zone > 9000) resetinstance();
});

function resetinstance() {
  if (!enabled) return;
  if((zone == 9031 || zone == 9032 || zone == 3016) && whitelist.indexOf(zone) > -1)  mod.send('C_RESET_ALL_DUNGEON', 1, null);
}

mod.hook('S_BOSS_GAGE_INFO',3,(event) => {
  if(!enabled) return;
    if ((Number.parseInt(event.curHp) / Number.parseInt(event.maxHp)*10000)/100 <= 20 && event.templateId == banyaka) {
        teleport();
  }
  });	

  mod.game.me.on('change_zone', (zone) => {
		if (!enabled) return;
		if (zone == 9714 && reset) {
			mod.send('C_RESET_ALL_DUNGEON', 1, {});
			reset = false;
			mod.command.message('Ghillieglade has been reset.');
		}
  });

  function teleport() {
		mod.send('S_INSTANT_MOVE', 3, {
				gameId: mod.game.me.gameId,
				loc: chestloc,
				w: 0.18
			});
		return false;
	}

  function pylon() {
    if (RKH){
		mod.toClient('S_INSTANT_MOVE', 3, {
			gameId: mod.game.me.gameId,
			loc: rkskip,
			w: 3.12
    });
    sendMessage('Skip RK9 HM 1st Boss');
    sendMessage('back normally and click with your mouse to tp at the 2nd boss');
  } else { sendMessage('Not in RH9 HM')}
  }
  
  function last() {
    if (vsn){
		mod.toClient('S_INSTANT_MOVE', 3, {
			gameId: mod.game.me.gameId,
			loc: vslast,
			w: 3.12
    });
    sendMessage('Last Boss Veliks Sanctuary');
  } else { sendMessage('Not in Veliks Sanctuary')}
  }
  

  mod.hook('S_LOAD_TOPO', 3, event => {
    vsn = (mod.game.me.zone === 9781)
    bahaar = (event.zone === 7004)
    hw = (event.zone === 7031)
    bahin = (event.zone === 9004)
    zone = event.zone;
    loot = {};
});

    function sendMessage(msg) { mod.command.message(msg) }

  command.add('redirect', {
    '$default': () => {
      enabled = !enabled;
    sendMessage(enabled ? 'Redirect enabled.' : 'Redirect disabled.');
  },    
  'rk': () => {
    pylon();
},
'vs': () => {
  last();
}
});
  
  this.destructor = function() {
    command.remove('redirect');
  };
};
