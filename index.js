const Vec3 = require('tera-vec3');
const config = require("./config.json");

module.exports = function Redirect(mod) {
 const command = mod.command || mod.require.command;

  let enabled = config.enabled,
      bahaar,
      hw,
      FA,
      FAA,
      FAAH,
      DA,
      DAH,
      bah,
      RK,
      RKH

  // open world
  const hwredeem = new Vec3(22205, 4870, 6191);  //base pos H tp
  const hwtp = new Vec3(21222, 5919, 6216);  //base pos book tp
  const bahaarH = new Vec3(115023, 90044, 6377); //base pos H tp

  // dungeon
  const slayer = new Vec3(50616, 69430, -11881 ); // FA SLAYER
  const brawlernm = new Vec3(50692, 84802, -11881); // FAA BRAWLER
  const brawlerhm = new Vec3(50692, 84802, -11881); // FAA BRAWLER HM
  const DANM = new Vec3(-117790, 130697, 21016); // DRAAKON ARENA 
  const DAHM = new Vec3(-117790, 130697, 21016); // DRAAKON ARENA HM
  const bahaarin = new Vec3(-103510, 98460, 3547); // BAHAAR
  const RKNM = new Vec3(-43486, 40629, -953); // RK9 
  const RKHM = new Vec3(-43486, 40629, -953); // RAMPAGE RK9 HM
  const rkskip = new Vec3(-43963, 48750, 1); // Skip 1st boss RK9 HM / Rampage RK9 HM


  mod.hook('S_SPAWN_ME', 3, event => {
    if (!enabled) return;
    // open world
    if (hw && hwredeem.dist3D(event.loc) <= 5 || hwtp.dist3D(event.loc) <= 5){
    event.loc = new Vec3(19297, 4132, 6191) //banker
    return true
    }
    if (bahaar && bahaarH.dist3D(event.loc) <= 5){
    event.loc = new Vec3(115321, 96917, 7196) //TP portal
    return true
    }
    //dungeon
    if (FA && slayer.dist3D(event.loc) <= 5){
    event.loc = new Vec3(52261, 69448, -11743) //TP enter
    return true
    }
    if (FAA && brawlernm.dist3D(event.loc) <= 5){
    event.loc = new Vec3(52276, 84804, -11743) //TP enter
    return true
    }
    if (FAAH && brawlerhm.dist3D(event.loc) <= 5){
    event.loc = new Vec3(52276, 84804, -11743) //TP enter
    return true
    }
    if (DA && DANM.dist3D(event.loc) <= 5){
    event.loc = new Vec3(-115911, 130701, 20464) //TP enter
    return true
    }
    if (DAH && DAHM.dist3D(event.loc) <= 5){
    event.loc = new Vec3(-115911, 130701, 20464) //TP enter
    return true
    }
    if (bah && bahaarin.dist3D(event.loc) <= 5){
    event.loc = new Vec3(-98216, 99609, 4360) //TP enter
    return true
    }
    if (RK && RKNM.dist3D(event.loc) <= 5){
    event.loc = new Vec3(-41392, 40629, -953) //TP enter
    return true
    }
    if (RKH && RKHM.dist3D(event.loc) <= 5){
    event.loc = new Vec3(-41392, 40629, -953) //TP enter
    return true
    }
  });

  function TPInstant() {
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

    mod.hook('S_LOAD_TOPO', 3, event => {
      bahaar = (event.zone === 7004)
      hw = (event.zone === 7031)
      FA = (event.zone === 3027)
      FAA = (event.zone === 3103)
      FAAH = (event.zone === 3203)
      DA = (event.zone === 3102)
      DAH = (event.zone === 3202)
      bah = (event.zone === 9044)
      RK = (event.zone === 9735)
      RKH = (event.zone === 3034)
    });

    function sendMessage(msg) { mod.command.message(msg) }

  command.add('redirect', {
    '$default': () => {
      enabled = !enabled;
    sendMessage(enabled ? 'Redirect enabled.' : 'Redirect disabled.');
  },    
  'rk': () => {
    TPInstant();
}
});
  
  this.destructor = function() {
    command.remove('redirect');
  };
};
