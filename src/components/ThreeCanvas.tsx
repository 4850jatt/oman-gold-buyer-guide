import React, { useRef, useEffect, useState } from 'react';

interface ThreeCanvasProps {
  assetType?: 'bar' | 'coin';
  width?: number;
  height?: number;
}

export default function ThreeCanvas({ assetType = 'bar', width = 320, height = 300 }: ThreeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Tracks angles
  const angleXRef = useRef(0.25);
  const angleYRef = useRef(1.2);
  const angleZRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    
    // Set canvas dimensions with scaling for high KPI density (Retina)
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // Initialize floating gold particles
    const particlesCount = 35;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
      alpha: number;
      weight: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1.2,
        speedY: -(Math.random() * 0.4 + 0.1),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.6 + 0.2,
        weight: Math.random() * 0.5 + 0.5
      });
    }

    // 3D vertices of a beveled Gold Bar cuboid (centered)
    // Front face (F) and Back face (B) indices
    const sizeX = 85;
    const sizeY = 40;
    const sizeZ = 16;
    
    // Front has bevel, let's make it look like a standard trapezoidal ingot bar
    const vertices3D = [
      // Front top face (smaller, bevel)
      { x: -sizeX + 12, y: -sizeY + 8, z: sizeZ }, // 0: L-Top-F
      { x: sizeX - 12, y: -sizeY + 8, z: sizeZ },  // 1: R-Top-F
      { x: sizeX - 12, y: sizeY - 8, z: sizeZ },   // 2: R-Bottom-F
      { x: -sizeX + 12, y: sizeY - 8, z: sizeZ },  // 3: L-Bottom-F

      // Back base face (larger)
      { x: -sizeX, y: -sizeY, z: -sizeZ },         // 4: L-Top-B
      { x: sizeX, y: -sizeY, z: -sizeZ },          // 5: R-Top-B
      { x: sizeX, y: sizeY, z: -sizeZ },           // 6: R-Bottom-B
      { x: -sizeX, y: sizeY, z: -sizeZ }           // 7: L-Bottom-B
    ];

    // Project 3D coordinate to 2D
    const project = (v: { x: number; y: number; z: number }, ax: number, ay: number, az: number) => {
      // 1. Rotation Z
      let x1 = v.x * Math.cos(az) - v.y * Math.sin(az);
      let y1 = v.x * Math.sin(az) + v.y * Math.cos(az);
      let z1 = v.z;

      // 2. Rotation Y
      let x2 = x1 * Math.cos(ay) + z1 * Math.sin(ay);
      let y2 = y1;
      let z2 = -x1 * Math.sin(ay) + z1 * Math.cos(ay);

      // 3. Rotation X
      let x3 = x2;
      let y3 = y2 * Math.cos(ax) - z2 * Math.sin(ax);
      let z3 = y2 * Math.sin(ax) + z2 * Math.cos(ax);

      // Perspective scale factor
      const distance = 300;
      const fov = 260;
      const scaleProj = fov / (distance + z3);
      
      return {
        x: (x3 * scaleProj) + (width / 2),
        y: (y3 * scaleProj) + (height / 2),
        depth: z3
      };
    };

    // Main animation frame loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw drifting glowing background particles (floating gold dust)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        // Float slightly sideways based on mouse position
        p.x += (mousePos.x - width / 2) * 0.002 * p.weight;
        p.rotation += p.rotSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Shiny particle glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
        grad.addColorStop(0, `rgba(212, 175, 55, ${p.alpha})`);
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = grad;
        ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 2. Rotate Gold Assets representation
      if (isHovered) {
        // Direct kinetic control
        angleYRef.current += 0.01;
        angleXRef.current += 0.002;
      } else {
        // Slow constant ambient spin
        angleYRef.current += 0.005;
        angleXRef.current = 0.25 + Math.sin(Date.now() * 0.0008) * 0.1;
      }

      const ax = angleXRef.current;
      const ay = angleYRef.current;
      const az = angleZRef.current;

      if (assetType === 'bar') {
        // Project all vertices
        const points = vertices3D.map(v => project(v, ax, ay, az));

        // Define faces with depth sorting (to draw back face behind front face)
        // Face vertex indexes + color shade multipliers
        const faces = [
          { name: 'back', idxs: [4, 5, 6, 7], shade: 0.45 },
          { name: 'bottom', idxs: [2, 3, 7, 6], shade: 0.60 },
          { name: 'top', idxs: [0, 1, 5, 4], shade: 0.95 },
          { name: 'left', idxs: [0, 3, 7, 4], shade: 0.50 },
          { name: 'right', idxs: [1, 2, 6, 5], shade: 0.75 },
          { name: 'front', idxs: [0, 1, 2, 3], shade: 0.85 }
        ];

        // Draw faces sorted by average depth index of their vertices
        const sortedFaces = faces.map(face => {
          const avgDepth = face.idxs.reduce((sum, i) => sum + points[i].depth, 0) / 4;
          return { ...face, avgDepth };
        }).sort((a, b) => b.avgDepth - a.avgDepth); // Back to front

        // Draw each face
        sortedFaces.forEach(face => {
          ctx.beginPath();
          ctx.moveTo(points[face.idxs[0]].x, points[face.idxs[0]].y);
          for (let i = 1; i < face.idxs.length; i++) {
            ctx.lineTo(points[face.idxs[i]].x, points[face.idxs[i]].y);
          }
          ctx.closePath();

          // Premium golden metallic radial shading
          const centerFaceX = (points[face.idxs[0]].x + points[face.idxs[2]].x) / 2;
          const centerFaceY = (points[face.idxs[0]].y + points[face.idxs[2]].y) / 2;
          
          const grad = ctx.createRadialGradient(centerFaceX, centerFaceY - 20, 10, centerFaceX, centerFaceY, 90);
          
          // Shading multipliers
          const s = face.shade;
          const rgb1 = `rgba(${Math.floor(255 * s)}, ${Math.floor(215 * s)}, ${Math.floor(80 * s)}, 1)`;
          const rgb2 = `rgba(${Math.floor(180 * s)}, ${Math.floor(140 * s)}, ${Math.floor(40 * s)}, 1)`;
          const rgb3 = `rgba(${Math.floor(110 * s)}, ${Math.floor(80 * s)}, ${Math.floor(20 * s)}, 1)`;

          grad.addColorStop(0, rgb1);
          grad.addColorStop(0.5, rgb2);
          grad.addColorStop(1, rgb3);

          ctx.fillStyle = grad;
          ctx.fill();

          // Stroke borders with a shiny highlight
          ctx.strokeStyle = `rgba(255, 230, 150, ${0.15 + (face.shade * 0.15)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Draw "OMAN 999.9" and Omani Khanjar embossed on front face
          if (face.name === 'front') {
            const fontScale = (points[0].x - points[1].x) / -140; // scales font with projection size
            
            if (fontScale > 0.3) {
              ctx.save();
              
              const midX = (points[0].x + points[2].x) / 2;
              const midY = (points[0].y + points[2].y) / 2;
              
              // Calculate 2D angle of rotation along front face top edge
              const angleOfFace = Math.atan2(points[1].y - points[0].y, points[1].x - points[0].x);
              
              ctx.translate(midX, midY);
              ctx.rotate(angleOfFace);

              // 1. Omani Khanjar Embossed Details (Minimal Vector stroke)
              // Drawn in rich dark gold shade
              ctx.strokeStyle = 'rgba(75, 45, 5, 0.45)';
              ctx.fillStyle = 'rgba(75, 45, 5, 0.25)';
              ctx.lineWidth = 1.3 * fontScale;
              
              ctx.beginPath();
              // Blade cover curved
              ctx.moveTo(-10 * fontScale, -15 * fontScale);
              ctx.quadraticCurveTo(0, -3 * fontScale, 15 * fontScale, -2 * fontScale);
              ctx.lineTo(12 * fontScale, 3 * fontScale);
              ctx.quadraticCurveTo(-2 * fontScale, 2 * fontScale, -13 * fontScale, -8 * fontScale);
              ctx.closePath();
              ctx.stroke();
              ctx.fill();

              // Handle
              ctx.beginPath();
              ctx.moveTo(-11 * fontScale, -15 * fontScale);
              ctx.lineTo(-7 * fontScale, -26 * fontScale);
              ctx.lineTo(-17 * fontScale, -24 * fontScale);
              ctx.lineTo(-15 * fontScale, -13 * fontScale);
              ctx.closePath();
              ctx.stroke();

              // Rings / Belts
              ctx.beginPath();
              ctx.arc(-8 * fontScale, -10 * fontScale, 3 * fontScale, 0, Math.PI*2);
              ctx.arc(-13 * fontScale, -4 * fontScale, 3 * fontScale, 0, Math.PI*2);
              ctx.stroke();

              // Text labeling
              ctx.fillStyle = 'rgba(85, 50, 10, 0.6)';
              ctx.font = `bold ${Math.floor(6.5 * fontScale)}px font-mono, monospace`;
              ctx.textAlign = 'center';
              
              // Arabic label
              ctx.fillText('عُـمَـان', 0, 11 * fontScale);
              
              // Engraving numbers
              ctx.font = `bold ${Math.floor(5.5 * fontScale)}px font-mono, monospace`;
              ctx.fillText('OMAN GOLD', 0, 19 * fontScale);
              ctx.fillText('999.9 PURE', 0, 27 * fontScale);

              ctx.restore();
            }
          }
        });

      } else {
        // TAB: COIN
        // Draw 3D gold coin projection
        // Re-calculate projected coordinates of coin center
        const coinProj = project({ x: 0, y: 0, z: 0 }, ax, ay, az);
        
        ctx.save();
        ctx.translate(coinProj.x, coinProj.y);
        
        // Horizontal stretch / squash to project circular rotation in 3D perspective
        const radius = 68;
        const stretchX = Math.abs(Math.cos(ay));
        const stretchY = 1.0;
        
        ctx.rotate(ax);
        
        // Draw coin edge (3D thickness depth)
        const edgeOffset = 5 * Math.sin(ay);
        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * stretchX, 0, 0, Math.PI * 2);
        
        // Coin Face Shading Gradient
        const coinGrad = ctx.createRadialGradient(-10, -10, 5, 0, 0, radius);
        coinGrad.addColorStop(0, '#FFF3A8');
        coinGrad.addColorStop(0.3, '#D4AF37');
        coinGrad.addColorStop(0.7, '#A07B18');
        coinGrad.addColorStop(1, '#4A3205');
        
        ctx.fillStyle = coinGrad;
        ctx.fill();
        ctx.strokeStyle = '#FFEAA0';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner decorative circle ring
        ctx.beginPath();
        ctx.ellipse(0, 0, radius - 8, (radius - 8) * stretchX, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 235, 160, 0.5)';
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Embossed Khanjar inside coin
        ctx.strokeStyle = 'rgba(75, 45, 5, 0.4)';
        ctx.fillStyle = 'rgba(75, 45, 5, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-8, -15 * stretchX);
        ctx.quadraticCurveTo(0, -3 * stretchX, 12, -2 * stretchX);
        ctx.lineTo(9, 3 * stretchX);
        ctx.quadraticCurveTo(-2, 2 * stretchX, -10, -8 * stretchX);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [width, height, assetType, mousePos, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div className="relative group flex items-center justify-center p-2 rounded-2xl border border-dashed border-[#D4AF37]/15 hover:border-[#D4AF37]/45 transition duration-500 bg-black/30">
      
      {/* Absolute overlay instructions */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0F172A]/90 border border-[#D4AF37]/35 py-1 px-3 rounded-full text-[9px] text-[#D4AF37] tracking-widest uppercase font-mono shadow-md opacity-25 group-hover:opacity-100 transition pointer-events-none">
        {assetType === 'bar' ? 'Omani Khanjar Bullion 999.9' : 'Pure Gold Sovereign'}
      </span>

      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full h-full max-w-[320px] max-h-[300px] cursor-grab active:cursor-grabbing transition duration-300 transform group-hover:scale-105"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  );
}
