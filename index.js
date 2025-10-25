import { initializeModules, onTick, onRender, modules, onRender3D } from "./ModuleManager.js";

initializeModules();
const gui = new Gui();
const guiX = 100;
const guiY = 50;
const guiWidth = 400;
const guiHeight = 250;

let selectedCategory = null;

gui.registerDraw(() => {
    Renderer.drawRect(Renderer.color(0, 0, 0, 160), guiX, guiY, guiWidth, guiHeight);
    Renderer.drawString("&5Swift Client", guiX + 15, guiY + 10);

    if (modules.length === 0) return;

    const categories = {};
    modules.forEach(mod => {
        const cat = mod.category || "Misc";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(mod);
    });

    const categoryNames = Object.keys(categories);
    if (!selectedCategory) selectedCategory = categoryNames[0];

    let catY = guiY + 40;
    categoryNames.forEach(cat => {
        const color = cat === selectedCategory ? "&b" : "&7";
        Renderer.drawString(`${color}${cat}`, guiX + 20, catY);
        catY += 15;
    });

    const selectedModules = categories[selectedCategory] || [];
    if (selectedModules.length > 0) {
        const startX = guiX + guiWidth / 2 - 30;
        let y = guiY + 60;

        selectedModules.forEach(mod => {
            const color = mod.enabled ? "&a" : "&c";
            Renderer.drawString(`${color}${mod.name}`, startX, y);
            y += 15;
        });
    }
});

gui.registerClicked((x, y, button) => {
    const categories = {};
    modules.forEach(mod => {
        const cat = mod.category || "Misc";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(mod);
    });

    const categoryNames = Object.keys(categories);

    // category clicks
    let catY = guiY + 40;
    for (const cat of categoryNames) {
        if (x >= guiX + 20 && x <= guiX + 120 && y >= catY && y <= catY + 12) {
            selectedCategory = cat;
            return;
        }
        catY += 15;
    }

    // module clicks
    if (!selectedCategory) return;
    const selectedModules = categories[selectedCategory];
    const startX = guiX + guiWidth / 2 - 30;
    let modY = guiY + 60;

    for (const mod of selectedModules) {
        if (x >= startX && x <= startX + 120 && y >= modY && y <= modY + 12) {
            mod.toggle();
            ChatLib.chat(`${mod.name} is now ${mod.enabled ? "&aenabled" : "&cdisabled"}`);
            return;
        }
        modY += 15;
    }
});

register("command", () => {
    open = true;
    gui.open();
}).setName("swiftgui");

register("guiClosed", () => {
    open = false;
});


register("tick", () => {
  onTick();
});

register("renderOverlay", () => {
  onRender();
});
register("renderWorld", () => {
  onRender3D();
});
register("command", (name) => {
  const mod = modules.find(m => m.name.toLowerCase() === name.toLowerCase());
  if (mod) {
    mod.toggle();
    ChatLib.chat(`${mod.name} is now ${mod.enabled ? "enabled" : "disabled"}`);
  } else {
    ChatLib.chat(`Can't find module ${name}`);
  }
}).setName("toggle");