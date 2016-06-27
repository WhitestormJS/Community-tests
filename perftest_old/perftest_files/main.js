
$(window).load(function() {
  initWhiteStorm()
  $(document).click(clicktest)
})

function clicktest() {
  //WORLD.man.position.y = 50

  var tl = new TimelineLite();
  tl.to(WORLD.man.position, .3, {
    y:50,
    ease: Power1.easeOut
  }).to(WORLD.man.position, .3, {
    y:0,
    ease: Power1.easeIn
  });
}

var WORLD

var rows = 3;
var columns = 5;
var dist = 25;
var firstR = -rows/2 * dist;
var firstC = -columns/2 * dist;

function initWhiteStorm() {
  var preloader = Preloader();
  console.log('making world')
  WORLD = new WHS.World({

      stats: "fps",
      autoresize: true,

      gravity: {
              x: 0,
              y: -100,
              z: 0
      },

      camera: {
              far: 10000,
              y: 100,
              z: 300
      }

  });

  WORLD.man_0_0 = WORLD.Model({

      geometry: {
          path: "3d/man.json",
      },

      mass: 0,
      physics: false,

      material: {
          shading: THREE.SmoothShading,
          kind: "phong",
          side: THREE.DoubleSide,
          useCustomMaterial: false,
          rest: 0,
          fri: 1
      },

      pos: {
          x: firstR,
          y: 0,
          z: firstC
      },

      scale: {
        x: 20,
        y: 20,
        z: 20
      },

      rot: {
          y: 0
      }

  });

  setTimeout(function() {
    var start = performance.now();

    for (var i=0; i<=columns; i++) {
      for (var j=0; j<=rows; j++) {
        // Skip absolute first
        if (i>0 || j>0) {
          WORLD['man_'+i+'_'+j] = WORLD.man_0_0.clone();
          WORLD['man_'+i+'_'+j].setPosition( firstR + (i*dist), 0, firstC + (j*dist) )
          WORLD['man_'+i+'_'+j].addTo(WORLD)
          console.log(WORLD['man_'+i+'_'+j].position.z)
        }
      }

      var end = performance.now();
      var time = end - start;
    }

    console.log('Execution time: ' + time);
  }, 1000);


  WORLD.ground = WORLD.Box({

      geometry:{
          width: 250,
          height: 1,
          depth: 250
      },

      mass: 0,

      material: {
          color: 0xff0000,
          kind: "phong"
      },

      pos: {
          x: 0,
          y: 0,
          z: 0
      }

  });

  WORLD.light = WORLD.DirectionalLight({

          color: 0x00FF00,
          intensity: 0.1,

          pos: {
              x: 10,
              y: 60,
              z: 30
          },

          target: {
              x: 0,
              y: 0,
              z: 0
          }
  });

  WORLD.OrbitControls();

  WORLD.start();

  preloader.check();
}
