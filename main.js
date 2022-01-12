import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( {alpha: true});


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setPixelRatio(window.devicePixelRatio);
//cam start position
camera.position.setZ(400);
camera.position.setX(-400);
camera.position.setY(80);


//render method
renderer.render(scene, camera);



//tours
const geometry = new THREE.TorusGeometry(350, 1, 16, 100);
const material = new THREE.MeshPhongMaterial({ color: 0xb2b2b2});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);




//load 
const loader = new GLTFLoader();

loader.load('scene/scene.gltf', function(gltf) {
  scene.add(gltf.scene);
  renderer.render(scene.camera);
}, xhr => {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded')
}, err => {
  console.error(err)
})





//light
const light1 = new THREE.HemisphereLight( 0xffffff, 0.5 );
				light1.position.set( - 1, 1.5, 1 );
				scene.add( light1 );
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-100,1000,0);
scene.add(pointLight);
//ambientlight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.6;
scene.add(light);



// control, helper
const controls = new OrbitControls(camera, renderer.domElement);
const lightHelper = new THREE.PointLightHelper(pointLight)
const GridHelper = new THREE.GridHelper(2000, 2000);
scene.add(lightHelper);


//background 
//const spaceTexture = new THREE.TextureLoader().load('bg.jpg');
//scene.background = spaceTexture;


//star
function addStar() {
  const geometry = new THREE.SphereGeometry(1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(2000).fill().forEach(addStar);
//camera route
const cameraPositions = [
  {
    start: {
      threshold: -10,
      position: {
        x: -200,
        y: 50,
        z: 300
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0
        }
    },
  end: {
      threshold: 900,
      position: {
        x: 50,
        y: 20,
        z: 80
      },
      rotation: {
        x: 0,
        y: 2,
        z: -1
      }
    }
  },
  {
  start: {
      threshold: 900,
      position: {
        x: 50,
        y: 50,
        z: 250
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0
      }
    },
    end: {
      threshold: 5500,
      position: {
        x: -40,
        y: 20,
        z: -10
      },
      rotation: {
        x: 0,
        y: 1.5,
        z: .1
      }
    }
  },

            {
              start: {
                  threshold: 5500,
                  position: {
                    x: 50,
                    y: 50,
                    z: 250
                  },
                  rotation: {
                    x: 0,
                    y: 1,
                    z: 0,
                  }
                },
                end: {
                  threshold: 6600,
                  position: {
                    x: 0,
                    y: 20,
                    z: 50
                  },
                  rotation: {
                    x: -1,
                    y: 2,
                    z: 1
                  }
                }
              },
              {
                start: {
                    threshold: 6600,
                    position: {
                      x: 0,
                      y: 20,
                      z: 50
                    },
                    rotation: {
                      x: -1,
                      y: 2,
                      z: 1,
                    }
                  },
                  end: {
                    threshold: 24000,
                    position: {
                      x: 0,
                      y: 10,
                      z: -100
                    },
                    rotation: {
                      x: 1,
                      y: -3,
                      z: 0
                    }
                  }
                },
                {
                  start: {
                      threshold: 22000,
                      position: {
                        x: -400,
                        y: 50,
                        z: 0
                      },
                      rotation: {
                        x: 0,
                        y: 1,
                        z: 0,
                      }
                    },
                    end: {
                      threshold: 39227,
                      position: {
                        x: 20,
                        y: 30,
                        z:-10
                      },
                      rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                      }
                    }
                  },
                  {
                    start: {
                        threshold: 39500,
                        position: {
                          x: 20,
                          y: 30,
                          z: -10
                        },
                        rotation: {
                          x: 0,
                          y: 0,
                          z: 0,
                        }
                      },
                      end: {
                        threshold: 46000,
                        position: {
                          x: 80,
                          y: 30,
                          z:-50
                        },
                        rotation: {
                          x: 0,
                          y: 3,
                          z: -.5
                        }
                      }
                    },
                    {
                      start: {
                          threshold: 46000,
                          position: {
                            x: 80,
                            y: 30,
                            z:-50
                          },
                          rotation: {
                            x: 0,
                            y: 3,
                            z: -.5
                          }
                        },
                        end: {
                          threshold: 50000,
                          position: {
                            x: -150,
                            y: 30,
                            z:500
                          },
                          
                          rotation: {
                            x: 3,
                            y: 8,
                            z: 4
                          }
                        }
                      },
]


//rotate cam
function moveCamera() {
  const t = document.body.getBoundingClientRect().top * -1;


  // camera.position.z = t * 0.1;
  // camera.position.z = t * 0.1;
  //camera.rotation.y = t * -0.1;

  console.log(`t: ${t}`)

  for (const cameraPosition of cameraPositions) {
    if (t >= cameraPosition.start.threshold && t <= cameraPosition.end.threshold) {
      let progress = (t - cameraPosition.start.threshold)/(cameraPosition.end.threshold - cameraPosition.start.threshold);
      camera.position.x = lerp(cameraPosition.start.position.x, cameraPosition.end.position.z, progress);
      camera.position.y = lerp(cameraPosition.start.position.y, cameraPosition.end.position.y, progress);
      camera.position.z = lerp(cameraPosition.start.position.z, cameraPosition.end.position.z, progress);
      camera.rotation.x = lerp(cameraPosition.start.rotation.x, cameraPosition.end.rotation.x, progress);
      camera.rotation.y = lerp(cameraPosition.start.rotation.y, cameraPosition.end.rotation.y, progress);
      camera.rotation.z = lerp(cameraPosition.start.rotation.z, cameraPosition.end.rotation.z, progress);
      console.log(`Progress: ${progress}`)
      console.log(`Camera Position X: ${camera.position.z}`)
      break;
    }
  }
}

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

document.body.onscroll = moveCamera;
moveCamera();




//animate
const animate = function () {
  requestAnimationFrame( animate );
  torus.rotation.x += 0.03;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.03;

  renderer.render( scene, camera );
};

animate();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}