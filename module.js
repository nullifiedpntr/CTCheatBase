export class Module {
  constructor(name, category = "Misc") {
    this.name = name;
    this.category = category;     
    this.enabled = false;
  }

  onEnable() {}
  onDisable() {}
  onUpdate() {}
  onRender() {}
  onRender3D() {}

  setEnabled(v) {
    if (this.enabled === v) return;
    this.enabled = v;
    if (v) this.onEnable(); else this.onDisable();
  }
  toggle() { this.setEnabled(!this.enabled); }
  update() { if (this.enabled) this.onUpdate(); }
  render() { if (this.enabled) this.onRender(); }
  render3D() { if (this.enabled) this.onRender3D(); }
}