import { Module } from "../../module.js";
import { RenderUtils } from "../../utils/RenderUtils.js";

export class ESP extends Module {
    constructor() {
        super("ESP", "Visuals");
    }

    onEnable() {
        ChatLib.chat("ESP on");
    }
    

    onRender3D() {
        const players = World.getAllPlayers();

        players.forEach(player => {
            if (player.getHP() > 0 && player.getName() != Player.getName()) {
                RenderUtils.drawESP(player, 0, 1, 0, 1);
            }
        });
    }
}