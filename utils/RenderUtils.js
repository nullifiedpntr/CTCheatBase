const glStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
const gl11 = Java.type("org.lwjgl.opengl.GL11");


/**
 * draws a box around an entity.
 * 
 * @param {Entity} entity - The target entity to draw the ESP around
 * @param {number} r - Red (0–1)
 * @param {number} g - Green (0–1)
 * @param {number} b - Blue (0–1)
 * @param {number} a - Alpha (0–1)
 */

function drawESP(entity, r = 0, g = 1, b = 0, a = 1) {
  if (!World.isLoaded() || !entity) return;

  const x = entity.getRenderX();
  const y = entity.getRenderY();
  const z = entity.getRenderZ();

  const halfWidth = 0.3;
  const height = entity.getHeight();

  glStateManager.func_179090_x(); // disable texture2D
  glStateManager.func_179097_i(); // disable depth
  glStateManager.func_179131_c(r, g, b, a); // color
  gl11.glLineWidth(2);

  Tessellator.begin(gl11.GL_LINES);

  const corners = [
    [x - halfWidth, y, z - halfWidth],
    [x + halfWidth, y, z - halfWidth],
    [x + halfWidth, y, z + halfWidth],
    [x - halfWidth, y, z + halfWidth],

    [x - halfWidth, y + height, z - halfWidth],
    [x + halfWidth, y + height, z - halfWidth],
    [x + halfWidth, y + height, z + halfWidth],
    [x - halfWidth, y + height, z + halfWidth],
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  edges.forEach(([a, b]) => {
    const [x1, y1, z1] = corners[a];
    const [x2, y2, z2] = corners[b];
    Tessellator.pos(x1, y1, z1);
    Tessellator.pos(x2, y2, z2);
  });

  Tessellator.draw();

  glStateManager.func_179126_j(); // enable depth
  glStateManager.func_179098_w(); // enable texture2D
  glStateManager.func_179131_c(1, 1, 1, 1); // reset color
}


export const RenderUtils = { drawESP };