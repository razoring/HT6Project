import bpy
filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
obj = bpy.data.objects.get("BrownBunny")
if obj:
    vg_names = [vg.name for vg in obj.vertex_groups]
    print("VGs:", vg_names)
else:
    print("BrownBunny not found")
