const Vec3 = require('tera-vec3');
const config = require("./config.json");

module.exports = function Redirect(mod) {
 const command = mod.command || mod.require.command;

  let enabled = config.enabled,
      ba = config.ba,
      bahaar,
      hw

  const hwredeem = new Vec3(22205, 4870, 6191);  //base pos H tp
  const hwtp = new Vec3(21222, 5919, 6216);  //base pos book tp
  const bahaarH = new Vec3(115023, 90044, 6377); //base pos H tp
  const hwcraft = new Vec3(21566, 1531, 5857); //Craft HW

  mod.hook('S_SPAWN_ME', 3, event => {
    if (!enabled) return;
    if (hw && hwredeem.dist3D(event.loc) <= 5 || hwtp.dist3D(event.loc) <= 5){
    event.loc = new Vec3(19297, 4132, 6191) //banker
    return true
    }
    if (bahaar && bahaarH.dist3D(event.loc) <= 5){
    event.loc = new Vec3(115321, 96917, 7196) //TP enter
    return true
    }
  });

    mod.hook('S_LOAD_TOPO', 3, event => {
      bahaar = (event.zone === 7004)
      hw = (event.zone === 7031)
    });

    function sendMessage(msg) { mod.command.message(msg) }

  command.add('redirect', {
    'hw': () => {
    enabled = !enabled;
    sendMessage(enabled ? 'Highwatch Redirect enabled.' : 'Highwatch Redirect disabled.');
  },
    'ba': () => {
    ba = !ba;
    sendMessage(enabled ? 'Bahaar Redirect enabled.' : 'Bahaar Redirect disabled.');
  },
  '$default': () => {
    sendMessage(`Invalid argument. usasge command with 'redirect'`),
    sendMessage(`hw | Hw redirecting`),
    sendMessage(`ba | Bahaar redirecting`);
  }
});
  
  this.destructor = function() {
    command.remove('hw', 'ba');
  };
};
