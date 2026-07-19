import bpy
filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
arm = bpy.data.objects.get("BunnyArmature")

b = arm.pose.bones["Ear.L"]
print("Bone matrix start:", b.matrix)
b.rotation_mode = 'XYZ'
b.rotation_euler = (1.5, 0, 0)
bpy.context.view_layer.update()
print("Bone matrix end:", b.matrix)
