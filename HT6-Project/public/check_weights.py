import bpy
filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
obj = bpy.data.objects.get("BrownBunny")
vg = obj.vertex_groups.get("Ear.L")
count = 0
for v in obj.data.vertices:
    for g in v.groups:
        if g.group == vg.index and g.weight > 0.0:
            count += 1
print("Vertices in Ear.L:", count)
