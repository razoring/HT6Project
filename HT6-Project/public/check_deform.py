import bpy
filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
arm = bpy.data.objects.get("BunnyArmature")
print("Deform:", [b.use_deform for b in arm.data.bones])
