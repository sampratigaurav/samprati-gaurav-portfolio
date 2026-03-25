import React, { useRef, useEffect, useCallback } from 'react';

const NODE_COUNT = 45;
const CONNECTION_DISTANCE = 150;
const MOUSE_CONNECTION_DISTANCE = 200;

function createNode(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  };
}

const NetworkBackground = ({ isDark }) => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef([]);
  const rafRef = useRef(null);

  const initNodes = useCallback((w, h) => {
    nodesRef.current = Array.from({ length: NODE_COUNT }, () =>
      createNode(w, h)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) {
        initNodes(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 80,
        opacity: 0.5,
        startTime: performance.now(),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const lineColor = isDark ? [255, 255, 255] : [0, 0, 0];
    const nodeColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.2)';

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.4;
            ctx.strokeStyle = `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Mouse connections
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_CONNECTION_DISTANCE) {
          const opacity = (1 - mDist / MOUSE_CONNECTION_DISTANCE) * 0.6;
          ctx.strokeStyle = `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        const elapsed = timestamp - ripple.startTime;
        const progress = elapsed / 500;
        if (progress >= 1) return false;

        ripple.radius = ripple.maxRadius * progress;
        ripple.opacity = 0.5 * (1 - progress);

        ctx.strokeStyle = `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isDark, initNodes]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default NetworkBackground;
