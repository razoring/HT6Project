import bpy

filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
obj = bpy.data.objects.get("BrownBunny")

bbox = [v[:] for v in obj.bound_box]
min_x = min([v[0] for v in bbox])
max_x = max([v[0] for v in bbox])
center_x = (min_x + max_x) / 2.0

print(f"BBox Min X: {min_x}")
print(f"BBox Max X: {max_x}")
print(f"BBox Center X: {center_x}")
