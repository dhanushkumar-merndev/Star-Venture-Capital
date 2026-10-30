/**
 * Hero Visual Anchor — Connected Capabilities & Growth Matrix
 * Renders an interactive canvas depicting Star Venture Capital at the center
 * connected to the Star Groups capability nodes and venture trajectories.
 */

export function initHeroVisual() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationFrameId;
  let width, height;
  let mouse = { x: -1000, y: -1000, isHovering: false };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener("resize", resize);
  resize();

  // Nodes configuration
  const centerNode = {
    label: "Star VC",
    sub: "Hub",
    x: 0,
    y: 0,
    radius: 28,
    color: "#DC2626",
    pulse: 0,
  };

  const capabilityNodes = [
    { label: "StarTech", domain: "Software", angle: -Math.PI * 0.75, dist: 110, color: "#DC2626", radius: 18 },
    { label: "Growth Hub", domain: "Branding", angle: -Math.PI * 0.25, dist: 115, color: "#E11D48", radius: 18 },
    { label: "Production", domain: "Media", angle: Math.PI * 0.1, dist: 120, color: "#EA580C", radius: 18 },
    { label: "Star Garden", domain: "Eco", angle: Math.PI * 0.55, dist: 105, color: "#16A34A", radius: 18 },
    { label: "Interiors", domain: "Spaces", angle: Math.PI * 0.95, dist: 115, color: "#2563EB", radius: 18 },
  ];

  // Venture growth particle trajectories
  const particles = Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * Math.PI * 2,
    radius: 35 + Math.random() * 95,
    speed: 0.006 + Math.random() * 0.008,
    size: 2.5 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.5,
  }));

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isHovering = true;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.isHovering = false;
  });

  let time = 0;

  function render() {
    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // Draw concentric subtle guide rings
    ctx.strokeStyle = "rgba(13, 17, 23, 0.04)";
    ctx.lineWidth = 1;
    [60, 115, 150].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Animate and draw orbital trajectory particles
    particles.forEach((p) => {
      p.angle += p.speed;
      const px = cx + Math.cos(p.angle) * p.radius;
      const py = cy + Math.sin(p.angle) * p.radius;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 38, 38, ${p.opacity * 0.5})`;
      ctx.fill();
    });

    // Draw connection lines to capability nodes
    capabilityNodes.forEach((node, idx) => {
      // Subtle float motion
      const floatX = Math.cos(time + idx) * 3;
      const floatY = Math.sin(time + idx) * 3;
      const nx = cx + Math.cos(node.angle) * node.dist + floatX;
      const ny = cy + Math.sin(node.angle) * node.dist + floatY;

      // Mouse proximity interaction
      const distToMouse = Math.hypot(mouse.x - nx, mouse.y - ny);
      const isNear = distToMouse < 40;

      // Draw connection beam
      const grad = ctx.createLinearGradient(cx, cy, nx, ny);
      grad.addColorStop(0, "rgba(220, 38, 38, 0.5)");
      grad.addColorStop(1, isNear ? "rgba(220, 38, 38, 0.8)" : "rgba(13, 17, 23, 0.1)");

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = grad;
      ctx.lineWidth = isNear ? 2 : 1.2;
      ctx.stroke();

      // Flowing energy dot along line
      const pulseT = (time * 0.5 + idx * 0.2) % 1;
      const dotX = cx + (nx - cx) * pulseT;
      const dotY = cy + (ny - cy) * pulseT;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#DC2626";
      ctx.fill();

      // Draw capability node circle
      ctx.beginPath();
      ctx.arc(nx, ny, node.radius + (isNear ? 3 : 0), 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = isNear ? "#DC2626" : "rgba(13, 17, 23, 0.15)";
      ctx.lineWidth = isNear ? 2 : 1;
      ctx.stroke();

      // Inner color indicator
      ctx.beginPath();
      ctx.arc(nx, ny, 4, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Node label
      ctx.fillStyle = "#0D1117";
      ctx.font = "600 10px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(node.label, nx, ny + node.radius + 12);

      ctx.fillStyle = "#718096";
      ctx.font = "500 8px 'Space Grotesk', monospace";
      ctx.fillText(node.domain, nx, ny + node.radius + 21);
    });

    // Draw central Star Venture Capital hub node
    const pulseRadius = 28 + Math.sin(time * 2) * 2;

    // Glowing outer pulse
    ctx.beginPath();
    ctx.arc(cx, cy, pulseRadius + 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(220, 38, 38, 0.08)";
    ctx.fill();

    // Main hub circle
    ctx.beginPath();
    ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#DC2626";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Central Star Red core
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#DC2626";
    ctx.fill();

    // Central label
    ctx.fillStyle = "#0D1117";
    ctx.font = "700 9px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("STAR VC", cx, cy + 18);

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resize);
  };
}
