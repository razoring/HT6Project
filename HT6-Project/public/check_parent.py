import bpy

filepath = r"c:\Users\conta\Downloads\Cute Bunny\cute_bunny_rigged.blend"
bpy.ops.wm.open_mainfile(filepath=filepath)
obj = bpy.data.objects.get("BrownBunny")
arm = bpy.data.objects.get("BunnyArmature")

# Remove all armature modifiers
for m in reversed(obj.modifiers):
    if m.type == 'ARMATURE':
        obj.modifiers.remove(m)

# Parent directly
obj.parent = arm
obj.parent_type = 'ARMATURE'

# Check if it deforms
bpy.context.view_layer.update()
vg_ear = obj.vertex_groups.get("Ear.L")
for v in obj.data.vertices:
    for g in v.groups:
        if g.group == vg_ear.index and g.weight > 0.0:
            v_start = obj.matrix_world @ v.co
            arm.pose.bones["Ear.L"].rotation_mode = 'XYZ'
            arm.pose.bones["Ear.L"].rotation_euler = (1.5, 0, 0)
            bpy.context.view_layer.update()
            v_end = obj.matrix_world @ v.co
            print(f"Vertex moved: {v_start != v_end}")
            break
    else:
        continue
    break

