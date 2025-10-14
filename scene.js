import * as THREE from 'three';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('threejs-container');
    if (!container) return;

    // --- 1. Basic Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Initial camera position (will be animated)
    camera.position.z = 20;

    // --- 2. Create the Background "Digital Rain" ---
    const rainCount = 30000;
    const rainGeometry = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount; i++) {
        rainPositions[i * 3 + 0] = (Math.random() - 0.5) * 30; // x
        rainPositions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
        rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
    }
    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

    const rainMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0.0 },
            u_color: { value: new THREE.Color(0x00ff00) }, // Neon Green
        },
        vertexShader: `
            uniform float u_time;
            void main() {
                vec3 pos = position;
                // Move particles down, looping them back to the top
                pos.y = mod(pos.y - u_time * 0.5, 30.0) - 15.0;
                
                vec4 modelPosition = vec4(pos, 1.0);
                vec4 viewPosition = viewMatrix * modelPosition;
                gl_Position = projectionMatrix * viewPosition;
                gl_PointSize = 1.5 / -viewPosition.z;
            }
        `,
        fragmentShader: `
            uniform vec3 u_color;
            void main() {
                if (length(gl_PointCoord - vec2(0.5)) > 0.48) discard;
                gl_FragColor = vec4(u_color, 0.5);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });
    
    const rain = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rain);

    // --- 3. Create the Main Figure ---
    const textureLoader = new THREE.TextureLoader();
    const silhouetteTexture = textureLoader.load('silhouette.png', () => {
        animate(); // Start the animation loop only after the texture is ready
    });

    const figureCount = 100000;
    const figureGeometry = new THREE.BufferGeometry();
    const startPositions = new Float32Array(figureCount * 3);
    const targetUVs = new Float32Array(figureCount * 2); // To map to the texture

    for (let i = 0; i < figureCount; i++) {
        // Start positions are scattered like the rain
        startPositions[i * 3 + 0] = (Math.random() - 0.5) * 25;
        startPositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
        startPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
        
        targetUVs[i * 2 + 0] = Math.random();
        targetUVs[i * 2 + 1] = Math.random();
    }
    figureGeometry.setAttribute('position', new THREE.BufferAttribute(startPositions, 3));
    figureGeometry.setAttribute('aTargetUV', new THREE.BufferAttribute(targetUVs, 2));

    const figureMaterial = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0.0 },
            u_progress: { value: 0.0 }, // Controls the assembly animation
            u_texture: { value: silhouetteTexture },
            u_color_start: { value: new THREE.Color(0x00ff00) }, // Green
            u_color_end: { value: new THREE.Color(0x00aaff) },   // Blue
        },
        vertexShader: `
            uniform float u_time;
            uniform float u_progress;
            uniform sampler2D u_texture;
            attribute vec2 aTargetUV;
            
            // Simplex noise for organic shimmering
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
            float snoise(vec2 v) { const vec4 C = vec4(0.211, 0.366, -0.577, 0.024); vec2 i = floor(v + dot(v, C.yy)); vec2 x0 = v - i + dot(i, C.xx); vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0); vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1; i = mod289(i); vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 )); vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0); m = m*m; m = m*m; vec3 x = 2.0 * fract(p * C.www) - 1.0; vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5); vec3 a0 = x - ox; m *= 1.7928 - 0.8537 * ( a0*a0 + h*h ); vec3 g; g.x = a0.x * x0.x + h.x * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw; return 130.0 * dot(m, g); }

            varying float vBrightness;
            varying vec3 vColor;

            void main() {
                // Find a valid (bright) spot on the texture to be the target
                vec2 finalUV = aTargetUV;
                float brightness = 0.0;
                for(int i = 0; i < 10; i++){
                    brightness = texture2D(u_texture, finalUV).r;
                    if(brightness > 0.05) break;
                    finalUV = fract(finalUV + 0.1 * float(i));
                }

                // The target position is based on the texture
                vec3 targetPosition = vec3((finalUV.x - 0.5) * 10.0, (finalUV.y - 0.5) * 10.0, 0.0);

                // Add shimmering effect based on brightness from the texture
                float shimmer = snoise(targetPosition.xy + u_time * 0.2) * brightness * 0.3;
                targetPosition.z += shimmer;
                vBrightness = brightness;

                // Mix between start and target positions based on progress
                vec3 currentPosition = mix(position, targetPosition, u_progress);
                
                vec4 modelPosition = vec4(currentPosition, 1.0);
                vec4 viewPosition = viewMatrix * modelPosition;
                gl_Position = projectionMatrix * viewPosition;
                gl_PointSize = (2.0 + brightness * 2.0) / -viewPosition.z;
            }
        `,
        fragmentShader: `
            uniform float u_progress;
            uniform vec3 u_color_start;
            uniform vec3 u_color_end;
            varying float vBrightness;

            void main() {
                if (length(gl_PointCoord - vec2(0.5)) > 0.48) discard;
                
                // Mix color based on assembly progress
                vec3 color = mix(u_color_start, u_color_end, u_progress);
                
                // Final color is brighter for core parts of the figure
                gl_FragColor = vec4(color, vBrightness * 1.5 * u_progress);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    const figure = new THREE.Points(figureGeometry, figureMaterial);
    scene.add(figure);

    // --- 4. Animation and Camera Control ---
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Update shaders
        rainMaterial.uniforms.u_time.value = elapsedTime;
        figureMaterial.uniforms.u_time.value = elapsedTime;

        // --- Camera and Assembly Choreography ---
        const zoomDuration = 4.0;
        const assemblyDuration = 5.0;
        const assemblyStartTime = 2.0;

        // 1. Initial Zoom
        if (elapsedTime < zoomDuration) {
            camera.position.z = 20.0 - 12.0 * (elapsedTime / zoomDuration);
        }

        // 2. Assembly Animation
        if (elapsedTime > assemblyStartTime) {
            let progress = Math.min((elapsedTime - assemblyStartTime) / assemblyDuration, 1.0);
            figureMaterial.uniforms.u_progress.value = 1.0 - Math.pow(1.0 - progress, 4.0); // Easing
        }

        // 3. Orbital Motion (after assembly is complete)
        if (elapsedTime > assemblyStartTime + assemblyDuration) {
            const orbitSpeed = 0.1;
            const orbitRadius = 8;
            camera.position.x = Math.sin(elapsedTime * orbitSpeed) * orbitRadius;
            camera.position.z = Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
            camera.lookAt(0, 0, 0);
        } else {
            camera.lookAt(0, 0, 0); // Keep looking at the center during zoom/assembly
        }
        
        renderer.render(scene, camera);
    }
    
    // Handle resizing
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});

