import * as THREE from 'three';
import { createHouseModel } from './model';
import { constructionState } from '@/lib/build-progress';

export function createHouseScene(
  container: HTMLElement,
  onFailure: () => void,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5.5, 5.5, 5.5, -5.5, 0.1, 100);
  camera.position.set(10, 8.3, 12);
  camera.lookAt(0, 1.05, 0);
  scene.add(new THREE.HemisphereLight('#fff9ed', '#b6c2ad', 2.6));
  const sunlight = new THREE.DirectionalLight('#fff5df', 3.3);
  sunlight.position.set(-4, 10, 6);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1024, 1024);
  Object.assign(sunlight.shadow.camera, {
    left: -6,
    right: 6,
    top: 6,
    bottom: -6,
    near: 0.5,
    far: 30,
  });
  sunlight.shadow.bias = -0.001;
  sunlight.shadow.normalBias = 0.04;
  scene.add(sunlight);
  const model = createHouseModel();
  scene.add(model.root);
  let disposed = false;
  let lastProgress = 0;
  const render = () => {
    if (!disposed) renderer.render(scene, camera);
  };
  const update = (progress: number) => {
    lastProgress = progress;
    const { phases } = constructionState(progress);
    phases.forEach((phase, i) => {
      const t = phase * phase * (3 - 2 * phase);
      const group = model.stages[i];
      group.visible = phase > 0.001;
      group.scale.y = Math.max(0.001, t);
      group.position.y = (1 - t) * 0.6;
    });
    render();
  };
  const resize = () => {
    if (disposed) return;
    const width = container.clientWidth,
      height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height);
    const aspect = width / height;
    const span = aspect < 1 ? 5.1 / aspect : 5.1;
    camera.left = -span * aspect;
    camera.right = span * aspect;
    camera.top = span;
    camera.bottom = -span;
    camera.updateProjectionMatrix();
    update(lastProgress);
  };
  const lost = (event: Event) => {
    event.preventDefault();
    onFailure();
  };
  canvas.addEventListener('webglcontextlost', lost);
  container.appendChild(canvas);
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  return {
    update,
    dispose() {
      if (disposed) return;
      disposed = true;
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', lost);
      model.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
