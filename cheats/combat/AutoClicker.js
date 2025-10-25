import { Module } from "../../module.js";

export class AutoClicker extends Module {
    constructor() {
        super("AutoClicker", "Combat");
        this.lastClick = 0;
        this.cps = 18; 
    }
    // packet based autoclicker (other methods have failed)
    // doesn't bypass hypixel or most servers
    
    // this is bad but oh well 

    onUpdate() {
        if (!org.lwjgl.input.Mouse.isButtonDown(0)) return;
        if (Client.isInGui()) return;

        const now = Date.now();
        const delay = 1000 / this.cps;
        if (now - this.lastClick < delay) return;
        this.lastClick = now;

        try {
            const mc = Client.getMinecraft();
            const hit = mc.field_71476_x; // objectMouseOver

            Player.getPlayer().func_71038_i(); // swing arm 

            if (hit && hit.field_72308_g) {
                const C02 = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
                const Action = Java.type("net.minecraft.network.play.client.C02PacketUseEntity$Action");
                const packet = new C02(hit.field_72308_g, Action.ATTACK);
                Player.getPlayer().field_71174_a.func_147297_a(packet);
            }
        } catch (e) {
            ChatLib.chat("&cPacket error: " + e);
        }
    }
}