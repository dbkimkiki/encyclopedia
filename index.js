//https://obfuscator.io/
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
//import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/RGBELoader.js';
import { CSS2DObject, CSS2DRenderer } from 'https://unpkg.com/three@0.119.1/examples/jsm/renderers/CSS2DRenderer.js';
//import {OBJLoader2} from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/OBJLoader2.js';
//import {MTLLoader} from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/MTLLoader.js';
//import {MtlObjBridge} from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';
import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js';

let existingContents = ['0', '1', '4', '10', 'about'];
var contentNum = '0';
let isLazy = [true, false, false, false, true, false, false, false, false, false, true];

var isDebug = false;
var container, controls, progressBar, threejsElement;
var camera, scene, renderer;
var labelRenderer;
var bgTexture;

var light;
let useLight = false;

let preventScroll = true;

if(useLight)
{
  light = new THREE.PointLight(0xFF4400, 1);
  light.position.set(0,0,1);
} 
let lightIntensity = 0.5;

var preventDefault = false;

var allLoaded = false;
var loadingValue = 0;
var totalObjects = 9 + 14 + 3 + 3;

var limitFramerate = false;
var framerate = 30;

var stats;
var showStats = false;

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if(mobileCheck())
{
  
}

let focusStartObject;
let focusStartObjectLoaded = false;

// Camera Setting
{
  var camPosX = 0; // -x to x is left to right
  var camPosY = 0; // y is camera up and down
  var camPosZ = 10; // +z farther from origin, -z into the origin
  var fov = 30;
  var aspect = window.innerWidth / window.innerHeight;
  var near = 0.25;
  var far = 20;
}


var useControls = true;
var showGrid = false;

var orbitHeight = 5;
var orbitLength = orbitHeight * 1.465;

var selectableObjects = [];

{
var planets = [];
var planetScale = [0.1, 1.1, 1.0, 1.0, 1.0, 1.0, 1.0, 1.2, 0.9];
var planetRotation = [0.3, 0.8, 1.2, 1.0, 0.5, 0.56, 0.7, 0.6, 0.3, 1.0];
var planetRevolution = [0.01, 0.06, 0.05, 0.045, 0.037, 0.026, 0.021, 0.012, 0.007, 0.002];
var planetOrbitX = [0, 0.3, 0.5, 0.7, 0.88, 1.35, 1.75, 2.1, 2.6, 3.4];
var planetOrbitY = [0, 0.3, 0.5, 0.7, 0.84, 1.25, 1.65, 2.05, 2.45, 2.7];
var planetTiltOffset = [0, -0.1, -0.12, -0.08, 0.2, 0.26, -0.14, 0.1, 0.22, 0.1];
var planetRotationOffset = [0, 2.0, 0.5, 3, 0.88, 1.35, 11.75, -2.1, 2.6, 4];
var planetRevolutionOffset = [0, 5, 0.5, 3, 0.88, 1.35, 11.75, -2.1, 2.6, 4];
var planetDestZ = [8.9, 9.2, 9, 9, 9, 8.6, 8.8, 8.8, 8.4];
var planetExhibition = [false, true, false, true, false, false, false, false, false];
var planetReferencePrefix = [1, 2, 3, 4, 6, 9, 14, 22, 23];
var planetNumOfReferences = [23, 23, 23, 26, 17, 13, 17, 25, 30];
var planetName = ["Sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

// 4-1
var moon;
var moonScale = 0.32;
var moonRotation = 0.3;
var moonRevolution = 1; 
var moonOrbitX = 0.18; 
var moonOrbitY = 0.18; 
var moonTiltOffset = 0.05;
var moonRotationOffset = 0;
var moonRevolutionOffset = 0;
var moonDestZ = 9.4;
var moonReferencePrefix = 5;
var moonNumOfReferences = 21;
var moonName = "Moon";

// 5-1, 5-2
var marsMoon = [];
var marsMoonScale = [0.65, 0.65];
var marsMoonRotation = [0.3, 0.8];
var marsMoonRevolution = 0.5; 
var marsMoonOrbitX = 0.16; 
var marsMoonOrbitY = 0.16; 
var marsMoonTiltOffset = [0.4, -0.25];
var marsMoonRotationOffset = [0, 5];
var marsMoonRevolutionOffset = [0, Math.PI];
var marsMoonDestZ = [9.3, 9.3];
var marsMoonReferencePrefix = [7, 8];
var marsMoonNumOfReferences = [8, 6];
var marsMoonName = ["Phobos", "Deimos"];

// 6-1, 6-2, 6-3, 6-4
var jupiterMoon = [];
var jupiterMoonScale = [0.6, 0.6, 0.7, 1.8]; //milk, soccer, water, teddy
var jupiterMoonRotation = [0.6, 0.8, 1.2, 1.0];
var jupiterMoonRevolution = 0.4; 
var jupiterMoonOrbitX = 0.27; 
var jupiterMoonOrbitY = 0.27; 
var jupiterMoonTiltOffset = [0, -0.1, -0.12, -0.08];
var jupiterMoonRotationOffset = [0, 5, 0.5, 3];
var jupiterMoonRevolutionOffset = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
var jupiterMoonDestZ = [9.2, 9.3, 9.3, 9.3];
var jupiterMoonReferencePrefix = [10, 11, 12, 13];
var jupiterMoonNumOfReferences = [11, 22, 11, 11];
var jupiterMoonName = ["Io", "Europa", "Ganimede", "Callisto"];

// 7-1 ~ 7-7
var saturnMoon = [];
var saturnMoonScale = [0.9, 1.2, 1.1, 1.4, 0.65, 0.7, 0.9]; //bread, candle, duck, soap, confrost, pan, driver
var saturnMoonRotation = [0.4, 0.8, 1.2, 1.0, 1.0, 1.0, 1.0];
var saturnMoonRevolution = 0.3; 
var saturnMoonOrbitX = 0.3; 
var saturnMoonOrbitY = 0.3; 
var saturnMoonTiltOffset = [0, -0.1, -0.12, -0.08, -0.1, -0.12, -0.08];
var saturnMoonRotationOffset = [0, 5, 0.5, 3, 5, 0.5, 3];
var saturnMoonRevolutionOffset = [0, 2*Math.PI/7, 2*Math.PI/7*2, 2*Math.PI/7*3, 2*Math.PI/7*4, 2*Math.PI/7*5, 2*Math.PI/7*6];
var saturnMoonDestZ = [9.4, 9.4, 9.2, 9.3, 9.4, 9.2, 9.4];
var saturnMoonReferencePrefix = [15, 16, 17, 18, 19, 20, 21];
var saturnMoonNumOfReferences = [12, 13, 25, 14, 13, 24, 15];
var saturnMoonName = ["Mimas", "Enceladus", "Tethys", "Dione", "Rhea", "Titan", "Iapetus"];

// belt
var beltOriginXInitialLandscape = 2.6;
var beltOriginYInitialLandscape = 2.0;
var beltOriginXInitialPortrait = 1.1;
var beltOriginYInitialPortrait = 2.2;
var beltOriginXInitial, beltOriginYInitial;

if(window.innerHeight > window.innerWidth){
  beltOriginXInitial = beltOriginXInitialPortrait;
  beltOriginYInitial = beltOriginYInitialPortrait;
}
else
{
  beltOriginXInitial = beltOriginXInitialLandscape;
  beltOriginYInitial = beltOriginYInitialLandscape;
}

var beltOriginX = beltOriginXInitial;
var beltOriginY = beltOriginYInitial;
var beltOriginChanged = false;
var belt = [];
var beltScale = [0.2, 0.2, 0.2];
var beltRotation = [0.5, 0.8, 0.8];
var beltRevolution = 0.3; 
var beltOrbitX = 0.16; 
var beltOrbitY = 0.16; 
var beltTiltOffset = [0.4, -0.25, 0.1];
var beltRotationOffset = [0, 5, 3];
var beltRevolutionOffset = [0, 2*Math.PI/3, 2*Math.PI/3*2];
var beltDestZ = 8.3;
var beltNumOfReferences = 50;
var beltName = "Kuiper Belt";
}

var orbitMaterial, lightMaterial, blackMaterial;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var outlinePass;

var isFocused = false;
var inAnimation = false;
var focusedObject = null;
var isCancel = false;

var destFrame = 30;
var curFrame = 0;
var destZ = 8.5;
var sourceX = 0;
var sourceY = 0;

var isProjectEncyclopedia = false;
var projectEncyclopediaDisabledOpacity = 0.0;

var backgroundScale = 1.0;
var backgroundOpacity = 0.25;
var backgroundImg;

var zoomSmaller;

class PickHelper {

  constructor() 
  {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }

  pick(normalizedPosition, scene, camera, objectArray, _destZ) 
  {
    if (this.pickedObject) 
    {
      isFocused = false;
      this.pickedObject = undefined;
      if(focusedObject)
      {
        focusedObject.parent.position.z = 0;
        if(focusedObject.isBelt)
        {
         
          beltOriginX = beltOriginXInitial;
          beltOriginY = beltOriginYInitial;
          for(let k=0;k<3;k++)
          {
            belt[k].parent.position.z = 0;
          }
        }
      }
        
      blackMaterial.opacity = 0.0;
      document.getElementById ("project-encyclopedia-about").style.opacity = 1.0;
      document.getElementById ("project-encyclopedia").style.opacity = 1.0;
      document.getElementById ("content").style.opacity = 0.0;

      document.getElementById ("exhibition-label-1").style.opacity = 1.0;
      document.getElementById ("exhibition-label-4").style.opacity = 1.0;
      document.getElementById ("exhibition-label-10").style.opacity = 1.0;
      
      focusedObject = undefined;
      curFrame = 0;
      for(let k=0;k<scene.children.length;k++)
      {
        scene.children.opacity = 1.0;
      }
      $('#content').css('display', 'none');
      document.getElementById('c').getElementsByTagName('canvas')[0].style.pointerEvents = 'auto';
    }
 
    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);

    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(objectArray, true);

    if (intersectedObjects instanceof Array && intersectedObjects.length) 
    {
      // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object;

      while(this.pickedObject.parent!=null && this.pickedObject.type!=='Object3D')
      {
        this.pickedObject = this.pickedObject.parent;
      }

      while(this.pickedObject.parent!=null && this.pickedObject.parent.type=='Object3D')
      {
        this.pickedObject = this.pickedObject.parent;
      }

      console.log(this.pickedObject);
      focusedObject = this.pickedObject;
      
      document.getElementById('c').getElementsByTagName('canvas')[0].style.pointerEvents = 'none';

      destZ = focusedObject.destZ;
      isFocused = true;

      showContent();
    }
    
  }
}
const pickPosition = {x: 0, y: 0};
const pickHelper = new PickHelper();
clearPickPosition();

init();

function init() {

  container = document.querySelector('#c');
  progressBar = document.getElementById("load-progress");
  resizeContent();


  if(showStats)
  {
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
  }

  scene = new THREE.Scene();

  // CAMERA SETTINGS
  {
    
    aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set(camPosX, camPosY, camPosZ);
    camera.updateProjectionMatrix();

    if(aspect < 0.7)
    {
      zoomSmaller = true;
    }
    else
    {
      zoomSmaller = false;
    }

  }
  
  // ORBIT & LIGHT PLANE
  {
    // BACKGROUND
    const loader = new THREE.TextureLoader();
    bgTexture = loader.load('background_lg.jpg', function() {
      console.log('Background Loaded');
      checkLoadedObjects();
    });
    
    var backgroundMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    backgroundMaterial.opacity = backgroundOpacity;
    //scene.background = backgroundMaterial;

    const orbitGeometry = new THREE.PlaneBufferGeometry(orbitLength, orbitHeight);
    //const backgroundGeometry = new THREE.PlaneBufferGeometry(4689, 3659);
    const backgroundGeometry = new THREE.PlaneBufferGeometry(orbitLength*2, orbitHeight*2);
    const blackGeometry = new THREE.PlaneBufferGeometry(30, 30);
    var orbitLoader = new THREE.TextureLoader();
    var orbitTexture = orbitLoader.load('resource/orbits.png', function() {
      console.log('Orbit Loaded');
      checkLoadedObjects();
    });
    var lightTexture = orbitLoader.load('resource/light.png', function() {
      console.log('Light Loaded');
      checkLoadedObjects();
    });
    orbitMaterial = new THREE.MeshBasicMaterial({
      map: orbitTexture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    lightMaterial = new THREE.MeshBasicMaterial({
      map: lightTexture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000, transparent: true});
    blackMaterial.opacity = 0.0;
    document.getElementById ("project-encyclopedia").style.opacity = 1.0;
    document.getElementById ("project-encyclopedia-about").style.opacity = 1.0;
    document.getElementById ("content").style.opacity = 0.0;
    const orbitImg = new THREE.Mesh(orbitGeometry, orbitMaterial);
    const lightImg = new THREE.Mesh(orbitGeometry, lightMaterial);
    const blackScreen = new THREE.Mesh(blackGeometry, blackMaterial);
    backgroundImg = new THREE.Mesh(backgroundGeometry, backgroundMaterial);

    orbitImg.position.x = -0.09;
    orbitImg.position.y = 0.15;
    orbitImg.position.z = 0;
    lightImg.position.x = -0.09;
    lightImg.position.y = 0.15;
    lightImg.position.z = 0;
    blackScreen.position.z = 1;
    backgroundImg.position.z = -0.1;
    backgroundImg.scale.x = backgroundScale;
    backgroundImg.scale.y = backgroundScale;
    lightImg.scale.x = 1.5;
    lightImg.scale.y = 1.5;

    scene.add(orbitImg);
    scene.add(lightImg);
    scene.add(blackScreen);
    scene.add(backgroundImg);
  }


  


  new RGBELoader()
    .setDataType( THREE.UnsignedByteType )
    .load( 'royal_esplanade_1k.hdr', function ( texture ) {
      
      var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

      scene.environment = envMap;
      
      texture.dispose();
      pmremGenerator.dispose();


      if(showGrid)
      {
        var gridHelper = new THREE.GridHelper( 28, 28, 0x303030, 0x303030 );
        scene.add( gridHelper );
      }

      var loader = new GLTFLoader();

      for(let i=1;i<=9;i++)
      {
        loader.load( 'resource/'+i.toString()+'.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
          }
        } );

        var objScale = planetScale[i-1];
        gltf.scene.children[0].scale.x = objScale;
        gltf.scene.children[0].scale.y = objScale;
        gltf.scene.children[0].scale.z = objScale;
        gltf.scene.rotation.z = planetTiltOffset[i-1];

        scene.add( gltf.scene );
        planets[i-1]=gltf.scene.children[0];

        planets[i-1].orbitX = planetOrbitX[i-1];
        planets[i-1].orbitY = planetOrbitY[i-1];
        planets[i-1].revolution = planetRevolution[i-1];
        planets[i-1].revolutionOffset = planetRevolutionOffset[i-1];
        planets[i-1].destZ = planetDestZ[i-1];
        planets[i-1].isMoon = false;
        planets[i-1].isBelt = false;
        planets[i-1].isExhibition = planetExhibition[i-1];
        planets[i-1].directoryName = i.toString();
        planets[i-1].referencePrefix = planetReferencePrefix[i-1].toString();
        planets[i-1].numOfReferences = planetNumOfReferences[i-1];
        planets[i-1].name = planetName[i-1];

        //if(i==2) focusStartObject = gltf.scene.children[0];

        selectableObjects.push(gltf.scene.children[0]);
        if(isDebug)
        {
          console.log(planets[i-1]);
          console.log('Object '+i+' Loaded');
        }
        
        if(planets[i-1].isExhibition)
        {
          let labelDiv = document.createElement( 'div' );
          labelDiv.className = 'exhibition-label';
          if(i==2)
          {
            labelDiv.textContent = 'Mercury Play Back';
            labelDiv.id = 'exhibition-label-1';
          }
          else if(i==4)
          {
            labelDiv.textContent = 'Planet 72.82m2';
            labelDiv.id = 'exhibition-label-4';
          }
          
          labelDiv.style.marginTop = '-1em';
          var exhibitionLabel = new CSS2DObject( labelDiv );
          //exhibitionLabel.position.set( 0, Sensor.threeSensorRadius * 1.5, 0 );
          gltf.scene.add( exhibitionLabel );
        }



        checkLoadedObjects();
        
        } );
      }
      {
        loader.load( 'resource/4-1'.toString()+'.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
          }
        } );

        var objScale = moonScale;
        gltf.scene.children[0].scale.x = objScale;
        gltf.scene.children[0].scale.y = objScale;
        gltf.scene.children[0].scale.z = objScale;
        gltf.scene.rotation.z = moonTiltOffset;
        

        scene.add( gltf.scene );
        moon=gltf.scene.children[0];

        moon.orbitX = moonOrbitX;
        moon.orbitY = moonOrbitY;
        moon.revolution = moonRevolution;
        moon.revolutionOffset = moonRevolutionOffset;
        moon.destZ = moonDestZ;
        moon.isMoon = true;
        moon.planetIndex = 3;
        moon.isBelt = false;
        moon.isExhibition = false;
        moon.directoryName = '4-1';
        moon.referencePrefix = moonReferencePrefix.toString();
        moon.numOfReferences = moonNumOfReferences;
        moon.name = moonName;
      
        selectableObjects.push(gltf.scene.children[0]);
        if(isDebug)
        {
          console.log(moon);
          console.log('Object 4-1 Loaded');
        }
        
        

        checkLoadedObjects();
        } );
      }
      for(let i=1;i<=2;i++)
      {
        loader.load( 'resource/5-'+i.toString()+'.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
          }
        } );

        var objScale = marsMoonScale[i-1];
        gltf.scene.children[0].scale.x = objScale;
        gltf.scene.children[0].scale.y = objScale;
        gltf.scene.children[0].scale.z = objScale;
        gltf.scene.rotation.z = marsMoonTiltOffset[i-1];
        

        scene.add( gltf.scene );
        marsMoon[i-1]=gltf.scene.children[0];

        marsMoon[i-1].orbitX = marsMoonOrbitX;
        marsMoon[i-1].orbitY = marsMoonOrbitY;
        marsMoon[i-1].revolution = marsMoonRevolution;
        marsMoon[i-1].revolutionOffset = marsMoonRevolutionOffset[i-1];
        marsMoon[i-1].destZ = marsMoonDestZ[i-1];
        marsMoon[i-1].isMoon = true;
        marsMoon[i-1].planetIndex = 4;
        marsMoon[i-1].isBelt = false;
        marsMoon[i-1].isExhibition = false;
        marsMoon[i-1].directoryName = '5-'+i.toString();
        marsMoon[i-1].referencePrefix = marsMoonReferencePrefix[i-1].toString();
        marsMoon[i-1].numOfReferences = marsMoonNumOfReferences[i-1];
        marsMoon[i-1].name = marsMoonName[i-1];

        selectableObjects.push(gltf.scene.children[0]);
        if(isDebug)
        {
          console.log(marsMoon[i-1]);
          console.log('Object 5-'+i+' Loaded');
        }
        
        
        checkLoadedObjects();

        } );
      }
      for(let i=1;i<=4;i++)
      {
        loader.load( 'resource/6-'+i.toString()+'.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
          }
        } );

        var objScale = jupiterMoonScale[i-1];
        gltf.scene.children[0].scale.x = objScale;
        gltf.scene.children[0].scale.y = objScale;
        gltf.scene.children[0].scale.z = objScale;
        gltf.scene.rotation.z = jupiterMoonTiltOffset[i-1];

        scene.add( gltf.scene );
        jupiterMoon[i-1]=gltf.scene.children[0];

        jupiterMoon[i-1].orbitX = jupiterMoonOrbitX;
        jupiterMoon[i-1].orbitY = jupiterMoonOrbitY;
        jupiterMoon[i-1].revolution = jupiterMoonRevolution;
        jupiterMoon[i-1].revolutionOffset = jupiterMoonRevolutionOffset[i-1];
        jupiterMoon[i-1].destZ = jupiterMoonDestZ[i-1];
        jupiterMoon[i-1].isMoon = true;
        jupiterMoon[i-1].planetIndex = 5;
        jupiterMoon[i-1].isBelt = false;
        jupiterMoon[i-1].isExhibition = false;
        jupiterMoon[i-1].directoryName = '6-'+i.toString();
        jupiterMoon[i-1].referencePrefix = jupiterMoonReferencePrefix[i-1].toString();
        jupiterMoon[i-1].numOfReferences = jupiterMoonNumOfReferences[i-1];
        jupiterMoon[i-1].numOfReferences = jupiterMoonNumOfReferences[i-1];
        jupiterMoon[i-1].name = jupiterMoonName[i-1];

        selectableObjects.push(gltf.scene.children[0]);
        if(isDebug)
        {
          console.log(jupiterMoon[i-1]);
          console.log('Object 6-'+i+' Loaded');
        }
        
       
        checkLoadedObjects();
        } );
      }
      for(let i=1;i<=7;i++)
      {
        loader.load( 'resource/7-'+i.toString()+'.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
          }
        } );
        var objScale = saturnMoonScale[i-1];
        gltf.scene.children[0].scale.x = objScale;
        gltf.scene.children[0].scale.y = objScale;
        gltf.scene.children[0].scale.z = objScale;
        gltf.scene.rotation.z = saturnMoonTiltOffset[i-1];

        scene.add( gltf.scene );
        saturnMoon[i-1]=gltf.scene.children[0];

        saturnMoon[i-1].orbitX = saturnMoonOrbitX;
        saturnMoon[i-1].orbitY = saturnMoonOrbitY;
        saturnMoon[i-1].revolution = saturnMoonRevolution;
        saturnMoon[i-1].revolutionOffset = saturnMoonRevolutionOffset[i-1];
        saturnMoon[i-1].destZ = saturnMoonDestZ[i-1];
        saturnMoon[i-1].isMoon = true;
        saturnMoon[i-1].planetIndex = 6;
        saturnMoon[i-1].isBelt = false;
        saturnMoon[i-1].isExhibition = false;
        saturnMoon[i-1].directoryName = '7-'+i.toString();
        saturnMoon[i-1].referencePrefix = saturnMoonReferencePrefix[i-1].toString();
        saturnMoon[i-1].numOfReferences = saturnMoonNumOfReferences[i-1];
        saturnMoon[i-1].name = saturnMoonName[i-1];

        selectableObjects.push(gltf.scene.children[0]);
        if(isDebug)
        {
          console.log(saturnMoon[i-1]);
          console.log('Object 7-'+i+' Loaded');
        }
        
        
        checkLoadedObjects();
        } );
      }
      for(let i=1;i<=3;i++)
      {
        loader.load( 'resource/10-'+i.toString()+'.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
          }
        } );

        var objScale = beltScale[i-1];
        gltf.scene.children[0].scale.x = objScale;
        gltf.scene.children[0].scale.y = objScale;
        gltf.scene.children[0].scale.z = objScale;
        gltf.scene.rotation.z = beltTiltOffset[i-1];

        scene.add( gltf.scene );
        belt[i-1]=gltf.scene.children[0];

        belt[i-1].orbitX = beltOrbitX;
        belt[i-1].orbitY = beltOrbitY;
        belt[i-1].revolution = beltRevolution;
        belt[i-1].revolutionOffset = beltRevolutionOffset[i-1];
        belt[i-1].destZ = 8.5;
        belt[i-1].isMoon = false;
        belt[i-1].isBelt = true;
        belt[i-1].isExhibition = true;
        belt[i-1].directoryName = '10';
        belt[i-1].referencePrefix = '';
        belt[i-1].numOfReferences = beltNumOfReferences;
        belt[i-1].name = beltName;

        selectableObjects.push(gltf.scene.children[0]);
        if(isDebug)
        {
          console.log(belt[i-1]);
          console.log('Object 10-'+i+' Loaded');
        }

        if(i==1)
        {
          let labelDiv = document.createElement( 'div' );
          labelDiv.className = 'exhibition-label';
          labelDiv.id = 'exhibition-label-10';

          labelDiv.textContent = 'About Ground Water Light and Air';

          
          labelDiv.style.marginTop = '-1em';
          var exhibitionLabel = new CSS2DObject( labelDiv );
          //exhibitionLabel.position.set( 0, Sensor.threeSensorRadius * 1.5, 0 );
          gltf.scene.add( exhibitionLabel );
        }
          
        
        
        
        checkLoadedObjects();
        } );
      }


      /*
      var objLoader = new OBJLoader2();

      // load a resource
      

      {
        let i = 5;
        const mtlLoader = new MTLLoader();
        mtlLoader.load('resource/7-'+i.toString()+'.mtl', (mtlParseResult) => {
          const objLoader = new OBJLoader2();
          const materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
          //objLoader.addMaterials(materials);
          objLoader.load('resource/7-'+i.toString()+'.obj', (object) => {
            //scene.add(object);
    
            // compute the box that contains all the stuff
            // from root and below
           let objScene = new THREE.Scene();
          
           
           var objScale = saturnMoonScale[i-1];
           objScale /=700;
           object.scale.x = objScale;
           object.scale.y = objScale;
           object.scale.z = objScale;
           objScene.position.x=0;
           objScene.position.y=0;
           objScene.position.z=0;
           objScene.add(object);
           objScene.rotation.z = saturnMoonTiltOffset[i-1];
           
           scene.add( objScene );
           saturnMoon[i-1]=object;
 
           saturnMoon[i-1].orbitX = saturnMoonOrbitX;
           saturnMoon[i-1].orbitY = saturnMoonOrbitY;
           saturnMoon[i-1].revolution = saturnMoonRevolution;
           saturnMoon[i-1].revolutionOffset = saturnMoonRevolutionOffset[i-1];
           saturnMoon[i-1].destZ = saturnMoonDestZ[i-1];
           saturnMoon[i-1].isMoon = true;
           saturnMoon[i-1].planetIndex = 6;
           saturnMoon[i-1].isBelt = false;
           saturnMoon[i-1].isExhibition = false;
           saturnMoon[i-1].directoryName = '7-'+i.toString();
           saturnMoon[i-1].referencePrefix = saturnMoonReferencePrefix[i-1].toString();
           saturnMoon[i-1].numOfReferences = saturnMoonNumOfReferences[i-1];
           saturnMoon[i-1].name = saturnMoonName[i-1];
 
           selectableObjects.push(object);
           console.log(saturnMoon[i-1]);
           console.log('Object 7-'+i+' Loaded');
           
           checkLoadedObjects();
          });
        });
      }
      */
      if(useLight)
      {
        scene.add(light);
      }


      

    } );

  

  // RENDERER & CONTAINER
  {
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    threejsElement = container.appendChild( renderer.domElement );

    labelRenderer = new CSS2DRenderer();
		labelRenderer.setSize( window.innerWidth, window.innerHeight );
		labelRenderer.domElement.style.position = 'absolute';
		labelRenderer.domElement.style.top = '0px';
		labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild( labelRenderer.domElement );
    

    /*
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.left = '0px';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.zIndex = '-1';
    */
    var pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();
  }
  
  // ORBIT CONTROLS
  if(useControls)
  {
    controls = new OrbitControls( camera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // use if there is no animation loop
    //controls.minDistance = 2;
    controls.minDistance = 6;
    //controls.maxDistance = 10;
    if(isDebug)
    {
      controls.maxDistance = 20;
    }
    else
    {
      controls.maxDistance = 11;
    }
    
    controls.mouseButtons = {
      // LEFT: THREE.MOUSE.ROTATE,
      // MIDDLE: THREE.MOUSE.DOLLY,
      // RIGHT: THREE.MOUSE.PAN
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY
    };
    controls.touches = {
      // ONE: THREE.TOUCH.ROTATE,
      // TWO: THREE.TOUCH.DOLLY_PAN
      ONE: THREE.TOUCH.DOLLY_PAN,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.target.set( 0, 0, - 0.2 );
    var minPan = new THREE.Vector3( - 2, -1, -0.2 );
    var maxPan = new THREE.Vector3( 2, 1, -0.2 );
    var _v = new THREE.Vector3();
    
    controls.addEventListener("change", function() {
        _v.copy(controls.target);
        controls.target.clamp(minPan, maxPan);
        _v.sub(controls.target);
        camera.position.sub(_v);
        //console.log(controls.position0.z);
    })

    //createLimitPan({camera, controls, THREE});
    controls.update();
    //console.log(controls.position0);
  }

  // EVENT LISTENERS
  {
    window.addEventListener('resize', onWindowResize, false);
    //window.addEventListener('deviceorientation', onWindowResize, false);
    window.addEventListener('orientationchange', onWindowResize, false);

    //window.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);
    window.addEventListener('mouseleave', clearPickPosition);
    
    window.addEventListener('touchstart', (event) => {
      if(allLoaded==true&&isFocused==false)
      {
        // prevent the window from scrolling
        if(preventDefault) event.preventDefault();
        setPickPosition(event.touches[0]);
        //clickObject(event);
      }
    }, {passive: false});
    
    
    window.addEventListener('touchmove', (event) => {
      if(allLoaded==true&&isFocused==false)
      {
        setPickPosition(event.touches[0]);
      }
    });
    
    document.getElementById('c').addEventListener('touchmove', function (event) {
      if (isFocused && event.scale !== 1) { event.stopPropagation(); }
    }, false);

    document.getElementById('content').addEventListener('touchmove', function (event) {
      if (event.scale !== 1) { event.stopPropagation(); }
    }, false);

    var lastTouchEnd = 0;
    document.getElementById('content').addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
/*
    window.addEventListener('touchend', clearPickPosition);
*/


    window.addEventListener('pointerdown', clickObject);
    //window.addEventListener('touchstart', clickObject);
    document.addEventListener('touchend', onDocumentTouchEnd, false);

    function onDocumentTouchEnd(event) {
      if(allLoaded==true&&isFocused==false)
      {
        if(preventDefault) event.preventDefault();

        mouse.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;

      
        pickHelper.pick(pickPosition, scene, camera, selectableObjects, planetDestZ);
      }

    }
  }

  
}

function clickObject( event ) {
  if(allLoaded==true&&isFocused==false)
  {
    pickHelper.pick(pickPosition, scene, camera, selectableObjects, planetDestZ);
  }

  
  //console.log('clicked');
}

function getCanvasRelativePosition(event) {
  const rect = container.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * container.width  / rect.width,
    y: (event.clientY - rect.top ) * container.height / rect.height,
  };
}
 
function setPickPosition(event) {
  let method = 2;

  if(method == 1)
  { 
    const pos = getCanvasRelativePosition(event);
    // pickPosition.x = pos.x;
    // pickPosition.y = pos.y;
    //console.log('pos : '+ pos.x+', '+pos.y);
    pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;
  }
  else
  {
    pickPosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pickPosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  
  //console.log('mouse : '+ mouse.x+', '+mouse.y);
}
 
function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}

function onWindowResize() {
  console.log('Window is resized.')
 
  let windowAspect = window.innerWidth / window.innerHeight;
  camera.aspect = windowAspect;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  labelRenderer.setSize( window.innerWidth, window.innerHeight );

  const canvasAspect = container.clientWidth / container.clientHeight;
  const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1;
  const aspect = imageAspect / canvasAspect;

  /*
  if(canvasAspect>imageAspect)
  {
    backgroundImg.scale.x = backgroundScale / aspect;
  }
  */
  // bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
  // bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1;
 
  // bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
  // bgTexture.repeat.y = aspect > 1 ? 1 : aspect;

  if(window.innerHeight > window.innerWidth){
    beltOriginXInitial = beltOriginXInitialPortrait;
    beltOriginYInitial = beltOriginYInitialPortrait;
  }
  else
  {
    beltOriginXInitial = beltOriginXInitialLandscape;
    beltOriginYInitial = beltOriginYInitialLandscape;
  }
  beltOriginChanged = true;

  if(windowAspect < 0.7)
  {
    zoomSmaller = true;
  }
  else
  {
    zoomSmaller = false;
  }
  //render();
  
  resizeContent();
  //renderer.render( scene, camera );
}

function render(time) {

  if(showStats) stats.begin();

  time *= 0.001;  // convert time to seconds

  if(allLoaded)
  {
    controls.saveState();
    let screenOriginX = controls.position0.x;
    let screenOriginY = controls.position0.y;
    let screenOriginZOffset = controls.position0.z - 10;
    if(zoomSmaller) screenOriginZOffset -= 0.5;
    //console.log(screenOriginX+','+screenOriginY);

    /*
    if(focusStartObject && !focusStartObjectLoaded)
    {
      focusStartObjectLoaded = true;
      focusOn(focusStartObject);
    }
    */
    for(let i=1;i<=9;i++)
    {

      try {
        planets[i-1].rotation.y = planetRotation[i-1] * time * 0.5 + planetRotationOffset[i-1];
        
        planets[i-1].parent.position.x = planetOrbitX[i-1]*Math.cos(planetRevolution[i-1]*time+planetRevolutionOffset[i-1]);
        planets[i-1].parent.position.y = planetOrbitY[i-1]*Math.sin(planetRevolution[i-1]*time+planetRevolutionOffset[i-1]);

      } catch (e) {
          if (e instanceof TypeError) {
              //printError(e, true);
              console.log('type error');
          } else {
              //printError(e, false);
              console.log(e);
          }
      }
    }
    {
      try {
        moon.rotation.y = moonRotation * time * 0.5 + moonRotationOffset;
        
        moon.parent.position.x = planets[3].parent.position.x + (moonOrbitX*Math.cos(moonRevolution*time+moonRevolutionOffset));
        moon.parent.position.y = planets[3].parent.position.y + (moonOrbitY*Math.sin(moonRevolution*time+moonRevolutionOffset));

      } catch (e) {
          if (e instanceof TypeError) {
              //printError(e, true);
              console.log('type error');
          } else {
              //printError(e, false);
              console.log(e);
          }
      }
    }
    for(let k=1;k<=2;k++)
    {
      try {
        marsMoon[k-1].rotation.y = marsMoonRotation[k-1] * time * 0.5 + marsMoonRotationOffset[k-1];
        
        marsMoon[k-1].parent.position.x = planets[4].parent.position.x + (marsMoonOrbitX*Math.cos(marsMoonRevolution*time+marsMoonRevolutionOffset[k-1]));
        marsMoon[k-1].parent.position.y = planets[4].parent.position.y + (marsMoonOrbitY*Math.sin(marsMoonRevolution*time+marsMoonRevolutionOffset[k-1]));

      } catch (e) {
          if (e instanceof TypeError) {
              console.log('type error');
          } else {
              console.log(e);
          }
      }
    }
    for(let k=1;k<=4;k++)
    {
      try {
        jupiterMoon[k-1].rotation.y = jupiterMoonRotation[k-1] * time * 0.5 + jupiterMoonRotationOffset[k-1];
        
        jupiterMoon[k-1].parent.position.x = planets[5].parent.position.x + jupiterMoonOrbitX*Math.cos(jupiterMoonRevolution*time+jupiterMoonRevolutionOffset[k-1]);
        jupiterMoon[k-1].parent.position.y = planets[5].parent.position.y + jupiterMoonOrbitY*Math.sin(jupiterMoonRevolution*time+jupiterMoonRevolutionOffset[k-1]);

      } catch (e) {
          if (e instanceof TypeError) {
              console.log('type error');
          } else {
              console.log(e);
          }
      }
    }
    for(let k=1;k<=7;k++)
    {
      try {
        saturnMoon[k-1].rotation.y = saturnMoonRotation[k-1] * time * 0.5 + saturnMoonRotationOffset[k-1];
        
        saturnMoon[k-1].parent.position.x = planets[6].parent.position.x + saturnMoonOrbitX*Math.cos(saturnMoonRevolution*time+saturnMoonRevolutionOffset[k-1]);
        saturnMoon[k-1].parent.position.y = planets[6].parent.position.y + saturnMoonOrbitY*Math.sin(saturnMoonRevolution*time+saturnMoonRevolutionOffset[k-1]);

      } catch (e) {
          if (e instanceof TypeError) {
              console.log('type error');
          } else {
              console.log(e);
          }
      }
    }
    for(let k=1;k<=3;k++)
    {
      try {
        belt[k-1].rotation.y = beltRotation[k-1] * time * 0.5 + beltRotationOffset[k-1];
        
        belt[k-1].parent.position.x = beltOriginX + beltOrbitX*Math.cos(beltRevolution*time+beltRevolutionOffset[k-1]);
        belt[k-1].parent.position.y = beltOriginY + beltOrbitY*Math.sin(beltRevolution*time+beltRevolutionOffset[k-1]);

      } catch (e) {
          if (e instanceof TypeError) {
              console.log('type error');
          } else {
              console.log(e);
          }
      }
    }

    if(beltOriginChanged)
    {
      beltOriginX = beltOriginXInitial;
      beltOriginY = beltOriginYInitial;
      beltOriginChanged = false;
    }
    
    //lightMaterial.opacity = ((Math.sin(time*1.5) + 1.0) / 2.0) * 0.5 + 0.5; //sinusoidal
    let lightBrightness = flickerFunction(time);
    lightMaterial.opacity = lightBrightness; //flicker
    if(useLight) light.intensity = lightBrightness * lightIntensity;

    if(isFocused)
    {
      if(curFrame<destFrame)
      {
        //let sqt = Math.pow(curFrame/destFrame,2);
        //let coeff = sqt / (2.0 * (sqt - curFrame/destFrame) + 1.0);
        let coeff = -1 * Math.pow(curFrame/destFrame - 1.0,4) +1;
        //let coeff = Math.sin(Math.PI/2.0*curFrame/destFrame);
        //let coeff = Math.pow(Math.sin(Math.PI/2.0*curFrame/destFrame),2);
        if(!isProjectEncyclopedia)
        {
          if(focusedObject.isBelt == false)
          {
            let originX = focusedObject.orbitX*Math.cos(focusedObject.revolution*time+focusedObject.revolutionOffset);
            let originY = focusedObject.orbitY*Math.sin(focusedObject.revolution*time+focusedObject.revolutionOffset);
            if(focusedObject.isMoon)
            {
              originX += planets[focusedObject.planetIndex].parent.position.x;
              originY += planets[focusedObject.planetIndex].parent.position.y;
            }
            focusedObject.parent.position.x = coeff * (screenOriginX - originX) + originX;
            focusedObject.parent.position.y = coeff * (screenOriginY - originY) + originY;
            focusedObject.parent.position.z = coeff * (screenOriginZOffset + focusedObject.destZ - 0);
          }
          else
          {
            let beltCoeff = Math.pow(curFrame/destFrame - 1.0,3) +1;
            beltOriginX = beltCoeff * (screenOriginX - beltOriginXInitial) + beltOriginXInitial;
            beltOriginY = beltCoeff * (screenOriginY - beltOriginYInitial) + beltOriginYInitial;
            for(let k=0;k<3;k++)
            {
              belt[k].parent.position.z = beltCoeff * (screenOriginZOffset + beltDestZ - 0);
            }
          }
        }
        
        document.getElementById ("project-encyclopedia-about").style.opacity = 1.7 * coeff * (projectEncyclopediaDisabledOpacity - 1.0) + 1.0;
        document.getElementById ("project-encyclopedia").style.opacity = 1.7 * coeff * (projectEncyclopediaDisabledOpacity - 1.0) + 1.0;
        document.getElementById ("content").style.opacity = coeff * (1.0 - 0.0) + 0.0;
        
        blackMaterial.opacity = coeff * (0.5 - 0.0);
        curFrame ++;
        inAnimation = true;
      }
      else
      {
        inAnimation = false;
        if(!isProjectEncyclopedia)
        {
          if(focusedObject.isBelt == false)
          {
            focusedObject.parent.position.x = screenOriginX;
            focusedObject.parent.position.y = screenOriginY;
            focusedObject.parent.position.z = screenOriginZOffset + focusedObject.destZ;
          }
          else
          {
            beltOriginX = screenOriginX;
            beltOriginY = screenOriginY;
            for(let k=0;k<3;k++)
            {
              belt[k].parent.position.z = screenOriginZOffset + beltDestZ;
            }
          }
        }
        
        blackMaterial.opacity = 0.5;
        document.getElementById ("project-encyclopedia-about").style.opacity = projectEncyclopediaDisabledOpacity;
        document.getElementById ("project-encyclopedia").style.opacity = projectEncyclopediaDisabledOpacity;
        document.getElementById ("content").style.opacity = 1.0;
      }

      if(useLight) light.intensity = 0;
    }

    renderer.render( scene, camera );
    labelRenderer.render(scene, camera);
    
  }
  //document.getElementById('c').scrollTo(0,0);
  if(showStats) stats.end();

  if(!limitFramerate)
  {
    requestAnimationFrame(render);
  }
  else
  {
    setTimeout( function() {

        requestAnimationFrame( render );

    }, 1000 / framerate );
  }
  
  
}
requestAnimationFrame(render);

function checkLoadedObjects(){
  loadingValue += 1;
  $('#load-progress').attr('aria-valuenow', ((loadingValue / totalObjects)*100).toFixed(0)).css('width', ((loadingValue / totalObjects)*100).toString()+'%');
  if(loadingValue == totalObjects)
  {
    console.log('All Objects Loaded');
    allLoaded = true;
    var element = document.querySelector('#loading'); 
    element.style.visibility = 'hidden'; 
    element.style.display = 'none'; 
    document.getElementById('project-encyclopedia').style.display = 'block';
    document.getElementById('project-encyclopedia-about').style.display = 'block';
  }
}


var waveFunction = "noise"; // possible values: sin, tri(angle), sqr(square), saw(tooth), inv(verted sawtooth), noise (random)
var base = 0.5; // start
var amplitude = 0.5; // amplitude of the wave
var phase = 0.0; // start point inside on wave cycle
var frequency = 0.4; // cycle frequency per second

function flickerFunction (time) {
  var x  = (time + phase)*frequency;
  var y;
  let a = (time * 1000)%(1000*Math.random());
 
  x = x - Math.floor(x); // normalized value (0..1)
 
  if (waveFunction=="sin") {
    y = Math.sin(x*2*Math.PI);
  }
  else if (waveFunction=="tri") {
    if (x < 0.5)
      y = 4.0 * x - 1.0;
    else
      y = -4.0 * x + 3.0;  
  }    
  else if (waveFunction=="sqr") {
    if (x < 0.5)
      y = 1.0;
    else
      y = -1.0;  
  }    
  else if (waveFunction=="saw") {
      y = x;
  }    
  else if (waveFunction=="inv") {
    y = 1.0 - x;
  }    
  else if (waveFunction=="noise") {
    y = 1 - (Math.random()*2);
  }
  else if (waveFunction=="sinnoise") {
    y = 1 - (Math.random()*2*Math.sin(x*2*Math.PI));
  }
  else {
    y = 1.0;
  }        
  if(a<17)
  return (y*amplitude)+base;     
  else return ((Math.sin(time*1.5) + 1.0) / 2.0) * 0.35 + 0.6;
}
 


function focusOn(obj)
{
  // pick the first object. It's the closest one
  let pickedObject = obj;

  while(pickedObject.parent!=null && pickedObject.type!=='Object3D')
  {
    pickedObject = pickedObject.parent;
  }

  while(pickedObject.parent!=null && pickedObject.parent.type=='Object3D')
  {
    pickedObject = pickedObject.parent;
  }

  console.log(pickedObject);
  focusedObject = pickedObject;
  
  document.getElementById('c').getElementsByTagName('canvas')[0].style.pointerEvents = 'none';

  destZ = focusedObject.destZ;
  isFocused = true;

  showContent();

  let finish = true;
  if(finish)
  {
    let screenOriginX = controls.position0.x;
    let screenOriginY = controls.position0.y;
    let screenOriginZOffset = controls.position0.z - 10;
    if(zoomSmaller) screenOriginZOffset -= 0.5;
    curFrame=destFrame;
    inAnimation = false;
    if(!isProjectEncyclopedia)
    {
      if(focusedObject.isBelt == false)
      {
        focusedObject.parent.position.x = screenOriginX;
        focusedObject.parent.position.y = screenOriginY;
        focusedObject.parent.position.z = screenOriginZOffset + focusedObject.destZ;
      }
      else
      {
        beltOriginX = screenOriginX;
        beltOriginY = screenOriginY;
        for(let k=0;k<3;k++)
        {
          belt[k].parent.position.z = screenOriginZOffset + beltDestZ;
        }
      }
    }
    
    blackMaterial.opacity = 0.5;
    document.getElementById ("project-encyclopedia-about").style.opacity = projectEncyclopediaDisabledOpacity;
    document.getElementById ("project-encyclopedia").style.opacity = projectEncyclopediaDisabledOpacity;
    document.getElementById ("content").style.opacity = 1.0;
  }
  
}




/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*--------------------------------------------------------------------------------------------------------------------------------------------------------- */


document.getElementById ("pills-home-tab").addEventListener ("click", hideHomeTab, false);
document.getElementById ("pills-info-tab").addEventListener ("click", showHomeTab, false);
document.getElementById ("pills-image-tab").addEventListener ("click", showHomeTab, false);
document.getElementById ("pills-video-tab").addEventListener ("click", showHomeTab, false);
document.getElementById ("pills-text-tab").addEventListener ("click", showHomeTab, false);
document.getElementById ("pills-reference-tab").addEventListener ("click", showHomeTab, false);
document.getElementById ("go-back").addEventListener ("click", goBack, false);
document.getElementById ("project-encyclopedia-text").addEventListener ("pointerdown", openAbout, false);
document.getElementById ("project-encyclopedia-img").addEventListener ("pointerdown", openProjectEncyclopedia, false);

function showHomeTab(){
  pauseVideos();
  if(isProjectEncyclopedia||!focusedObject.isExhibition) return false;
  document.getElementById('go-back').style.display = 'none';
  document.getElementById('pills-home-tab').style.display = 'block';
  return false;
}

function hideHomeTab(){
  pauseVideos();
  document.getElementById('go-back').style.display = 'block';
  document.getElementById('pills-home-tab').style.display = 'none';
  return false;
}

function goBack(){
  pauseVideos();
  isFocused = false;

  $('#pills-tab a[href="#pills-home"]').tab('show');
  
  if(!isProjectEncyclopedia)
  {
    focusedObject.parent.position.z = 0;
    if(focusedObject.isBelt)
    {
      beltOriginX = beltOriginXInitial;
      beltOriginY = beltOriginYInitial;
      for(let k=0;k<3;k++)
      {
        belt[k].parent.position.z = 0;
      }
    }
  }
  
  blackMaterial.opacity = 0.0;
  document.getElementById ("project-encyclopedia-about").style.opacity = 1.0;
  document.getElementById ("project-encyclopedia").style.opacity = 1.0;
  document.getElementById ("content").style.opacity = 0.0;

  document.getElementById ("exhibition-label-1").style.opacity = 1.0;
  document.getElementById ("exhibition-label-4").style.opacity = 1.0;
  document.getElementById ("exhibition-label-10").style.opacity = 1.0;
  
  focusedObject = undefined;
  curFrame = 0;
  for(let k=0;k<scene.children.length;k++)
  {
    scene.children.opacity = 1.0;
  }
  $('#content').css('display', 'none');
  //$('#c').css('pointer-events', 'auto');
  document.getElementById('c').getElementsByTagName('canvas')[0].style.pointerEvents = 'auto';
  isProjectEncyclopedia = false;
  return false;
}





function showExhibition(){

  /* -----------------------------------TAB---------------------------------------------  */
  // INFO
  if(contentNum === '0' || contentNum === '1' || contentNum === '4' || contentNum === '10')
    document.getElementById ("pills-info-tab").style.display = 'block';
  else
    document.getElementById ("pills-info-tab").style.display = 'none';
  
  // IMAGE
  if(contentNum === '0' || contentNum === '1' || contentNum === '4' || contentNum === '10')
    document.getElementById ("pills-image-tab").style.display = 'block';
  else
    document.getElementById ("pills-image-tab").style.display = 'none';

  // VIDEO
  if(contentNum === '0' || contentNum === '1' || contentNum === '4')
    document.getElementById ("pills-video-tab").style.display = 'block';
  else
    document.getElementById ("pills-video-tab").style.display = 'none';
  
  if(contentNum === '0' || contentNum === '1' || contentNum === '4' || contentNum === '10' || contentNum === 'about') // contentNum === '1'
  {
    document.getElementById ("pills-text-tab").style.display = 'block';
    document.getElementById('text-go-up').style.display = 'block';
    if(contentNum === 'about')
    {
      document.getElementById('pills-text-tab').innerHTML = 'About';
    }
    else if(contentNum === '1')
    {
      document.getElementById('pills-text-tab').innerHTML = 'Web';
      document.getElementById('text-go-up').style.display = 'none';
    }
    else
    {
      document.getElementById('pills-text-tab').innerHTML = 'Text';
    }
  }
  else
  document.getElementById ("pills-text-tab").style.display = 'none';
    


  /* -----------------------------------CONTENT DISABLE---------------------------------------------  */
  // DISABLE ALL
  existingContents.forEach(function(value){

    document.getElementById ("info-"+value).style.display = 'none';
    
    document.getElementById ("image-"+value).style.display = 'none';
    
    document.getElementById ("video-"+value).style.display = 'none';

    document.getElementById ("text-"+value).style.display = 'none';
  });

  /* -----------------------------------CONTENT SHOW---------------------------------------------  */
  // SHOW IF AVAILABLE

  // INFO
  if(contentNum === '0' || contentNum === '1' || contentNum === '4' || contentNum === '10')
  {
    //document.getElementById('info-content').innerHTML = '';
    //$("#info-content").load("info-"+contentNum+".html"); 
    document.getElementById ("info-"+contentNum).style.display = 'block';
  }
    
  
  // IMAGE
  if(contentNum === '0' || contentNum === '1' || contentNum === '4' || contentNum === '10')
  {
    document.getElementById('image-'+contentNum).innerHTML = '';
    //$('#image-'+contentNum).load("image/image-"+contentNum+".html"); 
    document.getElementById ("image-"+contentNum).style.display = 'block';

    
    //TODO:
    $('#imageModalBody').load("image/image-"+contentNum+".html", function() {
      console.log('loaded');
      console.log(contentNum);

      if(contentNum ==='0')
      {
        $("#carouselControls0-1").on('slide.bs.carousel', function(evt) {


          var step = $(evt.relatedTarget).index();
        
          $('#slider_captions-1 .carousel-caption:not(#caption-1-'+step+')').fadeOut('fast', function() {
              $('#caption-1-'+step).fadeIn();
          });
        
        });
        $("#carouselControls0-2").on('slide.bs.carousel', function(evt) {

    
          var step = $(evt.relatedTarget).index();
        
          $('#slider_captions-2 .carousel-caption:not(#caption-2-'+step+')').fadeOut('fast', function() {
              $('#caption-2-'+step).fadeIn();
          });
        
        });
      } else if(contentNum ==='1')
      {
        $("#carouselControls1-1").on('slide.bs.carousel', function(evt) {

         
          var step = $(evt.relatedTarget).index();
        
          $('#slider_captions-1 .carousel-caption:not(#caption-1-'+step+')').fadeOut('fast', function() {
              $('#caption-1-'+step).fadeIn();
          });
        
        });
        $("#carouselControls1-2").on('slide.bs.carousel', function(evt) {


          var step = $(evt.relatedTarget).index();
        
          $('#slider_captions-2 .carousel-caption:not(#caption-2-'+step+')').fadeOut('fast', function() {
              $('#caption-2-'+step).fadeIn();
          });
        
        });
        $("#carouselControls1-3").on('slide.bs.carousel', function(evt) {


          var step = $(evt.relatedTarget).index();
        
          $('#slider_captions-3 .carousel-caption:not(#caption-3-'+step+')').fadeOut('fast', function() {
              $('#caption-3-'+step).fadeIn();
          });
        
        });
      }
      else
      {
        $("#carouselControls"+contentNum).on('slide.bs.carousel', function(evt) {

          console.log(evt);
          var step = $(evt.relatedTarget).index();
        
          $('#slider_captions .carousel-caption:not(#caption-'+step+')').fadeOut('fast', function() {
              $('#caption-'+step).fadeIn();
          });
        
        });
      }
      
    }); 

  }
    
  
  // VIDEO
  if(contentNum === '0' || contentNum === '1' || contentNum === '4')
  {
    document.getElementById ("video-"+contentNum).style.display = 'block';
  }
    

  // TEXT
  if(contentNum === '0' || contentNum === '1' || contentNum === '4' || contentNum === '10' || contentNum === 'about')
  {
    document.getElementById('text-'+contentNum).innerHTML = '';
    $('#text-'+contentNum).load("text/text-"+contentNum+".html"); 
    document.getElementById ("text-"+contentNum).style.display = 'block';
  }
    

  return false;
  /* --------------------------------------------------------------------------------  */
}

function hideExhibition(){
  document.getElementById ("pills-info-tab").style.display = 'none';
  document.getElementById ("pills-image-tab").style.display = 'none';
  document.getElementById ("pills-video-tab").style.display = 'none';
  document.getElementById ("pills-text-tab").style.display = 'none';
  return false;
}



function showContent(){
 
  document.getElementById ("exhibition-label-1").style.opacity = 0.0;
  document.getElementById ("exhibition-label-4").style.opacity = 0.0;
  document.getElementById ("exhibition-label-10").style.opacity = 0.0;
  if(focusedObject)
  {
    document.getElementById ("pills-reference-tab").style.display = 'block';
    document.getElementById ("pills-image-tab").style.display = 'block';
    document.getElementById ("pills-video-tab").style.display = 'block';
    
    let title = '';
    if(focusedObject.name === "Mercury")
    {
      title = 'Mercury Play Back';
      contentNum = '1';
    }
    if(focusedObject.name === "Earth")
    {
      title = 'Planet 72.82m2';
      contentNum = '4';
    }
    else if(focusedObject.name === "Kuiper Belt")
    {
      title = 'About Ground Water Light and Air';
      contentNum = '10';
    }
    else
    {
      //title = focusedObject.name;
    }

    // SHOW TITLE AT BOTTOM
    document.getElementById('pills-home').innerHTML = '<span class="object-title noselect">'+title+'</span>';
    $('#pills-tab a[href="#pills-home"]').tab('show');




    if(focusedObject.isExhibition)
    {
      document.getElementById ("pills-info-tab").style.display = 'block';
      //document.getElementById('pills-reference-tab').innerHTML = 'Reference';
      showExhibition();
    }
    else
    {
      //document.getElementById('pills-reference-tab').innerHTML = 'Images';
      hideExhibition();
      //showHomeTab();
      $('#pills-tab a[href="#pills-reference"]').tab('show');
    }


    document.getElementById('reference-component').innerHTML = '<div id="ref-spinner-'+focusedObject.directoryName+'" class="ref-spinner"><div class="spinner-border text-light" role="status"></div></div>';
    for(let i=1;i<=focusedObject.numOfReferences;i++)
    {
      let prefix = focusedObject.referencePrefix;
      if(prefix.length>0) prefix += '-';
      document.getElementById('reference-component').innerHTML += '<img loading="lazy" class="ref-img noselect" src="reference/'+focusedObject.directoryName+'/'+prefix+i.toString()+'.jpg"></img>';
    }

    var image = new Image();
    image.addEventListener("load", function() {
      //console.log('loadedloaded img');
      if(focusedObject) $('#ref-spinner-'+focusedObject.directoryName).css('display','none');
    }, false);
    let prefix = focusedObject.referencePrefix;
    if(prefix.length>0) prefix += '-';
    image.src = 'reference/'+focusedObject.directoryName+'/'+prefix+'1.jpg';
    
    
    
  }
  else if(isProjectEncyclopedia && contentNum === '0') //navigator selected
  {
    document.getElementById ("pills-reference-tab").style.display = 'none';
    document.getElementById ("pills-info-tab").style.display = 'none';
    document.getElementById ("pills-image-tab").style.display = 'block';
    document.getElementById ("pills-video-tab").style.display = 'block';
    $('#pills-tab a[href="#pills-info"]').tab('show');
    showExhibition();
  }
  else if(isProjectEncyclopedia && contentNum === 'about') //about selected
  {
    document.getElementById ("pills-reference-tab").style.display = 'none';
    document.getElementById ("pills-info-tab").style.display = 'none';
    document.getElementById ("pills-image-tab").style.display = 'none';
    document.getElementById ("pills-video-tab").style.display = 'none';
    $('#pills-tab a[href="#pills-text"]').tab('show');
    showExhibition();
  }

  $('#content').css('display', 'inline');
  
  resizeContent();
}

function openProjectEncyclopedia(){
 
  document.getElementById('c').getElementsByTagName('canvas')[0].style.pointerEvents = 'none';
  isFocused = true;
  contentNum = '0'
  isProjectEncyclopedia = true;
  showContent();
  
}

function openAbout(){
 
  document.getElementById('c').getElementsByTagName('canvas')[0].style.pointerEvents = 'none';
  isFocused = true;
  contentNum = 'about'
  isProjectEncyclopedia = true;
  showContent();
  
}

function resizeContent(){
  document.getElementById('c').style.height = window.innerHeight;
  document.getElementById('content').style.height = window.innerHeight;
  //document.getElementById('content-row').style.height = window.innerHeight -(document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top);
  document.getElementById('text-component').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;
  document.getElementById('reference-component').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;
  document.getElementById('info-component').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;
  document.getElementById('image-component').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;
  document.getElementById('pills-video').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;

  let ratio = 1.78;
  let tabHeight = 0;
  let padding = 20;
  let textHeight = 50;
  if(document.getElementById('imageModalBody').getElementsByClassName('nav-pills').length) tabHeight = 40;
  let width = (window.innerHeight-tabHeight-padding) * ratio;
  if(window.innerWidth > width) document.getElementById('imageModalBody').style.width = width;
  else document.getElementById('imageModalBody').style.width = '100%';

  
  let height = (window.innerWidth / 1.78) + tabHeight + padding + textHeight;
  if(window.innerHeight > height) document.getElementById('imageModalContent').style.height = height;
  else document.getElementById('imageModalContent').style.height = '100%';

  let videoRatio = 1.33;
  if(contentNum =='1') videoRatio=1.0;
  else videoRatio = 1.33;
  let videoTabHeight = 0;
  if(document.getElementById('videoModalBody').getElementsByClassName('nav-pills').length) videoTabHeight = 70;
  let videoWidth = (window.innerHeight-videoTabHeight-padding) * videoRatio;
  if(window.innerWidth > videoWidth) document.getElementById('videoModalBody').style.width = videoWidth;
  else document.getElementById('videoModalBody').style.width = '100%';

  
  let videoHeight = (window.innerWidth / videoRatio) + videoTabHeight + padding;
  if(window.innerHeight > videoHeight) document.getElementById('videoModalContent').style.height = videoHeight;
  else document.getElementById('videoModalContent').style.height = '100%';
  
}


// WHEN MENU TAB CLICKED MOVE UP
$('#pills-tab a[href="#pills-reference"]').on('shown.bs.tab', function (e) {
  document.getElementById('reference-component').scrollTo(0,0);
  //document.getElementById('content-row').style.setProperty("overflow-y", "hidden");
});

$('#pills-tab a[href="#pills-text"]').on('shown.bs.tab', function (e) {
  document.getElementById('text-component').scrollTo(0,0);
  //document.getElementById('content-row').style.setProperty("overflow-y", "hidden");
});

$('#pills-tab a[href="#pills-image"]').on('shown.bs.tab', function (e) {
  //document.getElementById('content-row').style.setProperty("overflow-y", "auto", "important");
  //document.getElementById('image-component').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;

  //width / height= 1.78
  let ratio = 1.78;
  //ratio = document.getElementById('imageModalBody').offsetWidth / document.getElementById('imageModalBody').offsetHeight;
  let tabHeight = 0;
  let padding = 20;
  let textHeight = 50;
  if(document.getElementById('imageModalBody').getElementsByClassName('nav-pills').length) tabHeight = 40;
  let width = (window.innerHeight-tabHeight - padding) * ratio;
  if(window.innerWidth > width) document.getElementById('imageModalBody').style.width = width;
  else document.getElementById('imageModalBody').style.width = '100%';

  
  let height = (window.innerWidth / 1.78) + tabHeight + padding + textHeight;
  if(window.innerHeight > height) document.getElementById('imageModalContent').style.height = height;
  else document.getElementById('imageModalContent').style.height = '100%';
  
  //TODO
  $('#imageModal').modal('show');

  
});

$('#pills-tab a[href="#pills-video"]').on('shown.bs.tab', function (e) {

  /*
  let ratio = 1.78;

  let tabHeight = 0;
  let padding = 20;
  let textHeight = 50;
  if(document.getElementById('imageModalBody').getElementsByClassName('nav-pills').length) tabHeight = 40;
  let width = (window.innerHeight-tabHeight - padding) * ratio;
  if(window.innerWidth > width) document.getElementById('imageModalBody').style.width = width;
  else document.getElementById('imageModalBody').style.width = '100%';

  
  let height = (window.innerWidth / 1.78) + tabHeight + padding + textHeight;
  if(window.innerHeight > height) document.getElementById('imageModalContent').style.height = height;
  else document.getElementById('imageModalContent').style.height = '100%';
  */

  let videoRatio = 1.33;
  if(contentNum =='1') videoRatio=1.0;
  else videoRatio = 1.33;
  let padding = 20;
  let videoTabHeight = 0;
  if(document.getElementById('videoModalBody').getElementsByClassName('nav-pills').length) videoTabHeight = 70;
  let videoWidth = (window.innerHeight-videoTabHeight-padding) * videoRatio;
  if(window.innerWidth > videoWidth) document.getElementById('videoModalBody').style.width = videoWidth;
  else document.getElementById('videoModalBody').style.width = '100%';

  
  let videoHeight = (window.innerWidth / videoRatio) + videoTabHeight + padding;
  if(window.innerHeight > videoHeight) document.getElementById('videoModalContent').style.height = videoHeight;
  else document.getElementById('videoModalContent').style.height = '100%';

  $('#videoModal').modal('show');

  
});

$('#imageModal').on('hide.bs.modal', function (e) {

  if(contentNum === '0')
  {
    $('#pills-tab a[href="#pills-info"]').tab('show');
  }
  else
  {
    $('#pills-tab a[href="#pills-home"]').tab('show');
    hideHomeTab();
  }
  
});

$('#videoModal').on('hide.bs.modal', function (e) {

  pauseVideos();
  if(contentNum === '0')
  {
    $('#pills-tab a[href="#pills-info"]').tab('show');
  }
  else
  {
    $('#pills-tab a[href="#pills-home"]').tab('show');
    hideHomeTab();
  }
});




// VIDEO RESTART FROM TIME = 0
$('#pills-tab-second-video-0 a[href="#pills-video-0-1"]').on('hide.bs.tab', function (e) {
  // document.getElementById('video-0-1').pause();
  // document.getElementById('video-0-1').currentTime = 0;
  let iframe01 = document.getElementById('video-0-1');
  $f(iframe01).api("pause");
});
$('#pills-tab-second-video-0 a[href="#pills-video-0-2"]').on('hide.bs.tab', function (e) {
  // document.getElementById('video-0-2').pause();
  // document.getElementById('video-0-2').currentTime = 0;
  let iframe02 = document.getElementById('video-0-2');
  $f(iframe02).api("pause");
});
$('#pills-tab-second-video-4 a[href="#pills-video-4-1"]').on('hide.bs.tab', function (e) {
  // document.getElementById('video-4-1').pause();
  // document.getElementById('video-4-1').currentTime = 0;
  let iframe41 = document.getElementById('video-4-1');
  $f(iframe41).api("pause");
});
$('#pills-tab-second-video-4 a[href="#pills-video-4-2"]').on('hide.bs.tab', function (e) {
  // document.getElementById('video-4-2').pause();
  // document.getElementById('video-4-2').currentTime = 0;
  let iframe42 = document.getElementById('video-4-2');
  $f(iframe42).api("pause");
});
$('#pills-tab-second-video-4 a[href="#pills-video-4-3"]').on('hide.bs.tab', function (e) {
  // document.getElementById('video-4-3').pause();
  // document.getElementById('video-4-3').currentTime = 0;
  let iframe43 = document.getElementById('video-4-3');
  $f(iframe43).api("pause");
});
$('#pills-tab-second-video-4 a[href="#pills-video-4-4"]').on('hide.bs.tab', function (e) {
  // document.getElementById('video-4-2').pause();
  // document.getElementById('video-4-2').currentTime = 0;
  let iframe44 = document.getElementById('video-4-4');
  $f(iframe44).api("pause");
});
$('#pills-tab-second-video-4 a[href="#pills-video-4-5"]').on('hide.bs.tab', function (e) {
  // document.getElementById('video-4-3').pause();
  // document.getElementById('video-4-3').currentTime = 0;
  let iframe45 = document.getElementById('video-4-5');
  $f(iframe45).api("pause");
});

$('#pills-tab a[href="#pills-info"]').on('shown.bs.tab', function (e) {
  if(contentNum === '10')
  {
    document.getElementById('info-10').currentTime = 0;
    document.getElementById('info-10').play();
  }
  if(contentNum === '1')
  {
    document.getElementById('info-1').currentTime = 0;
    document.getElementById('info-1').play();
  }
  //document.getElementById('content-row').style.setProperty("overflow-y", "auto", "important");
  document.getElementById('info-component').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;
});

$('#pills-tab a[href="#pills-video"]').on('shown.bs.tab', function (e) {
  if(contentNum === '1')
  {
    $('#pills-tab-second-video-1 a[href="#pills-video-1-1"]').tab('show');
    document.getElementById('video-1-1').currentTime = 0;
    document.getElementById('video-1-1').play();
  }
  //document.getElementById('content-row').style.setProperty("overflow-y", "hidden");
  document.getElementById('pills-video').style.height = window.innerHeight - (document.getElementById('pills-tab').getBoundingClientRect().bottom + document.getElementById('pills-tab').getBoundingClientRect().top)-3;
});

$('#pills-tab-second-video-1 a[href="#pills-video-1-1"]').on('shown.bs.tab', function (e) {
  document.getElementById('video-1-1').currentTime = 0;
  document.getElementById('video-1-1').play();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-2"]').on('shown.bs.tab', function (e) {
  document.getElementById('video-1-2').currentTime = 0;
  document.getElementById('video-1-2').play();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-3"]').on('shown.bs.tab', function (e) {
  document.getElementById('video-1-3').currentTime = 0;
  document.getElementById('video-1-3').play();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-4"]').on('shown.bs.tab', function (e) {
  document.getElementById('video-1-4').currentTime = 0;
  document.getElementById('video-1-4').play();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-5"]').on('shown.bs.tab', function (e) {
  document.getElementById('video-1-5').currentTime = 0;
  document.getElementById('video-1-5').play();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-6"]').on('shown.bs.tab', function (e) {
  document.getElementById('video-1-6').currentTime = 0;
  document.getElementById('video-1-6').play();
});

$('#pills-tab-second-video-1 a[href="#pills-video-1-1"]').on('hide.bs.tab', function (e) {
  document.getElementById('video-1-1').currentTime = 0;
  document.getElementById('video-1-1').pause();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-2"]').on('hide.bs.tab', function (e) {
  document.getElementById('video-1-2').currentTime = 0;
  document.getElementById('video-1-2').pause();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-3"]').on('hide.bs.tab', function (e) {
  document.getElementById('video-1-3').currentTime = 0;
  document.getElementById('video-1-3').pause();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-4"]').on('hide.bs.tab', function (e) {
  document.getElementById('video-1-4').currentTime = 0;
  document.getElementById('video-1-4').pause();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-5"]').on('hide.bs.tab', function (e) {
  document.getElementById('video-1-5').currentTime = 0;
  document.getElementById('video-1-5').pause();
});
$('#pills-tab-second-video-1 a[href="#pills-video-1-6"]').on('hide.bs.tab', function (e) {
  document.getElementById('video-1-6').currentTime = 0;
  document.getElementById('video-1-6').pause();
});

function pauseVideos(){
  let iframe01 = document.getElementById('video-0-1');
  let iframe02 = document.getElementById('video-0-2');

  let iframe41 = document.getElementById('video-4-1');
  let iframe42 = document.getElementById('video-4-2');
  let iframe43 = document.getElementById('video-4-3');
  let iframe44 = document.getElementById('video-4-4');
  let iframe45 = document.getElementById('video-4-5');

  $f(iframe01).api("pause");
  $f(iframe02).api("pause");
  $f(iframe41).api("pause");
  $f(iframe42).api("pause");
  $f(iframe43).api("pause");
  $f(iframe44).api("pause");
  $f(iframe45).api("pause");

  document.getElementById('video-1-1').pause();
  document.getElementById('video-1-2').pause();
  document.getElementById('video-1-3').pause();
  document.getElementById('video-1-4').pause();
  document.getElementById('video-1-5').pause();
  document.getElementById('video-1-6').pause();
  document.getElementById('video-1-1').currentTime = 0;
  document.getElementById('video-1-2').currentTime = 0;
  document.getElementById('video-1-3').currentTime = 0;
  document.getElementById('video-1-4').currentTime = 0;
  document.getElementById('video-1-5').currentTime = 0;
  document.getElementById('video-1-6').currentTime = 0;

/*
  // $f == Froogaloop
  var player = $f(iframe);

  // bind events
  var playButton = document.getElementById("play-button");
  playButton.addEventListener("click", function() {
    player.api("play");
  });

  var pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("click", function() {
    player.api("pause");
  });
  */

  /*
  document.getElementById('video-0-1').pause();
  document.getElementById('video-0-2').pause();
  document.getElementById('video-4-1').pause();
  document.getElementById('video-4-2').pause();
  document.getElementById('video-4-3').pause();
  document.getElementById('video-0-1').currentTime = 0;
  document.getElementById('video-0-2').currentTime = 0;
  document.getElementById('video-4-1').currentTime = 0;
  document.getElementById('video-4-2').currentTime = 0;
  document.getElementById('video-4-3').currentTime = 0;
  */
}

/*

$('#pills-tab a[href="#pills-image"]').on('shown.bs.tab', function (e) {
  
  if(contentNum === '0' && isLazy[0])
  {
    let size = document.getElementById('carouselControls0-1').getElementsByTagName('img').length;
    for(let i=0;i<size;i++)
    {
      document.getElementById('carouselControls0-1').getElementsByTagName('img')[i].setAttribute('loading','eager');
    }
    size = document.getElementById('carouselControls0-2').getElementsByTagName('img').length;
    for(let i=0;i<size;i++)
    {
      document.getElementById('carouselControls0-2').getElementsByTagName('img')[i].setAttribute('loading','eager');
    }
    size = document.getElementById('carouselControls0-3').getElementsByTagName('img').length;
    for(let i=0;i<size;i++)
    {
      document.getElementById('carouselControls0-3').getElementsByTagName('img')[i].setAttribute('loading','eager');
    }
    isLazy[0] == false;
  }
  else if(contentNum === '4' && isLazy[4])
  {
    console.log('lazy to eager 4');
    let size = document.getElementById('carouselControls4').getElementsByTagName('img').length;
    for(let i=0;i<size;i++)
    {
      document.getElementById('carouselControls4').getElementsByTagName('img')[i].setAttribute('loading','eager');
    }
    isLazy[4] == false;
  }
  else if(contentNum === '10' && isLazy[10])
  {
    let size = document.getElementById('carouselControls10-1').getElementsByTagName('img').length;
    for(let i=0;i<size;i++)
    {
      document.getElementById('carouselControls10-1').getElementsByTagName('img')[i].setAttribute('loading','eager');
    }
    size = document.getElementById('carouselControls10-2').getElementsByTagName('img').length;
    for(let i=0;i<size;i++)
    {
      document.getElementById('carouselControls10-2').getElementsByTagName('img')[i].setAttribute('loading','eager');
    }
    isLazy[10] == false;
  }
});

*/



/*

function loaded() {
  // isPassive();
  myScroll = new iScroll('wrapper', { 
     checkDOMChanges: true,
     fadeScrollbars: true,
     interactiveScrollbars: true,
     momentum: true,
     desktopCompatibility: true,
     eventPassthrough: false,
     mouseWheel: true,
     tab: true,
     fixedScrollbar: false, // for android
     hScroll:false,
     vScrollbar:false
 });
 myScroll.refresh();
  }
 document.addEventListener('DOMContentLoaded', loaded);
 */