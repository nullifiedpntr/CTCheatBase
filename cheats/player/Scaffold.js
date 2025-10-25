import { Module } from "../../module.js";

export class Scaffold extends Module {
    constructor() {
        super("Scaffold", "Player");
    }

    // very simple (and broken) legit scaffold


    onUpdate()
    {
        const ItemBlock = Java.type("net.minecraft.item.ItemBlock");
        if (Player.getPitch() > 40 && Player.getHeldItem().getItem() instanceof ItemBlock && !Player.getHeldItem().getName().includes('Mushroom'))
        {
            const x = Player.getX();
            const y = Player.getY();
            const z = Player.getZ();

            const yaw = Player.getYaw();

            const clazz = Java.type("java.lang.Class").forName("net.minecraft.client.Minecraft");
            const f = clazz.getDeclaredField("field_71467_ac"); // right click delay timer
            f.setAccessible(true);
            f.setInt(Client.getMinecraft(), 0);

            const speed = 0.15;
            const rad = (yaw + 90) * Math.PI / 180;

            const nextX = x + Math.cos(rad) * speed;
            const nextZ = z + Math.sin(rad) * speed;

            const blockBelow = World.getBlockAt(Math.floor(nextX), Math.floor(y - 1.0), Math.floor(nextZ));

            if (blockBelow.toString().includes("air")) // this is a pretty bad approach but its a dirty and fast way to do it
            {
                Client.getKeyBindFromDescription("key.sneak").setState(true);
            } else {
                Client.getKeyBindFromDescription("key.sneak").setState(false);
            }
        } 
    }
}