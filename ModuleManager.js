import { AutoClicker } from "./cheats/combat/AutoClicker.js";
import { Scaffold } from "./cheats/player/Scaffold.js";
import { ESP } from "./cheats/visuals/ESP.js";

export const modules = [];

export function registerModule(module) {
    modules.push(module);
}

export function initializeModules() {
    registerModule(new AutoClicker());
    registerModule(new ESP());
    registerModule(new Scaffold());
}


export function onTick() {
  for (const m of modules) {
    try {
      m.update();
    } catch (err) {
      ChatLib.chat("&c[SWIFT TICK ERROR] " + err);
    }
  }
}

export function onRender() {
  for (const m of modules) {
    try {
      m.render();
    } catch (err) {
      ChatLib.chat("&c[SWIFT RENDER ERROR] " + err);
    }
  }
}

export function onRender3D() {
  for (const m of modules) {
    try {
      m.render3D();
    } catch (err) {
      ChatLib.chat("&c[SWIFT RENDER3D ERROR] " + err);
    }
  }
}