import * as THREE from 'three';

export function createHouseModel() {
  const root = new THREE.Group();
  const stages = Array.from({ length: 5 }, () => new THREE.Group());
  root.add(...stages);
  const materials = {
    plaster: new THREE.MeshStandardMaterial({
      color: '#edeae0',
      roughness: 0.85,
    }),
    stone: new THREE.MeshStandardMaterial({
      color: '#c7c6b5',
      roughness: 0.95,
    }),
    ground: new THREE.MeshStandardMaterial({ color: '#bfc7ab', roughness: 1 }),
    wood: new THREE.MeshStandardMaterial({ color: '#9b7957', roughness: 0.8 }),
    frame: new THREE.MeshStandardMaterial({
      color: '#303c36',
      roughness: 0.55,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: '#849f9a',
      roughness: 0.16,
      metalness: 0.3,
    }),
    water: new THREE.MeshStandardMaterial({
      color: '#6eaeb0',
      roughness: 0.2,
      metalness: 0.18,
    }),
    leaf: new THREE.MeshStandardMaterial({ color: '#718b4e', roughness: 1 }),
    lime: new THREE.MeshStandardMaterial({ color: '#c8f45d', roughness: 0.8 }),
  };
  type MaterialName = keyof typeof materials;
  const box = (
    parent: THREE.Group,
    size: number[],
    position: number[],
    material: MaterialName,
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(...(size as [number, number, number])),
      materials[material],
    );
    mesh.position.set(...(position as [number, number, number]));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  // The terrain exists before construction. Front facade faces positive Z.
  box(root, [7.7, 0.16, 6.2], [0, -0.16, 0], 'ground');
  const guide = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(5.3, 0.02, 3.6)),
    new THREE.LineBasicMaterial({ color: '#9aab82' }),
  );
  guide.position.set(-0.35, -0.065, -0.6);
  root.add(guide);
  box(stages[0], [5.8, 0.22, 4.2], [-0.35, 0.02, -0.5], 'stone');
  box(stages[0], [5.3, 0.12, 3.6], [-0.35, 0.18, -0.6], 'plaster');
  box(stages[0], [6.3, 0.08, 1.6], [0, -0.035, 2], 'stone');
  // Ground-floor structure, solid rear wall, and open glazed front.
  for (const x of [-2.9, -0.8, 2.15]) {
    for (const z of [-2.3, 1.1])
      box(stages[1], [0.2, 2.15, 0.2], [x, 1.26, z], 'plaster');
  }
  box(stages[1], [5.25, 2.1, 0.15], [-0.35, 1.25, -2.3], 'plaster');
  box(stages[1], [0.15, 2.1, 3.5], [-2.95, 1.25, -0.6], 'plaster');
  box(stages[1], [1.3, 2.1, 0.16], [-0.2, 1.25, 1.1], 'plaster');
  // Set-back upper storey and terraces.
  box(stages[1], [3.1, 1.55, 2.75], [-1.15, 3.12, -0.85], 'plaster');
  box(stages[2], [5.8, 0.2, 4.0], [-0.35, 2.42, -0.5], 'plaster');
  box(stages[2], [3.55, 0.2, 3.1], [-1.15, 3.98, -0.85], 'plaster');
  box(stages[2], [3.15, 0.07, 2.65], [-1.15, 4.115, -0.85], 'stone');
  box(stages[2], [2.2, 0.08, 1.1], [1.1, 2.565, 0.45], 'wood');
  // Tall glazing and slender graphite mullions.
  for (const [x, w] of [
    [-1.8, 1.9],
    [1.2, 1.65],
  ] as const) {
    box(stages[3], [w, 1.85, 0.06], [x, 1.28, 1.15], 'glass');
    for (const dx of [-w / 2, 0, w / 2])
      box(stages[3], [0.055, 1.92, 0.09], [x + dx, 1.28, 1.2], 'frame');
    for (const y of [0.34, 2.23])
      box(stages[3], [w, 0.05, 0.1], [x, y, 1.2], 'frame');
  }
  box(stages[3], [0.06, 1.86, 3.05], [2.21, 1.3, -0.55], 'glass');
  for (const z of [-2.05, -0.6, 0.99])
    box(stages[3], [0.07, 1.9, 0.055], [2.25, 1.3, z], 'frame');
  box(stages[3], [2.55, 1.06, 0.07], [-1.15, 3.17, 0.56], 'glass');
  for (const x of [-2.45, -1.15, 0.15])
    box(stages[3], [0.055, 1.12, 0.08], [x, 3.17, 0.61], 'frame');
  for (const y of [2.64, 3.71])
    box(stages[3], [2.65, 0.045, 0.08], [-1.15, y, 0.61], 'frame');
  // Vertical timber at entry, terrace railing and slim pergola.
  for (let i = 0; i < 10; i++)
    box(
      stages[3],
      [0.055, 1.96, 0.08],
      [-0.72 + i * 0.115, 1.28, 1.21],
      'wood',
    );
  box(stages[3], [1.8, 0.65, 0.04], [1.2, 2.9, 1.43], 'glass');
  box(stages[3], [1.85, 0.035, 0.04], [1.2, 3.23, 1.45], 'frame');
  for (let i = 0; i < 9; i++)
    box(stages[3], [0.06, 0.07, 1.35], [0.5 + i * 0.2, 3.35, 0.6], 'wood');
  for (const x of [0.5, 2.1])
    box(stages[3], [0.05, 0.95, 0.05], [x, 2.9, 1.2], 'frame');
  // Finishing: entry path, lawn beds, water and landscape.
  box(stages[4], [3.7, 0.1, 1.28], [0.7, 0.04, 2.12], 'plaster');
  box(stages[4], [3.46, 0.03, 1.07], [0.7, 0.1, 2.12], 'water');
  for (let i = 0; i < 4; i++)
    box(stages[4], [0.48, 0.045, 0.5], [-2.4, 0.0, 1.6 + i * 0.38], 'plaster');
  box(stages[4], [0.38, 0.28, 0.5], [0.14, 0.32, 1.3], 'lime');
  const tree = (x: number, z: number, height: number) => {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.07, height, 7),
      materials.wood,
    );
    trunk.position.set(x, height / 2, z);
    trunk.castShadow = true;
    stages[4].add(trunk);
    for (const [dx, dy, dz, s] of [
      [0, 0, 0, 0.55],
      [-0.24, -0.1, 0.16, 0.43],
      [0.23, 0.1, 0.1, 0.4],
      [0, 0.3, -0.15, 0.35],
    ]) {
      const leaves = new THREE.Mesh(
        new THREE.IcosahedronGeometry(s, 1),
        materials.leaf,
      );
      leaves.position.set(x + dx, height + dy, z + dz);
      leaves.scale.y = 1.15;
      leaves.castShadow = true;
      stages[4].add(leaves);
    }
  };
  tree(3.15, -1.65, 1.75);
  tree(-3.24, 1.8, 1.45);
  for (let i = 0; i < 5; i++) {
    const shrub = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.22, 1),
      materials.leaf,
    );
    shrub.position.set(3.15, 0.19, 0.3 + i * 0.42);
    shrub.scale.y = 0.75;
    stages[4].add(shrub);
  }
  return {
    root,
    stages,
    dispose() {
      root.traverse((node) => {
        if (node instanceof THREE.Mesh || node instanceof THREE.LineSegments) {
          node.geometry.dispose();
          if (node instanceof THREE.LineSegments)
            (node.material as THREE.Material).dispose();
        }
      });
      Object.values(materials).forEach((material) => material.dispose());
    },
  };
}
